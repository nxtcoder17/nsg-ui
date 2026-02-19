import { DropdownMenu as KobalteDropdownMenu } from '@kobalte/core/dropdown-menu'
import { type JSX, splitProps, createContext, useContext, Show } from 'solid-js'
import { cn } from '../../utils/cn'
import { CheckIcon, DotIcon, ChevronRightIcon } from '../../icons'
import { Text } from '../text'
import { Button } from '../button'

// Context for Option to detect parent type
type OptionContextValue = { type: 'single' | 'multi' }
const OptionContext = createContext<OptionContextValue>()

/** @deprecated Use @utility nsg-dropdown-menu-* in CSS instead */
export const dropdownMenuStyles = {
  actionItem: 'nsg-dropdown-menu-action',
  actionItemDefault: 'nsg-dropdown-menu-action',
  actionItemDanger: 'nsg-dropdown-menu-action-danger',
  option: 'nsg-dropdown-menu-option',
  separator: 'nsg-dropdown-menu-separator',
}

// ============================================================================
// Root
// ============================================================================

export interface DropdownMenuProps {
  show?: boolean
  onChange?: (show: boolean) => void
  trigger: JSX.Element
  triggerLabel?: string
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
  gutter?: number
  children?: JSX.Element
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
      sameWidth={true}
      {...others}
    >
      <KobalteDropdownMenu.Trigger as="div" class="max-w-fit" aria-label={local.triggerLabel}>
        {local.trigger}
      </KobalteDropdownMenu.Trigger>

      <KobalteDropdownMenu.Portal>
        <KobalteDropdownMenu.Content
          class={cn(
            'z-50 min-w-6 overflow-hidden',
            'nsg-dropdown-menu-content',
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
// ActionItem
// ============================================================================

export interface ActionItemProps {
  variant?: 'default' | 'danger'
  disabled?: boolean
  onSelect?: () => void
  class?: string
  unstyled?: boolean
  children: JSX.Element | string
}

DropdownMenu.ActionItem = (props: ActionItemProps) => {
  const [local, others] = splitProps(props, ['variant', 'disabled', 'onSelect', 'class', 'unstyled', 'children'])

  return (
    <KobalteDropdownMenu.Item
      class={cn(
        'group relative flex cursor-pointer select-none items-center outline-none transition-all duration-150',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        !local.unstyled && (
          local.variant === 'danger'
            ? 'nsg-dropdown-menu-action-danger'
            : 'nsg-dropdown-menu-action'
        ),
        local.class
      )}
      disabled={local.disabled}
      onSelect={local.onSelect}
      {...others}
    >
      {local.children}
    </KobalteDropdownMenu.Item>
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

DropdownMenu.Option = (props: OptionProps) => {
  const [local, others] = splitProps(props, ['label', 'value', 'checked', 'onChange', 'disabled', 'unstyled', 'class', 'children'])
  const ctx = useContext(OptionContext)

  const hasCustomRender = typeof local.children === 'function'

  const itemClass = cn(
    'relative flex cursor-pointer select-none items-center outline-none transition-all duration-150',
    !local.unstyled && [
      'nsg-dropdown-menu-option',
      !hasCustomRender && 'pl-9 pr-3',
    ],
    local.class
  )

  const indicatorClass = 'absolute left-3 inline-flex items-center justify-center text-primary'

  const defaultContent = (icon: JSX.Element) => (
    <>
      <KobalteDropdownMenu.ItemIndicator class={indicatorClass}>
        {icon}
      </KobalteDropdownMenu.ItemIndicator>
      {local.label}
    </>
  )

  if (ctx?.type === 'single') {
    return (
      <KobalteDropdownMenu.RadioItem
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
      </KobalteDropdownMenu.RadioItem>
    )
  }

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
  unstyled?: boolean
  class?: string
}

DropdownMenu.Separator = (props: SeparatorProps) => (
  <KobalteDropdownMenu.Separator class={cn(!props.unstyled && 'nsg-dropdown-menu-separator', props.class)} />
)

// ============================================================================
// Group
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
        <KobalteDropdownMenu.GroupLabel>
          <Text color="muted" class="text-sm">{local.label}</Text>
        </KobalteDropdownMenu.GroupLabel>
      </Show>
      {local.children}
    </KobalteDropdownMenu.Group>
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

DropdownMenu.Select = (props: SelectProps) => {
  const [local, others] = splitProps(props, ['label', 'multiple', 'value', 'onChange', 'children', 'class'])

  if (local.multiple) {
    return (
      <KobalteDropdownMenu.Group class={local.class} {...others}>
        <Show when={local.label}>
          <KobalteDropdownMenu.GroupLabel>
            <Text color="muted" class="text-sm">{local.label}</Text>
          </KobalteDropdownMenu.GroupLabel>
        </Show>
        <OptionContext.Provider value={{ type: 'multi' }}>
          {local.children}
        </OptionContext.Provider>
      </KobalteDropdownMenu.Group>
    )
  }

  return (
    <KobalteDropdownMenu.RadioGroup value={local.value} onChange={local.onChange} class={local.class} {...others}>
      <Show when={local.label}>
        <KobalteDropdownMenu.GroupLabel>
          <Text color="muted" class="text-sm">{local.label}</Text>
        </KobalteDropdownMenu.GroupLabel>
      </Show>
      <OptionContext.Provider value={{ type: 'single' }}>
        {local.children}
      </OptionContext.Provider>
    </KobalteDropdownMenu.RadioGroup>
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

DropdownMenu.Menu = (props: MenuProps) => {
  const [local, others] = splitProps(props, ['label', 'icon', 'disabled', 'children', 'class'])

  return (
    <KobalteDropdownMenu.Sub {...others}>
      <KobalteDropdownMenu.SubTrigger
        class={cn(
          'max-w-fit',
          'relative flex cursor-pointer select-none items-center outline-none transition-all duration-150',
          'nsg-dropdown-menu-subtrigger',
        )}
        disabled={local.disabled}
      >
        <Show when={local.icon}>
          <span class="mr-2.5 flex-shrink-0 text-text-muted">{local.icon}</span>
        </Show>
        {local.label}
        <span class="ml-auto text-text-muted">
          <ChevronRightIcon />
        </span>
      </KobalteDropdownMenu.SubTrigger>
      <KobalteDropdownMenu.Portal>
        <KobalteDropdownMenu.SubContent
          class={cn(
            'z-50',
            'nsg-dropdown-menu-subcontent',
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

export function DropdownMenuExample() {
  return (
    <DropdownMenu trigger={<Button variant="outline">Open Menu</Button>}>
      <DropdownMenu.Group label="Actions">
        <DropdownMenu.ActionItem onSelect={() => console.log('Edit')}>Edit</DropdownMenu.ActionItem>
        <DropdownMenu.ActionItem onSelect={() => console.log('Duplicate')}>Duplicate</DropdownMenu.ActionItem>
      </DropdownMenu.Group>
      <DropdownMenu.Separator />
      <DropdownMenu.ActionItem onSelect={() => console.log('Settings')}>
        Settings
      </DropdownMenu.ActionItem>
      <DropdownMenu.Separator />
      <DropdownMenu.ActionItem variant="danger" onSelect={() => console.log('Delete')}>Delete</DropdownMenu.ActionItem>
    </DropdownMenu>
  )
}
