export interface UtilityEntry {
  name: string
  defaults: string
}

export interface UtilityGroup {
  component: string
  utilities: UtilityEntry[]
}

export const utilityRegistry: UtilityGroup[] = [
  {
    component: 'SegmentedControl',
    utilities: [
      {
        name: 'nsg-segmented-control-track',
        defaults: `@utility nsg-segmented-control-track {\n  @apply p-1 rounded-lg bg-surface-sunken;\n}`,
      },
      {
        name: 'nsg-segmented-control-indicator',
        defaults: `@utility nsg-segmented-control-indicator {\n  @apply bg-surface-raised rounded-md shadow-sm transition-all duration-200;\n}`,
      },
      {
        name: 'nsg-segmented-control-item',
        defaults: `@utility nsg-segmented-control-item {\n  @apply rounded-sm text-text-secondary transition-colors;\n  @apply hover:text-text data-[checked]:text-text;\n  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring;\n}`,
      },
      {
        name: 'nsg-segmented-control-item-separator',
        defaults: `@utility nsg-segmented-control-item-separator {\n  @apply before:absolute before:left-0 before:top-[25%] before:h-[50%] before:w-px before:bg-text-muted/40 before:content-[''] before:transition-opacity data-[checked]:before:opacity-0;\n}`,
      },
      {
        name: 'nsg-segmented-control-label',
        defaults: `@utility nsg-segmented-control-label {\n  @apply text-sm font-medium text-text;\n}`,
      },
      {
        name: 'nsg-segmented-control-description',
        defaults: `@utility nsg-segmented-control-description {\n  @apply text-xs text-text-secondary;\n}`,
      },
      {
        name: 'nsg-segmented-control-error',
        defaults: `@utility nsg-segmented-control-error {\n  @apply text-xs text-danger-500;\n}`,
      },
    ],
  },
  {
    component: 'Accordion',
    utilities: [
      {
        name: 'nsg-accordion-root',
        defaults: `@utility nsg-accordion-root {\n  @apply divide-y divide-border rounded-lg border border-border;\n}`,
      },
      {
        name: 'nsg-accordion-trigger',
        defaults: `@utility nsg-accordion-trigger {\n  @apply px-4 py-3 text-sm font-medium text-text;\n  @apply hover:bg-neutral-50 transition-colors;\n  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset;\n}`,
      },
      {
        name: 'nsg-accordion-icon',
        defaults: `@utility nsg-accordion-icon {\n  @apply text-text-secondary transition-transform duration-200;\n}`,
      },
      {
        name: 'nsg-accordion-content',
        defaults: `@utility nsg-accordion-content {\n  @apply text-sm text-text-secondary;\n}`,
      },
      {
        name: 'nsg-accordion-content-inner',
        defaults: `@utility nsg-accordion-content-inner {\n  @apply px-4 pb-4;\n}`,
      },
    ],
  },
  {
    component: 'DropdownMenu',
    utilities: [
      {
        name: 'nsg-dropdown-menu-content',
        defaults: `@utility nsg-dropdown-menu-content {\n  @apply bg-surface-raised border border-border text-text p-1.5;\n  @apply shadow-[0_4px_24px_-4px_rgba(0,0,0,0.15),0_1px_3px_rgba(0,0,0,0.08)];\n}`,
      },
      {
        name: 'nsg-dropdown-menu-action',
        defaults: `@utility nsg-dropdown-menu-action {\n  @apply rounded-sm px-2 py-1 text-sm text-text;\n  @apply data-[highlighted]:bg-surface-sunken data-[highlighted]:text-text;\n}`,
      },
      {
        name: 'nsg-dropdown-menu-action-danger',
        defaults: `@utility nsg-dropdown-menu-action-danger {\n  @apply rounded-sm px-2 py-1 text-sm text-danger;\n  @apply data-[highlighted]:bg-danger-100 data-[highlighted]:text-danger;\n}`,
      },
      {
        name: 'nsg-dropdown-menu-option',
        defaults: `@utility nsg-dropdown-menu-option {\n  @apply rounded-lg py-2 text-sm text-text;\n  @apply focus:bg-surface-sunken;\n  @apply data-[disabled]:pointer-events-none data-[disabled]:opacity-50;\n}`,
      },
      {
        name: 'nsg-dropdown-menu-separator',
        defaults: `@utility nsg-dropdown-menu-separator {\n  @apply -mx-1.5 my-1.5 h-px bg-border;\n}`,
      },
      {
        name: 'nsg-dropdown-menu-subtrigger',
        defaults: `@utility nsg-dropdown-menu-subtrigger {\n  @apply px-3 py-2 text-sm text-text;\n  @apply focus:bg-surface-sunken data-[expanded]:bg-surface-sunken;\n  @apply data-[disabled]:pointer-events-none data-[disabled]:opacity-50;\n}`,
      },
      {
        name: 'nsg-dropdown-menu-subcontent',
        defaults: `@utility nsg-dropdown-menu-subcontent {\n  @apply rounded-xl min-w-[10rem] overflow-hidden p-1.5;\n  @apply bg-surface-raised border border-border text-text;\n  @apply shadow-[0_4px_24px_-4px_rgba(0,0,0,0.15),0_1px_3px_rgba(0,0,0,0.08)];\n}`,
      },
    ],
  },
  {
    component: 'ContextMenu',
    utilities: [
      {
        name: 'nsg-context-menu-content',
        defaults: `@utility nsg-context-menu-content {\n  @apply min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface-raised text-text p-1 shadow-lg;\n}`,
      },
      {
        name: 'nsg-context-menu-action',
        defaults: `@utility nsg-context-menu-action {\n  @apply rounded-sm px-2 py-1.5 text-sm text-text;\n  @apply focus:bg-surface-sunken;\n  @apply data-[disabled]:pointer-events-none data-[disabled]:opacity-50;\n}`,
      },
      {
        name: 'nsg-context-menu-action-danger',
        defaults: `@utility nsg-context-menu-action-danger {\n  @apply rounded-sm px-2 py-1.5 text-sm text-danger;\n  @apply focus:bg-danger/10 focus:text-danger;\n  @apply data-[disabled]:pointer-events-none data-[disabled]:opacity-50;\n}`,
      },
      {
        name: 'nsg-context-menu-option',
        defaults: `@utility nsg-context-menu-option {\n  @apply rounded-sm py-1.5 text-sm text-text;\n  @apply focus:bg-surface-sunken;\n  @apply data-[disabled]:pointer-events-none data-[disabled]:opacity-50;\n}`,
      },
      {
        name: 'nsg-context-menu-separator',
        defaults: `@utility nsg-context-menu-separator {\n  @apply -mx-1 my-1 h-px bg-border;\n}`,
      },
      {
        name: 'nsg-context-menu-subtrigger',
        defaults: `@utility nsg-context-menu-subtrigger {\n  @apply rounded-sm px-2 py-1.5 text-sm text-text;\n  @apply focus:bg-surface-sunken data-[expanded]:bg-surface-sunken;\n  @apply data-[disabled]:pointer-events-none data-[disabled]:opacity-50;\n}`,
      },
      {
        name: 'nsg-context-menu-subcontent',
        defaults: `@utility nsg-context-menu-subcontent {\n  @apply min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface-raised text-text p-1 shadow-lg;\n}`,
      },
    ],
  },
  {
    component: 'Dialog',
    utilities: [
      {
        name: 'nsg-dialog-overlay',
        defaults: `@utility nsg-dialog-overlay {\n  @apply bg-black/50 backdrop-blur-sm;\n}`,
      },
      {
        name: 'nsg-dialog-content',
        defaults: `@utility nsg-dialog-content {\n  @apply bg-surface-raised text-text border border-border rounded-lg shadow-lg;\n}`,
      },
      {
        name: 'nsg-dialog-title',
        defaults: `@utility nsg-dialog-title {\n  @apply text-lg font-semibold text-text;\n}`,
      },
      {
        name: 'nsg-dialog-description',
        defaults: `@utility nsg-dialog-description {\n  @apply text-sm text-text-secondary;\n}`,
      },
    ],
  },
  {
    component: 'Tabs',
    utilities: [
      {
        name: 'nsg-tabs-list',
        defaults: `@utility nsg-tabs-list {\n  @apply border-b border-border;\n}`,
      },
      {
        name: 'nsg-tabs-list-vertical',
        defaults: `@utility nsg-tabs-list-vertical {\n  @apply border-r border-border pr-4;\n}`,
      },
      {
        name: 'nsg-tabs-trigger',
        defaults: `@utility nsg-tabs-trigger {\n  @apply px-4 py-2 text-sm font-medium transition-colors;\n  @apply text-text-secondary hover:text-text;\n  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1;\n  @apply data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed;\n}`,
      },
    ],
  },
  {
    component: 'RadioGroup',
    utilities: [
      {
        name: 'nsg-radio-group-option',
        defaults: `@utility nsg-radio-group-option {\n  @apply flex items-start gap-3;\n}`,
      },
      {
        name: 'nsg-radio-group-control',
        defaults: `@utility nsg-radio-group-control {\n  @apply border-2 border-neutral-300 bg-surface-raised;\n  @apply group-hover:border-primary-400;\n  @apply data-[checked]:border-primary-500 data-[checked]:bg-primary-50;\n  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2;\n  @apply transition-colors;\n}`,
      },
      {
        name: 'nsg-radio-group-label',
        defaults: `@utility nsg-radio-group-label {\n  @apply text-sm font-medium text-text cursor-pointer;\n}`,
      },
      {
        name: 'nsg-radio-group-description',
        defaults: `@utility nsg-radio-group-description {\n  @apply text-xs text-text-secondary;\n}`,
      },
    ],
  },
  {
    component: 'CommandBar',
    utilities: [
      {
        name: 'nsg-command-bar-input',
        defaults: `@utility nsg-command-bar-input {\n  @apply flex-1 h-12 text-sm bg-transparent text-text placeholder:text-text-muted focus:outline-none;\n}`,
      },
      {
        name: 'nsg-command-bar-group-header',
        defaults: `@utility nsg-command-bar-group-header {\n  @apply px-3 pt-3 pb-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider first:pt-1;\n}`,
      },
      {
        name: 'nsg-command-bar-item',
        defaults: `@utility nsg-command-bar-item {\n  @apply w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-left transition-colors duration-75;\n}`,
      },
      {
        name: 'nsg-command-bar-item-highlighted',
        defaults: `@utility nsg-command-bar-item-highlighted {\n  @apply bg-primary-100 text-primary-900;\n}`,
      },
      {
        name: 'nsg-command-bar-item-default',
        defaults: `@utility nsg-command-bar-item-default {\n  @apply text-text hover:bg-surface-sunken;\n}`,
      },
      {
        name: 'nsg-command-bar-footer',
        defaults: `@utility nsg-command-bar-footer {\n  @apply flex items-center gap-4 px-4 py-2.5 border-t border-border text-xs text-text-muted;\n}`,
      },
    ],
  },
  {
    component: 'ComboBox',
    utilities: [
      {
        name: 'nsg-combo-box-control',
        defaults: `@utility nsg-combo-box-control {\n  @apply flex items-center gap-2 h-10 px-3 rounded-md bg-surface-raised border border-border;\n  @apply focus-within:ring-2 focus-within:border-transparent focus-within:ring-ring;\n}`,
      },
      {
        name: 'nsg-combo-box-control-multi',
        defaults: `@utility nsg-combo-box-control-multi {\n  @apply flex items-start gap-2 min-h-10 px-2 py-1.5 rounded-md bg-surface-raised border border-border;\n  @apply focus-within:ring-2 focus-within:border-transparent focus-within:ring-ring;\n}`,
      },
      {
        name: 'nsg-combo-box-control-invalid',
        defaults: `@utility nsg-combo-box-control-invalid {\n  @apply border-danger-500 focus-within:ring-danger-200;\n}`,
      },
      {
        name: 'nsg-combo-box-input',
        defaults: `@utility nsg-combo-box-input {\n  @apply flex-1 h-full text-sm bg-transparent text-text placeholder:text-text-muted focus:outline-none disabled:cursor-not-allowed;\n}`,
      },
      {
        name: 'nsg-combo-box-input-multi',
        defaults: `@utility nsg-combo-box-input-multi {\n  @apply flex-1 min-w-20 h-6 px-1 text-sm bg-transparent text-text placeholder:text-text-muted focus:outline-none;\n}`,
      },
      {
        name: 'nsg-combo-box-content',
        defaults: `@utility nsg-combo-box-content {\n  @apply min-w-[8rem] overflow-hidden rounded-lg bg-surface-raised text-text border border-border shadow-lg;\n  animation: nsg-slide-down 0.2s ease-out;\n}`,
      },
      {
        name: 'nsg-combo-box-item',
        defaults: `@utility nsg-combo-box-item {\n  @apply flex items-center justify-between gap-2 px-3 py-2 text-sm rounded-md cursor-pointer;\n  @apply text-text data-[highlighted]:bg-primary-100 data-[highlighted]:text-primary-900;\n  @apply data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed outline-none;\n}`,
      },
      {
        name: 'nsg-combo-box-tag',
        defaults: `@utility nsg-combo-box-tag {\n  @apply inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800;\n}`,
      },
      {
        name: 'nsg-combo-box-error',
        defaults: `@utility nsg-combo-box-error {\n  @apply text-xs text-danger-500;\n}`,
      },
    ],
  },
]
