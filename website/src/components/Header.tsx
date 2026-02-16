import { Component } from 'solid-js'
import { Theme } from '../theme'
import { SunIcon, MoonIcon, MonitorIcon, GitHubIcon } from '../icons'

interface HeaderProps {
  theme: Theme
  onThemeToggle: () => void
}

export const Header: Component<HeaderProps> = (props) => {
  return (
    <header class="sticky top-0 z-10 backdrop-blur-xl bg-surface/80 border-b border-border">
      <div class="max-w-5xl mx-auto px-8 py-4 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-text">Kitchen Sink</h2>
          <p class="text-text-muted text-sm">Explore all components</p>
        </div>
        <div class="flex items-center gap-3">
          {/* Theme Switcher */}
          <button
            onClick={props.onThemeToggle}
            class="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-surface-raised hover:bg-surface-sunken text-text text-sm font-medium transition-colors"
            title={`Theme: ${props.theme}`}
          >
            {props.theme === 'light' && <SunIcon class="w-4 h-4" />}
            {props.theme === 'dark' && <MoonIcon class="w-4 h-4" />}
            {props.theme === 'system' && <MonitorIcon class="w-4 h-4" />}
            <span class="capitalize">{props.theme}</span>
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com/nxtcoder17/nsg-ui"
            target="_blank"
            class="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-300 text-neutral-50 dark:text-neutral-900 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-400 transition-colors"
          >
            <GitHubIcon class="w-4 h-4" />
            GitHub
          </a>
        </div>
      </div>
    </header>
  )
}
