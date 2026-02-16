import { defineConfig } from 'tsup'
import * as preset from 'tsup-preset-solid'
import { copyFileSync, mkdirSync } from 'fs'

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
  ],
  drop_console: true,
  cjs: false,
}

const copyTheme = () => {
  mkdirSync('dist', { recursive: true })
  copyFileSync('src/styles/theme.css', 'dist/theme.css')
}

export default defineConfig((config) => {
  const watching = !!config.watch
  const parsedOptions = preset.parsePresetOptions(presetOptions, watching)

  if (!parsedOptions.dependencies) parsedOptions.dependencies = {}

  return preset.generateTsupOptions(parsedOptions).map((opt) => ({
    ...opt,
    onSuccess: async () => {
      copyTheme()
      if (typeof opt.onSuccess === 'function') await opt.onSuccess()
    },
  }))
})
