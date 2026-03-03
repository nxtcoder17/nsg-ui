import { ContextMenu as KobalteContextMenu } from '@kobalte/core/context-menu'
import { type JSX, splitProps, Show } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { cn } from '../../utils/cn'
import { CheckIcon, DotIcon, ChevronRightIcon, type Icon } from '../../icons'

export interface ContextMenuProps {
  trigger: JSX.Element
  children: JSX.Element
  disabled?: boolean
  unstyled?: boolean
  class?: string
}

function ContextMenuRoot(props: ContextMenuProps) {
  const [local, others] = splitProps(props, ['trigger', 'children', 'disabled', 'unstyled', 'class'])

  return (
    <KobalteContextMenu {...others}>
      <KobalteContextMenu.Trigger as="div" disabled={local.disabled}>
        {local.trigger}
      </KobalteContextMenu.Trigger>

      <KobalteContextMenu.Portal>
        <KobalteContextMenu.Content
          class={cn(!local.unstyled && 'nsg-context-menu', local.class)}
          {...(!local.unstyled && { 'data-nsg-context-menu': 'content' })}
        >
          {local.children}
        </KobalteContextMenu.Content>
      </KobalteContextMenu.Portal>
    </KobalteContextMenu>
  )
}

export interface ActionItemProps {
  variant?: 'default' | 'danger'
  disabled?: boolean
  onSelect?: () => void
  unstyled?: boolean
  class?: string
  children: JSX.Element | string
}

function ActionItem(props: ActionItemProps) {
  const [local, others] = splitProps(props, ['variant', 'disabled', 'onSelect', 'unstyled', 'class', 'children'])

  return (
    <KobalteContextMenu.Item
      class={cn(local.class)}
      {...(!local.unstyled && { 'data-nsg-context-menu': 'action' })}
      {...(!local.unstyled && local.variant === 'danger' && { 'data-variant': 'danger' })}
      disabled={local.disabled}
      onSelect={local.onSelect}
      {...others}
    >
      {local.children}
    </KobalteContextMenu.Item>
  )
}

export interface SeparatorProps {
  unstyled?: boolean
  class?: string
}

function Separator(props: SeparatorProps) {
  return (
    <KobalteContextMenu.Separator
      class={props.class}
      {...(!props.unstyled && { 'data-nsg-context-menu': 'separator' })}
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
    <KobalteContextMenu.Group class={local.class} {...others}>
      <Show when={local.label}>
        <KobalteContextMenu.GroupLabel {...(!local.unstyled && { 'data-nsg-context-menu': 'group-label' })}>
          {local.label}
        </KobalteContextMenu.GroupLabel>
      </Show>
      {local.children}
    </KobalteContextMenu.Group>
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
    <KobalteContextMenu.RadioGroup value={local.value} onChange={local.onChange} class={local.class} {...others}>
      <Show when={local.label}>
        <KobalteContextMenu.GroupLabel {...(!local.unstyled && { 'data-nsg-context-menu': 'group-label' })}>
          {local.label}
        </KobalteContextMenu.GroupLabel>
      </Show>
      {local.children}
    </KobalteContextMenu.RadioGroup>
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
    <KobalteContextMenu.RadioItem
      class={cn(local.class)}
      {...(!local.unstyled && { 'data-nsg-context-menu': 'option' })}
      value={local.value}
      disabled={local.disabled}
      closeOnSelect={true}
      {...others}
    >
      <KobalteContextMenu.ItemIndicator {...(!local.unstyled && { 'data-nsg-context-menu': 'option-indicator' })}>
        <DotIcon />
      </KobalteContextMenu.ItemIndicator>
      {local.children}
    </KobalteContextMenu.RadioItem>
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
    <KobalteContextMenu.Group class={local.class} {...others}>
      <Show when={local.label}>
        <KobalteContextMenu.GroupLabel {...(!local.unstyled && { 'data-nsg-context-menu': 'group-label' })}>
          {local.label}
        </KobalteContextMenu.GroupLabel>
      </Show>
      {local.children}
    </KobalteContextMenu.Group>
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
    <KobalteContextMenu.CheckboxItem
      class={cn(local.class)}
      {...(!local.unstyled && { 'data-nsg-context-menu': 'option' })}
      checked={local.checked}
      onChange={local.onChange}
      disabled={local.disabled}
      {...others}
    >
      <KobalteContextMenu.ItemIndicator {...(!local.unstyled && { 'data-nsg-context-menu': 'option-indicator' })}>
        <CheckIcon />
      </KobalteContextMenu.ItemIndicator>
      {local.children}
    </KobalteContextMenu.CheckboxItem>
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
    <KobalteContextMenu.Sub {...others}>
      <KobalteContextMenu.SubTrigger
        {...(!local.unstyled && { 'data-nsg-context-menu': 'submenu-trigger' })}
        disabled={local.disabled}
      >
        <Show when={local.icon}>
          <Dynamic component={local.icon} {...(!local.unstyled && { 'data-nsg-context-menu': 'submenu-trigger-icon' })} />
        </Show>
        {local.label}
        <ChevronRightIcon {...(!local.unstyled && { 'data-nsg-context-menu': 'submenu-trigger-chevron' })} />
      </KobalteContextMenu.SubTrigger>

      <KobalteContextMenu.Portal>
        <KobalteContextMenu.SubContent
          class={cn(!local.unstyled && 'nsg-context-menu', local.class)}
          {...(!local.unstyled && { 'data-nsg-context-menu': 'subcontent' })}
        >
          {local.children}
        </KobalteContextMenu.SubContent>
      </KobalteContextMenu.Portal>
    </KobalteContextMenu.Sub>
  )
}

export const ContextMenu = Object.assign(ContextMenuRoot, {
  ActionItem,
  Separator,
  Group,
  SingleSelect,
  SingleSelectItem,
  MultiSelect,
  MultiSelectItem,
  Menu,
})
