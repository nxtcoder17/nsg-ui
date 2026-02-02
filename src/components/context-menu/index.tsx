import { ContextMenu as KobalteContextMenu } from '@kobalte/core/context-menu'
import { type JSX, splitProps, createContext, useContext, Show } from 'solid-js'
import { cn } from '../../utils/cn'
import { CheckIcon, DotIcon, ChevronRightIcon } from '../../icons'

// Context for Option to detect parent type
type OptionContextValue = { type: 'single' | 'multi' }
const OptionContext = createContext<OptionContextValue>()

export interface ContextMenuProps {
  /** Element that triggers the context menu on right-click */
  children: JSX.Element
  /** Menu content */
  content: JSX.Element
  /** Controlled open state */
  show?: boolean
  /** Callback when open state changes */
  onChange?: (show: boolean) => void
  /** Whether the menu is disabled */
  disabled?: boolean
  /** Additional class for the menu content */
  class?: string
}

export const ContextMenu = function (props: ContextMenuProps) {
  const [local, others] = splitProps(props, [
    'children', 'content', 'show', 'onChange', 'disabled', 'class'
  ])

  return (
    <KobalteContextMenu
      open={local.show}
      onOpenChange={local.onChange}
      {...others}
    >
      <KobalteContextMenu.Trigger as="div" disabled={local.disabled}>
        {local.children}
      </KobalteContextMenu.Trigger>

      <KobalteContextMenu.Portal>
        <KobalteContextMenu.Content
          class={cn(
            'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface-raised text-text p-1 shadow-lg',
            'data-[expanded]:animate-scale-in',
            'origin-[var(--kb-menu-content-transform-origin)]',
            local.class
          )}
        >
          {local.content}
        </KobalteContextMenu.Content>
      </KobalteContextMenu.Portal>
    </KobalteContextMenu>
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

ContextMenu.ActionItem = (props: ActionItemProps) => {
  const [local, others] = splitProps(props, ['label', 'icon', 'variant', 'disabled', 'onSelect', 'class'])

  return (
    <KobalteContextMenu.Item
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
    </KobalteContextMenu.Item>
  )
}

// ============================================================================
// Separator
// ============================================================================

export interface SeparatorProps {
  class?: string
}

ContextMenu.Separator = (props: SeparatorProps) => (
  <KobalteContextMenu.Separator class={cn('-mx-1 my-1 h-px bg-border', props.class)} />
)

// ============================================================================
// Group - Visual grouping with optional label
// ============================================================================

export interface GroupProps {
  label?: string
  children: JSX.Element
  class?: string
}

ContextMenu.Group = (props: GroupProps) => {
  const [local, others] = splitProps(props, ['label', 'children', 'class'])

  return (
    <KobalteContextMenu.Group class={local.class} {...others}>
      <Show when={local.label}>
        <KobalteContextMenu.GroupLabel class="px-2 py-1.5 text-xs font-medium text-text-muted">
          {local.label}
        </KobalteContextMenu.GroupLabel>
      </Show>
      {local.children}
    </KobalteContextMenu.Group>
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

ContextMenu.Option = (props: OptionProps) => {
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
      <KobalteContextMenu.ItemIndicator class={indicatorClass}>
        {icon}
      </KobalteContextMenu.ItemIndicator>
      {local.label}
    </>
  )

  // Radio item (inside Select without multiple)
  if (ctx?.type === 'single') {
    return (
      <KobalteContextMenu.RadioItem
        class={itemClass}
        value={local.value!}
        disabled={local.disabled}
        closeOnSelect={true}
        {...others}
      >
        {(state) => hasCustomRender
          ? local.children!({ checked: state?.checked() ?? false })
          : defaultContent(<DotIcon />)
        }
      </KobalteContextMenu.RadioItem>
    )
  }

  // Checkbox item (inside Select with multiple)
  return (
    <KobalteContextMenu.CheckboxItem
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
    </KobalteContextMenu.CheckboxItem>
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

ContextMenu.Select = (props: SelectProps) => {
  const [local, others] = splitProps(props, ['label', 'multiple', 'value', 'onChange', 'children', 'class'])

  // Multiple selection (checkboxes)
  if (local.multiple) {
    return (
      <KobalteContextMenu.Group class={local.class} {...others}>
        <Show when={local.label}>
          <KobalteContextMenu.GroupLabel class="px-2 py-1.5 text-xs font-medium text-text-muted">
            {local.label}
          </KobalteContextMenu.GroupLabel>
        </Show>
        <OptionContext.Provider value={{ type: 'multi' }}>
          {local.children}
        </OptionContext.Provider>
      </KobalteContextMenu.Group>
    )
  }

  // Single selection (radio)
  return (
    <KobalteContextMenu.RadioGroup value={local.value} onChange={local.onChange} class={local.class} {...others}>
      <Show when={local.label}>
        <KobalteContextMenu.GroupLabel class="px-2 py-1.5 text-xs font-medium text-text-muted">
          {local.label}
        </KobalteContextMenu.GroupLabel>
      </Show>
      <OptionContext.Provider value={{ type: 'single' }}>
        {local.children}
      </OptionContext.Provider>
    </KobalteContextMenu.RadioGroup>
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

ContextMenu.Menu = (props: MenuProps) => {
  const [local, others] = splitProps(props, ['label', 'icon', 'disabled', 'children', 'class'])

  return (
    <KobalteContextMenu.Sub {...others}>
      <KobalteContextMenu.SubTrigger
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
      </KobalteContextMenu.SubTrigger>
      <KobalteContextMenu.Portal>
        <KobalteContextMenu.SubContent
          class={cn(
            'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface-raised text-text p-1 shadow-lg',
            'data-[expanded]:animate-scale-in',
            'origin-[var(--kb-menu-content-transform-origin)]',
            local.class
          )}
        >
          {local.children}
        </KobalteContextMenu.SubContent>
      </KobalteContextMenu.Portal>
    </KobalteContextMenu.Sub>
  )
}
