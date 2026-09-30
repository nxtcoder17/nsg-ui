import { defineConfig } from 'tsup'
import * as preset from 'tsup-preset-solid'
import { copyFileSync, mkdirSync, writeFileSync } from 'fs'
import { dirname, join, resolve } from 'path'
import { themeStylesheets } from './src/themes'

const presetOptions: preset.PresetOptions = {
  entries: [
    {
      entry: 'src/index.tsx',
      dev_entry: true,
    },
    {
      entry: 'src/icons/index.tsx',
      name: 'icons',
    },
    {
      // The foundation registry: ids, labels, swatches and the helpers that
      // apply one. The stylesheets it names are shipped as separate CSS files.
      entry: 'src/themes/index.tsx',
      name: 'themes',
    },
  ],
  drop_console: true,
  cjs: false,
}

/**
 * Ships each theme foundation as its own stylesheet, so a consumer that imports
 * one foundation pays for one foundation and nothing else:
 *
 *   @import 'nsg-ui/themes/modern-brut.css';
 *
 * The file list comes from the registry in `src/themes`, so adding a foundation
 * never touches this config, and a stray file in the themes directory is never
 * shipped by accident.
 */
const copyThemes = () => {
  mkdirSync('dist', { recursive: true })
  copyFileSync('src/styles/theme.css', 'dist/theme.css')

  const themesDir = join('dist', 'themes')
  mkdirSync(themesDir, { recursive: true })
  for (const file of themeStylesheets()) {
    copyFileSync(join('src', 'styles', 'themes', file), join(themesDir, file))
  }
}

/**
 * The same registry drives the CDN path. One entry point per foundation names
 * the compiled component layer plus exactly one foundation, so a consumer that
 * links `standalone/modern-brut.min.css` pays for one foundation and nothing else.
 */
const standaloneEntries = () =>
  themeStylesheets().map((file) => ({
    entry: join('src', 'styles', 'themes', file),
    name: file.replace(/\.css$/, ''),
  }))

/**
 * Minifies a compiled stylesheet with Lightning CSS, which also normalises
 * modern syntax rather than only stripping whitespace — so the `.min.css` twin
 * is safe to ship as the default, not just as an alternative.
 */
const minifyCss = async (css: string) => {
  const { transform } = await import('lightningcss')
  return transform({
    filename: 'standalone.css',
    code: Buffer.from(css),
    minify: true,
  }).code.toString()
}

/**
 * Compiles the Tailwind *input* stylesheet into finished, browser-ready CSS.
 *
 * `dist/theme.css` is what a bundler consumer imports alongside `@import
 * 'tailwindcss'` — it is deliberately left uncompiled, because that consumer
 * supplies the Tailwind pipeline themselves. But a `<link>` tag has no such
 * pipeline, so the same sheet is compiled here into `dist/standalone.css` and
 * per-foundation `dist/standalone/*.css` for people linking the CDN directly.
 *
 * Each is emitted twice: readable and minified. A `<link>` should point at the
 * `.min.css` — it is a little under half the bytes over the wire, and needs
 * nothing from the consumer to get that.
 *
 * `@source` paths inside `theme.css` are relative to the file itself, so the
 * compile runs with `src/styles` as its base and the built JS in `dist` as the
 * scanned source — the same bounded class set the bundler path gets.
 */
const buildStandalone = async () => {
  const { compile } = await import('tailwindcss')
  const { readFile } = await import('fs/promises')
  const { createRequire } = await import('module')
  // tsup bundles this config to ESM, where `require` does not exist.
  const require_ = createRequire(import.meta.url)

  const compileWith = async (extra: string) => {
    const input =
      "@import 'tailwindcss';\n" +
      (await readFile('src/styles/standalone-utilities.css', 'utf8')) +
      (await readFile('src/styles/theme.css', 'utf8')) +
      extra
    return compile(input, {
      base: resolve('src/styles'),
      loadStylesheet: async (id, base) => {
        const file =
          id === 'tailwindcss' ? require_.resolve('tailwindcss/index.css') : resolve(base, id)
        return { path: file, base: dirname(file), content: await readFile(file, 'utf8') }
      },
    })
  }

  // The component layer on its own, so it is shared by every standalone bundle.
  const shared = (await compileWith('')).build([])

  writeFileSync('dist/standalone.css', shared)
  writeFileSync('dist/standalone.min.css', await minifyCss(shared))

  mkdirSync('dist/standalone', { recursive: true })
  for (const { entry, name } of standaloneEntries()) {
    const foundation = await readFile(entry, 'utf8')
    const bundle = shared + '\n' + foundation
    writeFileSync(join('dist', 'standalone', `${name}.css`), bundle)
    writeFileSync(join('dist', 'standalone', `${name}.min.css`), await minifyCss(bundle))
  }
}

export default defineConfig((config) => {
  const watching = !!config.watch
  const parsedOptions = preset.parsePresetOptions(presetOptions, watching)

  if (!parsedOptions.dependencies) parsedOptions.dependencies = {}

  return preset.generateTsupOptions(parsedOptions).map((opt) => ({
    ...opt,
    onSuccess: async () => {
      copyThemes()
      if (!watching) await buildStandalone()
      if (typeof opt.onSuccess === 'function') await opt.onSuccess()
    },
  }))
})
