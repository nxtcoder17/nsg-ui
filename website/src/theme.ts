export type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'nsg-ui-theme'

export function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(theme: Theme): void {
  const isDark = theme === 'dark' || (theme === 'system' && getSystemTheme() === 'dark')
  document.documentElement.classList.toggle('dark', isDark)
}

export function getSavedTheme(): Theme | null {
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
  if (saved && ['light', 'dark', 'system'].includes(saved)) {
    return saved
  }
  return null
}

export function saveTheme(theme: Theme): void {
  localStorage.setItem(STORAGE_KEY, theme)
}

export function cycleTheme(current: Theme): Theme {
  const themes: Theme[] = ['light', 'dark', 'system']
  const currentIndex = themes.indexOf(current)
  return themes[(currentIndex + 1) % themes.length]
}

export function onSystemThemeChange(callback: () => void): () => void {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', callback)
  return () => mediaQuery.removeEventListener('change', callback)
}
