import { defineConfig } from 'tsup'
import * as preset from 'tsup-preset-solid'
import { copyFileSync, mkdirSync } from 'fs'
import { join } from 'path'
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
 *   @import 'nsg-ui/themes/modern-brut-violet.css';
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

export default defineConfig((config) => {
  const watching = !!config.watch
  const parsedOptions = preset.parsePresetOptions(presetOptions, watching)

  if (!parsedOptions.dependencies) parsedOptions.dependencies = {}

  return preset.generateTsupOptions(parsedOptions).map((opt) => ({
    ...opt,
    onSuccess: async () => {
      copyThemes()
      if (typeof opt.onSuccess === 'function') await opt.onSuccess()
    },
  }))
})
