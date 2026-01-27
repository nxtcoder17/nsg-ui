import { DropdownMenu as KobalteDropdownMenu } from '@kobalte/core/dropdown-menu'
import { type JSX, splitProps, createContext, useContext, Show } from 'solid-js'
import { cn } from '../../utils/cn'
import { CheckIcon, DotIcon, ChevronRightIcon } from '../../icons'

// Context for Option to detect parent type
type OptionContextValue = { type: 'single' | 'multi' }
const OptionContext = createContext<OptionContextValue>()

export interface DropdownMenuProps {
  /** Controlled open state */
  show?: boolean
  /** Callback when open state changes */
  onChange?: (show: boolean) => void
  /** Trigger element (should be a Button or similar interactive element) */
  trigger: JSX.Element
  /** Accessible label for the trigger (required for icon-only triggers) */
  triggerLabel?: string
  /** Placement relative to trigger */
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
  /** Gap between menu and trigger */
  gutter?: number
  /** Menu content */
  children?: JSX.Element
  /** Additional class for the menu content */
  class?: string
}

export const DropdownMenu = function (props: DropdownMenuProps) {
  const [local, others] = splitProps(props, [
    'show', 'onChange', 'trigger', 'triggerLabel', 'placement', 'gutter', 'children', 'class'
  ])

  return (
    <KobalteDropdownMenu
      open={local.show}
      onOpenChange={local.onChange}
      placement={local.placement}
      gutter={local.gutter ?? 8}
      {...others}
    >
      <KobalteDropdownMenu.Trigger as="div" aria-label={local.triggerLabel}>
        {local.trigger}
      </KobalteDropdownMenu.Trigger>

      <KobalteDropdownMenu.Portal>
        <KobalteDropdownMenu.Content
          class={cn(
            'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface-raised text-text p-1 shadow-lg',
            'data-[expanded]:animate-scale-in',
            'origin-[var(--kb-menu-content-transform-origin)]',
            local.class
          )}
        >
          {local.children}
        </KobalteDropdownMenu.Content>
      </KobalteDropdownMenu.Portal>
    </KobalteDropdownMenu>
  )
}

// ============================================================================
// ActionItem - Simple clickable menu item
// ============================================================================

export interface ActionItemProps {
  label: string
  icon?: JSX.Element
  variant?: 'default' | 'danger'
  disabled?: boolean
  onSelect?: () => void
  class?: string
}

DropdownMenu.ActionItem = (props: ActionItemProps) => {
  const [local, others] = splitProps(props, ['label', 'icon', 'variant', 'disabled', 'onSelect', 'class'])

  return (
    <KobalteDropdownMenu.Item
      class={cn(
        'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        local.variant === 'danger'
          ? 'text-danger focus:bg-danger/10 focus:text-danger'
          : 'text-text focus:bg-surface-sunken',
        local.class
      )}
      disabled={local.disabled}
      onSelect={local.onSelect}
      {...others}
    >
      <Show when={local.icon}>
        <span class="mr-2 flex-shrink-0">{local.icon}</span>
      </Show>
      {local.label}
    </KobalteDropdownMenu.Item>
  )
}

// ============================================================================
// Option - Context-aware checkbox or radio item
// ============================================================================

export interface OptionState {
  checked: boolean
}

export interface OptionProps {
  /** Label text (uses default rendering with indicator) */
  label?: string
  /** For single selection (radio): the option's value */
  value?: string
  /** For multiple selection (checkbox): controlled checked state */
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  class?: string
  /** Render prop for custom rendering. Receives { checked } state. */
  children?: (state: OptionState) => JSX.Element
}

DropdownMenu.Option = (props: OptionProps) => {
  const [local, others] = splitProps(props, ['label', 'value', 'checked', 'onChange', 'disabled', 'class', 'children'])
  const ctx = useContext(OptionContext)

  const hasCustomRender = typeof local.children === 'function'

  const itemClass = cn(
    'relative flex cursor-pointer select-none items-center rounded-sm py-1.5 text-sm outline-none transition-colors',
    'text-text focus:bg-surface-sunken',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    // Only add left padding for indicator when using default rendering
    !hasCustomRender && 'pl-8 pr-2',
    local.class
  )

  const indicatorClass = 'absolute left-2 inline-flex items-center justify-center'

  // Default content with indicator
  const defaultContent = (icon: JSX.Element) => (
    <>
      <KobalteDropdownMenu.ItemIndicator class={indicatorClass}>
        {icon}
      </KobalteDropdownMenu.ItemIndicator>
      {local.label}
    </>
  )

  // Radio item (inside Select without multiple)
  if (ctx?.type === 'single') {
    return (
      <KobalteDropdownMenu.RadioItem
        class={itemClass}
        value={local.value!}
        disabled={local.disabled}
        {...others}
      >
        {(state) => hasCustomRender
          ? local.children!({ checked: state.checked() })
          : defaultContent(<DotIcon />)
        }
      </KobalteDropdownMenu.RadioItem>
    )
  }

  // Checkbox item (inside Select with multiple)
  // Note: We use local.checked directly since CheckboxItem is controlled
  return (
    <KobalteDropdownMenu.CheckboxItem
      class={itemClass}
      checked={local.checked}
      onChange={local.onChange}
      disabled={local.disabled}
      {...others}
    >
      {hasCustomRender
        ? local.children!({ checked: local.checked ?? false })
        : defaultContent(<CheckIcon />)
      }
    </KobalteDropdownMenu.CheckboxItem>
  )
}

// ============================================================================
// Separator
// ============================================================================

export interface SeparatorProps {
  class?: string
}

DropdownMenu.Separator = (props: SeparatorProps) => (
  <KobalteDropdownMenu.Separator class={cn('-mx-1 my-1 h-px bg-border', props.class)} />
)

// ============================================================================
// Group - Visual grouping with optional label
// ============================================================================

export interface GroupProps {
  label?: string
  children: JSX.Element
  class?: string
}

DropdownMenu.Group = (props: GroupProps) => {
  const [local, others] = splitProps(props, ['label', 'children', 'class'])

  return (
    <KobalteDropdownMenu.Group class={local.class} {...others}>
      <Show when={local.label}>
        <KobalteDropdownMenu.GroupLabel class="px-2 py-1.5 text-xs font-medium text-text-muted">
          {local.label}
        </KobalteDropdownMenu.GroupLabel>
      </Show>
      {local.children}
    </KobalteDropdownMenu.Group>
  )
}

// ============================================================================
// Select - Radio group (single) or Checkbox group (multiple)
// ============================================================================

export interface SelectProps {
  label?: string
  /** Enable multiple selection (checkboxes). Default: single selection (radio) */
  multiple?: boolean
  /** For single selection: controlled value */
  value?: string
  /** For single selection: change handler */
  onChange?: (value: string) => void
  children: JSX.Element
  class?: string
}

DropdownMenu.Select = (props: SelectProps) => {
  const [local, others] = splitProps(props, ['label', 'multiple', 'value', 'onChange', 'children', 'class'])

  // Multiple selection (checkboxes)
  if (local.multiple) {
    return (
      <KobalteDropdownMenu.Group class={local.class} {...others}>
        <Show when={local.label}>
          <KobalteDropdownMenu.GroupLabel class="px-2 py-1.5 text-xs font-medium text-text-muted">
            {local.label}
          </KobalteDropdownMenu.GroupLabel>
        </Show>
        <OptionContext.Provider value={{ type: 'multi' }}>
          {local.children}
        </OptionContext.Provider>
      </KobalteDropdownMenu.Group>
    )
  }

  // Single selection (radio)
  return (
    <KobalteDropdownMenu.RadioGroup value={local.value} onChange={local.onChange} class={local.class} {...others}>
      <Show when={local.label}>
        <KobalteDropdownMenu.GroupLabel class="px-2 py-1.5 text-xs font-medium text-text-muted">
          {local.label}
        </KobalteDropdownMenu.GroupLabel>
      </Show>
      <OptionContext.Provider value={{ type: 'single' }}>
        {local.children}
      </OptionContext.Provider>
    </KobalteDropdownMenu.RadioGroup>
  )
}

// ============================================================================
// Menu - Nested submenu
// ============================================================================

export interface MenuProps {
  label: string
  icon?: JSX.Element
  disabled?: boolean
  children: JSX.Element
  class?: string
}

DropdownMenu.Menu = (props: MenuProps) => {
  const [local, others] = splitProps(props, ['label', 'icon', 'disabled', 'children', 'class'])

  return (
    <KobalteDropdownMenu.Sub {...others}>
      <KobalteDropdownMenu.SubTrigger
        class={cn(
          'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
          'text-text focus:bg-surface-sunken',
          'data-[expanded]:bg-surface-sunken',
          'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
        )}
        disabled={local.disabled}
      >
        <Show when={local.icon}>
          <span class="mr-2 flex-shrink-0">{local.icon}</span>
        </Show>
        {local.label}
        <ChevronRightIcon />
      </KobalteDropdownMenu.SubTrigger>
      <KobalteDropdownMenu.Portal>
        <KobalteDropdownMenu.SubContent
          class={cn(
            'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface-raised text-text p-1 shadow-lg',
            'data-[expanded]:animate-scale-in',
            'origin-[var(--kb-menu-content-transform-origin)]',
            local.class
          )}
        >
          {local.children}
        </KobalteDropdownMenu.SubContent>
      </KobalteDropdownMenu.Portal>
    </KobalteDropdownMenu.Sub>
  )
}

// ============================================================================
// Example usage
// ============================================================================

export function DropdownMenuExample() {
  return (
    <DropdownMenu trigger={<button class="px-3 py-1.5 rounded border border-border bg-surface hover:bg-surface-sunken">Open Menu</button>}>
      <DropdownMenu.Group label="Actions">
        <DropdownMenu.ActionItem label="Edit" onSelect={() => console.log('Edit')} />
        <DropdownMenu.ActionItem label="Duplicate" onSelect={() => console.log('Duplicate')} />
      </DropdownMenu.Group>
      <DropdownMenu.Separator />
      <DropdownMenu.ActionItem label="Delete" variant="danger" onSelect={() => console.log('Delete')} />
    </DropdownMenu>
  )
}
