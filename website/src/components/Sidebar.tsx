import { For, JSX, Component } from 'solid-js'
import { ButtonIcon, DialogIcon, PopoverIcon, MenuIcon, LayersIcon } from '../icons'

function PaletteIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="8" r="2" />
      <circle cx="8" cy="14" r="2" />
      <circle cx="16" cy="14" r="2" />
    </svg>
  )
}

export const sections = [
  { id: 'button', label: 'Button', icon: ButtonIcon },
  { id: 'dialog', label: 'Dialog', icon: DialogIcon },
  { id: 'popover', label: 'Popover', icon: PopoverIcon },
  { id: 'dropdown-menu', label: 'Dropdown Menu', icon: MenuIcon },
  { id: 'colors', label: 'Color Palette', icon: PaletteIcon },
] as const

export type SectionId = typeof sections[number]['id']

interface SidebarProps {
  activeSection: SectionId
  onSectionClick: (id: SectionId) => void
}

export const Sidebar: Component<SidebarProps> = (props) => {
  return (
    <aside class="fixed left-0 top-0 h-full w-64 bg-sidebar flex flex-col">
      {/* Logo area */}
      <div class="px-6 py-8">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <LayersIcon class="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 class="text-white font-semibold text-lg tracking-tight">nsg-ui</h1>
            <p class="text-white/50 text-xs">Component Library</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav class="flex-1 px-3 sidebar-scroll overflow-y-auto">
        <div class="text-white/40 text-[11px] font-medium uppercase tracking-wider px-3 mb-2">
          Components
        </div>
        <div class="space-y-1">
          <For each={sections}>
            {(section) => (
              <button
                onClick={() => props.onSectionClick(section.id)}
                class={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  props.activeSection === section.id
                    ? 'bg-white/10 text-white shadow-lg shadow-black/20'
                    : 'text-white/60 hover:bg-white/5 hover:text-white/90'
                }`}
              >
                <section.icon class="w-[18px] h-[18px]" />
                {section.label}
                {props.activeSection === section.id && (
                  <div class="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
                )}
              </button>
            )}
          </For>
        </div>
      </nav>

      {/* Footer */}
      <div class="px-6 py-6 border-t border-white/10">
        <div class="flex items-center gap-2 text-white/40 text-xs">
          <span>Built with</span>
          <span class="text-white/60 font-medium">SolidJS</span>
        </div>
      </div>
    </aside>
  )
}
