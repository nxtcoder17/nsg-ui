import { DropdownMenu as KobalteDropdownMenu } from '@kobalte/core/dropdown-menu'
import { type JSX, splitProps, Show } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { cn } from '../../utils/cn'
import { CheckIcon, DotIcon, ChevronRightIcon, type Icon } from '../../icons'

export interface DropdownMenuProps {
  show?: boolean
  onChange?: (show: boolean) => void
  trigger: JSX.Element
  triggerLabel?: string
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
  gutter?: number
  children?: JSX.Element
  unstyled?: boolean
  class?: string
}

function DropdownMenuRoot(props: DropdownMenuProps) {
  const [local, others] = splitProps(props, [
    'show', 'onChange', 'trigger', 'triggerLabel', 'placement', 'gutter', 'children', 'unstyled', 'class'
  ])

  return (
    <KobalteDropdownMenu
      open={local.show}
      onOpenChange={local.onChange}
      placement={local.placement}
      gutter={local.gutter ?? 8}
      sameWidth
      {...others}
    >
      <KobalteDropdownMenu.Trigger as="div" class="max-w-fit" aria-label={local.triggerLabel}>
        {local.trigger}
      </KobalteDropdownMenu.Trigger>

      <KobalteDropdownMenu.Portal>
        <KobalteDropdownMenu.Content
          class={cn(!local.unstyled && 'nsg-dropdown-menu', local.class)}
          {...(!local.unstyled && { 'data-nsg-dropdown-menu': 'content' })}
        >
          {local.children}
        </KobalteDropdownMenu.Content>
      </KobalteDropdownMenu.Portal>
    </KobalteDropdownMenu>
  )
}

export interface ActionItemProps {
  variant?: 'default' | 'danger'
  disabled?: boolean
  onSelect?: () => void
  class?: string
  unstyled?: boolean
  children: JSX.Element | string
}

function ActionItem(props: ActionItemProps) {
  const [local, others] = splitProps(props, ['variant', 'disabled', 'onSelect', 'class', 'unstyled', 'children'])

  return (
    <KobalteDropdownMenu.Item
      class={cn(local.class)}
      {...(!local.unstyled && { 'data-nsg-dropdown-menu': 'action' })}
      {...(!local.unstyled && local.variant === 'danger' && { 'data-variant': 'danger' })}
      disabled={local.disabled}
      onSelect={local.onSelect}
      {...others}
    >
      {local.children}
    </KobalteDropdownMenu.Item>
  )
}

export interface SeparatorProps {
  unstyled?: boolean
  class?: string
}

function Separator(props: SeparatorProps) {
  const [local, others] = splitProps(props, ['unstyled', 'class'])
  return (
    <KobalteDropdownMenu.Separator
      class={local.class}
      {...(!local.unstyled && { 'data-nsg-dropdown-menu': 'separator' })}
      {...others}
    />
  )
}

export interface GroupProps {
  label?: string
  children: JSX.Element
  unstyled?: boolean
  class?: string
}

function Group(props: GroupProps) {
  const [local, others] = splitProps(props, ['label', 'children', 'unstyled', 'class'])

  return (
    <KobalteDropdownMenu.Group class={local.class} {...others}>
      <Show when={local.label}>
        <KobalteDropdownMenu.GroupLabel {...(!local.unstyled && { 'data-nsg-dropdown-menu': 'group-label' })}>
          {local.label}
        </KobalteDropdownMenu.GroupLabel>
      </Show>
      {local.children}
    </KobalteDropdownMenu.Group>
  )
}

export interface SingleSelectProps {
  label?: string
  value?: string
  onChange?: (value: string) => void
  children: JSX.Element
  unstyled?: boolean
  class?: string
}

function SingleSelect(props: SingleSelectProps) {
  const [local, others] = splitProps(props, ['label', 'value', 'onChange', 'children', 'unstyled', 'class'])

  return (
    <KobalteDropdownMenu.RadioGroup value={local.value} onChange={local.onChange} class={local.class} {...others}>
      <Show when={local.label}>
        <KobalteDropdownMenu.GroupLabel {...(!local.unstyled && { 'data-nsg-dropdown-menu': 'group-label' })}>
          {local.label}
        </KobalteDropdownMenu.GroupLabel>
      </Show>
      {local.children}
    </KobalteDropdownMenu.RadioGroup>
  )
}

export interface SingleSelectItemProps {
  value: string
  disabled?: boolean
  unstyled?: boolean
  class?: string
  children: JSX.Element | string
}

function SingleSelectItem(props: SingleSelectItemProps) {
  const [local, others] = splitProps(props, ['value', 'disabled', 'unstyled', 'class', 'children'])

  return (
    <KobalteDropdownMenu.RadioItem
      class={cn(local.class)}
      {...(!local.unstyled && { 'data-nsg-dropdown-menu': 'option' })}
      value={local.value}
      disabled={local.disabled}
      closeOnSelect={true}
      {...others}
    >
      <KobalteDropdownMenu.ItemIndicator {...(!local.unstyled && { 'data-nsg-dropdown-menu': 'option-indicator' })}>
        <DotIcon />
      </KobalteDropdownMenu.ItemIndicator>
      {local.children}
    </KobalteDropdownMenu.RadioItem>
  )
}

export interface MultiSelectProps {
  label?: string
  children: JSX.Element
  unstyled?: boolean
  class?: string
}

function MultiSelect(props: MultiSelectProps) {
  const [local, others] = splitProps(props, ['label', 'children', 'unstyled', 'class'])

  return (
    <KobalteDropdownMenu.Group class={local.class} {...others}>
      <Show when={local.label}>
        <KobalteDropdownMenu.GroupLabel {...(!local.unstyled && { 'data-nsg-dropdown-menu': 'group-label' })}>
          {local.label}
        </KobalteDropdownMenu.GroupLabel>
      </Show>
      {local.children}
    </KobalteDropdownMenu.Group>
  )
}

export interface MultiSelectItemProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  unstyled?: boolean
  class?: string
  children: JSX.Element | string
}

function MultiSelectItem(props: MultiSelectItemProps) {
  const [local, others] = splitProps(props, ['checked', 'onChange', 'disabled', 'unstyled', 'class', 'children'])

  return (
    <KobalteDropdownMenu.CheckboxItem
      class={cn(local.class)}
      {...(!local.unstyled && { 'data-nsg-dropdown-menu': 'option' })}
      checked={local.checked}
      onChange={local.onChange}
      disabled={local.disabled}
      {...others}
    >
      <KobalteDropdownMenu.ItemIndicator {...(!local.unstyled && { 'data-nsg-dropdown-menu': 'option-indicator' })}>
        <CheckIcon />
      </KobalteDropdownMenu.ItemIndicator>
      {local.children}
    </KobalteDropdownMenu.CheckboxItem>
  )
}

export interface MenuProps {
  label: string
  icon?: Icon
  disabled?: boolean
  children: JSX.Element
  unstyled?: boolean
  class?: string
}

function Menu(props: MenuProps) {
  const [local, others] = splitProps(props, ['label', 'icon', 'disabled', 'children', 'unstyled', 'class'])

  return (
    <KobalteDropdownMenu.Sub {...others}>
      <KobalteDropdownMenu.SubTrigger
        {...(!local.unstyled && { 'data-nsg-dropdown-menu': 'submenu-trigger' })}
        disabled={local.disabled}
      >
        <Show when={local.icon}>
          <Dynamic component={local.icon} {...(!local.unstyled && { 'data-nsg-dropdown-menu': 'submenu-trigger-icon' })} />
        </Show>
        {local.label}
        <ChevronRightIcon {...(!local.unstyled && { 'data-nsg-dropdown-menu': 'submenu-trigger-chevron' })} />
      </KobalteDropdownMenu.SubTrigger>

      <KobalteDropdownMenu.Portal>
        <KobalteDropdownMenu.SubContent
          class={cn(!local.unstyled && 'nsg-dropdown-menu', local.class)}
          {...(!local.unstyled && { 'data-nsg-dropdown-menu': 'subcontent' })}
        >
          {local.children}
        </KobalteDropdownMenu.SubContent>
      </KobalteDropdownMenu.Portal>
    </KobalteDropdownMenu.Sub>
  )
}

export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  ActionItem,
  Separator,
  Group,
  SingleSelect,
  SingleSelectItem,
  MultiSelect,
  MultiSelectItem,
  Menu,
})
