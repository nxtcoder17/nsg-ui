import { createSignal, createEffect, onMount, onCleanup, Show } from 'solid-js'
import { SegmentedControl } from '../segmented-control'
import { SunIcon, MoonIcon, MonitorIcon } from '../../icons'
import { cn } from '../../utils/cn'

export type Theme = 'light' | 'dark' | 'system'

export type ThemeSwitcherProps = {
  /** Initial theme value (default: reads from localStorage, falls back to 'system') */
  defaultValue?: Theme
  /** Called when theme changes */
  onChange?: (theme: Theme) => void
  /** Show text labels next to icons (default: false) */
  withLabels?: boolean
  /** localStorage key (default: 'nsg-ui-theme') */
  storageKey?: string
  class?: string
}

const STORAGE_KEY_DEFAULT = 'nsg-ui-theme'

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme): void {
  const isDark = theme === 'dark' || (theme === 'system' && getSystemTheme() === 'dark')
  document.documentElement.classList.toggle('dark', isDark)
}

function getSavedTheme(key: string): Theme | null {
  const saved = localStorage.getItem(key) as Theme | null
  if (saved && ['light', 'dark', 'system'].includes(saved)) return saved
  return null
}

export const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  const storageKey = () => props.storageKey ?? STORAGE_KEY_DEFAULT

  const initial = () => getSavedTheme(storageKey()) ?? props.defaultValue ?? 'system'
  const [theme, setTheme] = createSignal<Theme>(initial())

  onMount(() => {
    applyTheme(theme())

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (theme() === 'system') applyTheme('system')
    }
    mediaQuery.addEventListener('change', handler)
    onCleanup(() => mediaQuery.removeEventListener('change', handler))
  })

  createEffect(() => {
    const current = theme()
    applyTheme(current)
    localStorage.setItem(storageKey(), current)
    props.onChange?.(current)
  })

  return (
    <SegmentedControl
      value={theme()}
      onChange={(v) => setTheme(v as Theme)}
      class={cn(props.class)}
    >
      <SegmentedControl.Item value="light">
        <SunIcon size="sm" />
        <Show when={props.withLabels}>Light</Show>
      </SegmentedControl.Item>

      <SegmentedControl.Item value="dark">
        <MoonIcon size="sm" />
        <Show when={props.withLabels}>Dark</Show>
      </SegmentedControl.Item>

      <SegmentedControl.Item value="system">
        <MonitorIcon size="sm" />
        <Show when={props.withLabels}>System</Show>
      </SegmentedControl.Item>
    </SegmentedControl>
  )
}
