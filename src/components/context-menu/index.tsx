import { ContextMenu as KobalteContextMenu } from '@kobalte/core/context-menu'
import { type JSX, splitProps, createContext, useContext, Show } from 'solid-js'
import { cn } from '../../utils/cn'
import { CheckIcon, DotIcon, ChevronRightIcon } from '../../icons'

// Context for Option to detect parent type
type OptionContextValue = { type: 'single' | 'multi' }
const OptionContext = createContext<OptionContextValue>()

/** @deprecated Use @utility nsg-context-menu-* in CSS instead */
export const contextMenuStyles = {
  actionItem: 'nsg-context-menu-action',
  actionItemDefault: 'nsg-context-menu-action',
  actionItemDanger: 'nsg-context-menu-action-danger',
  option: 'nsg-context-menu-option',
  separator: 'nsg-context-menu-separator',
}

// ============================================================================
// Root
// ============================================================================

export interface ContextMenuProps {
  children: JSX.Element
  content: JSX.Element
  disabled?: boolean
  class?: string
}

export const ContextMenu = function (props: ContextMenuProps) {
  const [local, others] = splitProps(props, [
    'children', 'content', 'disabled', 'class'
  ])

  return (
    <KobalteContextMenu
      {...others}
    >
      <KobalteContextMenu.Trigger as="div" disabled={local.disabled}>
        {local.children}
      </KobalteContextMenu.Trigger>

      <KobalteContextMenu.Portal>
        <KobalteContextMenu.Content
          class={cn(
            'z-50',
            'nsg-context-menu-content',
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
// ActionItem
// ============================================================================

export interface ActionItemProps {
  label: string
  icon?: JSX.Element
  variant?: 'default' | 'danger'
  disabled?: boolean
  onSelect?: () => void
  unstyled?: boolean
  class?: string
}

ContextMenu.ActionItem = (props: ActionItemProps) => {
  const [local, others] = splitProps(props, ['label', 'icon', 'variant', 'disabled', 'onSelect', 'unstyled', 'class'])

  return (
    <KobalteContextMenu.Item
      class={cn(
        'relative flex cursor-pointer select-none items-center outline-none transition-colors',
        !local.unstyled && (
          local.variant === 'danger'
            ? 'nsg-context-menu-action-danger'
            : 'nsg-context-menu-action'
        ),
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
  unstyled?: boolean
  class?: string
}

ContextMenu.Separator = (props: SeparatorProps) => (
  <KobalteContextMenu.Separator class={cn(!props.unstyled && 'nsg-context-menu-separator', props.class)} />
)

// ============================================================================
// Group
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
// Option
// ============================================================================

export interface OptionState {
  checked: boolean
}

export interface OptionProps {
  label?: string
  value?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  unstyled?: boolean
  class?: string
  children?: (state: OptionState) => JSX.Element
}

ContextMenu.Option = (props: OptionProps) => {
  const [local, others] = splitProps(props, ['label', 'value', 'checked', 'onChange', 'disabled', 'unstyled', 'class', 'children'])
  const ctx = useContext(OptionContext)

  const hasCustomRender = typeof local.children === 'function'

  const itemClass = cn(
    'relative flex cursor-pointer select-none items-center outline-none transition-colors',
    !local.unstyled && [
      'nsg-context-menu-option',
      !hasCustomRender && 'pl-8 pr-2',
    ],
    local.class
  )

  const indicatorClass = 'absolute left-2 inline-flex items-center justify-center'

  const defaultContent = (icon: JSX.Element) => (
    <>
      <KobalteContextMenu.ItemIndicator class={indicatorClass}>
        {icon}
      </KobalteContextMenu.ItemIndicator>
      {local.label}
    </>
  )

  if (ctx?.type === 'single') {
    return (
      <KobalteContextMenu.RadioItem
        class={itemClass}
        value={local.value!}
        disabled={local.disabled}
        closeOnSelect={true}
        {...others}
      >
        {((state: { checked: () => boolean }) => hasCustomRender
          ? local.children!({ checked: state?.checked() ?? false })
          : defaultContent(<DotIcon />)
        ) as unknown as JSX.Element}
      </KobalteContextMenu.RadioItem>
    )
  }

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
// Select
// ============================================================================

export interface SelectProps {
  label?: string
  multiple?: boolean
  value?: string
  onChange?: (value: string) => void
  children: JSX.Element
  class?: string
}

ContextMenu.Select = (props: SelectProps) => {
  const [local, others] = splitProps(props, ['label', 'multiple', 'value', 'onChange', 'children', 'class'])

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
// Menu
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
          'relative flex cursor-pointer select-none items-center outline-none transition-colors',
          'nsg-context-menu-subtrigger',
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
            'z-50',
            'nsg-context-menu-subcontent',
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
