import { For, JSX, Component } from 'solid-js'
import { ButtonIcon, DialogIcon, PopoverIcon, MenuIcon, LayersIcon } from '../icons'
import { IconsIcon } from '../sections/IconsSection'
import { ToastIcon } from '../sections/ToastSection'
import { RadioGroupIcon } from '../sections/RadioGroupSection'
import { CheckboxIcon } from '../sections/CheckboxSection'
import { ComboBoxIcon } from '../sections/ComboBoxSection'
import { TextInputIcon } from '../sections/TextInputSection'
import { NumberInputIcon } from '../sections/NumberInputSection'
import { TabsIcon } from '../sections/TabsSection'
import { SegmentedControlIcon } from '../sections/SegmentedControlSection'
import { BadgeIcon } from '../sections/BadgeSection'
import { LinkIcon } from '../sections/LinkSection'
import { SeparatorIcon } from '../sections/SeparatorSection'
import { ImageIcon } from '../sections/ImageSection'
import { ProgressIcon } from '../sections/ProgressSection'
import { AccordionIcon } from '../sections/AccordionSection'
import { ToggleButtonIcon } from '../sections/ToggleButtonSection'
import { ContextMenuIcon } from '../sections/ContextMenuSection'
import { TextIcon } from '../sections/TextSection'

function CommandBarIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 8l4 4-4 4" />
      <line x1="13" y1="16" x2="17" y2="16" />
    </svg>
  )
}

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
  { id: 'text', label: 'Text', icon: TextIcon },
  { id: 'button', label: 'Button', icon: ButtonIcon },
  { id: 'dialog', label: 'Dialog', icon: DialogIcon },
  { id: 'popover', label: 'Popover', icon: PopoverIcon },
  { id: 'dropdown-menu', label: 'Dropdown Menu', icon: MenuIcon },
  { id: 'context-menu', label: 'Context Menu', icon: ContextMenuIcon },
  { id: 'toast', label: 'Toast', icon: ToastIcon },
  { id: 'radio-group', label: 'RadioGroup', icon: RadioGroupIcon },
  { id: 'checkbox', label: 'Checkbox', icon: CheckboxIcon },
  { id: 'combobox', label: 'ComboBox', icon: ComboBoxIcon },
  { id: 'text-input', label: 'TextInput', icon: TextInputIcon },
  { id: 'number-input', label: 'NumberInput', icon: NumberInputIcon },
  { id: 'tabs', label: 'Tabs', icon: TabsIcon },
  { id: 'segmented-control', label: 'Segmented Control', icon: SegmentedControlIcon },
  { id: 'badge', label: 'Badge', icon: BadgeIcon },
  { id: 'link', label: 'Link', icon: LinkIcon },
  { id: 'separator', label: 'Separator', icon: SeparatorIcon },
  { id: 'image', label: 'Image', icon: ImageIcon },
  { id: 'progress', label: 'Progress', icon: ProgressIcon },
  { id: 'accordion', label: 'Accordion', icon: AccordionIcon },
  { id: 'toggle-button', label: 'Toggle Button', icon: ToggleButtonIcon },
  { id: 'command-bar', label: 'CommandBar', icon: CommandBarIcon },
  { id: 'icons', label: 'Icons', icon: IconsIcon },
  { id: 'colors', label: 'Color Palette', icon: PaletteIcon },
] as const

export type SectionId = typeof sections[number]['id']

interface SidebarProps {
  activeSection: SectionId
  onSectionClick: (id: SectionId) => void
}

export const Sidebar: Component<SidebarProps> = (props) => {
  return (
    <aside class="fixed left-0 top-0 h-full w-64 bg-surface-sunken flex flex-col border-r border-border">
      {/* Logo area */}
      <div class="px-6 py-8">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-success-400 flex items-center justify-center">
            <LayersIcon class="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 class="text-text font-semibold text-lg tracking-tight">nsg-ui</h1>
            <p class="text-text-muted text-xs">Component Library</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav class="flex-1 px-3 sidebar-scroll overflow-y-auto">
        <div class="text-text-muted text-[11px] font-medium uppercase tracking-wider px-3 mb-2">
          Components
        </div>
        <div class="space-y-1">
          <For each={sections}>
            {(section) => (
              <button
                onClick={() => props.onSectionClick(section.id)}
                class={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  props.activeSection === section.id
                    ? 'bg-primary-100 text-primary shadow-sm'
                    : 'text-text-secondary hover:bg-surface-raised hover:text-text'
                }`}
              >
                <section.icon class="w-[18px] h-[18px]" />
                {section.label}
                {props.activeSection === section.id && (
                  <div class="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </button>
            )}
          </For>
        </div>
      </nav>

      {/* Footer */}
      <div class="px-6 py-6 border-t border-border">
        <div class="flex items-center gap-2 text-text-muted text-xs">
          <span>Built with</span>
          <span class="text-text-secondary font-medium">SolidJS</span>
        </div>
      </div>
    </aside>
  )
}
