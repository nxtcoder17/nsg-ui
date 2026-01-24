import { DropdownMenu as KobalteDropdownMenu } from '@kobalte/core/dropdown-menu'
import { type JSX, type ValidComponent, splitProps } from 'solid-js'
import { cn } from '../../utils/cn'
import { Button, type ButtonOwnProps } from '../button'

export interface DropdownMenuProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
  gutter?: number
  shift?: number
  flip?: boolean
  children?: JSX.Element
}

export const DropdownMenu = function (props: DropdownMenuProps) {
  return <KobalteDropdownMenu {...props} />
}

export interface DropdownMenuTriggerProps<T extends ValidComponent = typeof Button> extends Omit<ButtonOwnProps, 'class' | 'children'> {
  class?: string
  children?: JSX.Element
  as?: T
}

DropdownMenu.Trigger = function <T extends ValidComponent = typeof Button>(props: DropdownMenuTriggerProps<T>) {
  const [local, others] = splitProps(props, ['class', 'children', 'as'])
  return (
    <KobalteDropdownMenu.Trigger as={local.as ?? Button} class={local.class} {...others}>
      {local.children}
    </KobalteDropdownMenu.Trigger>
  )
}

export interface DropdownMenuIconProps {
  class?: string
  children?: JSX.Element
}

DropdownMenu.Icon = (props: DropdownMenuIconProps) => {
  const [local, others] = splitProps(props, ['class', 'children'])
  return (
    <KobalteDropdownMenu.Icon class={cn('ml-auto h-4 w-4', local.class)} {...others}>
      {local.children}
    </KobalteDropdownMenu.Icon>
  )
}

export interface DropdownMenuPanelProps {
  class?: string
  children?: JSX.Element
}

DropdownMenu.Panel = (props: DropdownMenuPanelProps) => {
  const [local, others] = splitProps(props, ['class', 'children'])
  return (
    <KobalteDropdownMenu.Portal>
      <KobalteDropdownMenu.Content
        class={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface-raised p-1 shadow-lg',
          'data-[expanded]:animate-scale-in',
          'origin-[var(--kb-menu-content-transform-origin)]',
          local.class
        )}
        {...others}
      >
        {local.children}
      </KobalteDropdownMenu.Content>
    </KobalteDropdownMenu.Portal>
  )
}

export interface DropdownMenuItemProps {
  class?: string
  variant?: 'default' | 'danger'
  disabled?: boolean
  closeOnSelect?: boolean
  onSelect?: () => void
  children?: JSX.Element
}

DropdownMenu.Item = (props: DropdownMenuItemProps) => {
  const [local, others] = splitProps(props, ['class', 'variant', 'children'])
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
      {...others}
    >
      {local.children}
    </KobalteDropdownMenu.Item>
  )
}

export interface DropdownMenuItemLabelProps {
  class?: string
  children?: JSX.Element
}

DropdownMenu.ItemLabel = (props: DropdownMenuItemLabelProps) => {
  const [local, others] = splitProps(props, ['class', 'children'])
  return (
    <KobalteDropdownMenu.ItemLabel class={local.class} {...others}>
      {local.children}
    </KobalteDropdownMenu.ItemLabel>
  )
}

export interface DropdownMenuItemDescriptionProps {
  class?: string
  children?: JSX.Element
}

DropdownMenu.ItemDescription = (props: DropdownMenuItemDescriptionProps) => {
  const [local, others] = splitProps(props, ['class', 'children'])
  return (
    <KobalteDropdownMenu.ItemDescription class={cn('text-xs text-text-muted', local.class)} {...others}>
      {local.children}
    </KobalteDropdownMenu.ItemDescription>
  )
}

export interface DropdownMenuItemIndicatorProps {
  class?: string
  children?: JSX.Element
}

DropdownMenu.ItemIndicator = (props: DropdownMenuItemIndicatorProps) => {
  const [local, others] = splitProps(props, ['class', 'children'])
  return (
    <KobalteDropdownMenu.ItemIndicator class={cn('absolute left-2 inline-flex items-center justify-center', local.class)} {...others}>
      {local.children}
    </KobalteDropdownMenu.ItemIndicator>
  )
}

export interface DropdownMenuSeparatorProps {
  class?: string
}

DropdownMenu.Separator = (props: DropdownMenuSeparatorProps) => (
  <KobalteDropdownMenu.Separator class={cn('-mx-1 my-1 h-px bg-border', props.class)} />
)

export interface DropdownMenuGroupProps {
  class?: string
  children?: JSX.Element
}

DropdownMenu.Group = (props: DropdownMenuGroupProps) => {
  const [local, others] = splitProps(props, ['class', 'children'])
  return (
    <KobalteDropdownMenu.Group class={local.class} {...others}>
      {local.children}
    </KobalteDropdownMenu.Group>
  )
}

export interface DropdownMenuGroupLabelProps {
  class?: string
  children?: JSX.Element
}

DropdownMenu.GroupLabel = (props: DropdownMenuGroupLabelProps) => {
  const [local, others] = splitProps(props, ['class', 'children'])
  return (
    <KobalteDropdownMenu.GroupLabel class={cn('px-2 py-1.5 text-xs font-medium text-text-muted', local.class)} {...others}>
      {local.children}
    </KobalteDropdownMenu.GroupLabel>
  )
}

export interface DropdownMenuCheckboxItemProps {
  class?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  closeOnSelect?: boolean
  children?: JSX.Element
}

DropdownMenu.CheckboxItem = (props: DropdownMenuCheckboxItemProps) => {
  const [local, others] = splitProps(props, ['class', 'children'])
  return (
    <KobalteDropdownMenu.CheckboxItem
      class={cn(
        'relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors',
        'focus:bg-surface-sunken',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        local.class
      )}
      {...others}
    >
      {local.children}
    </KobalteDropdownMenu.CheckboxItem>
  )
}

export interface DropdownMenuRadioGroupProps {
  class?: string
  value?: string
  onChange?: (value: string) => void
  children?: JSX.Element
}

DropdownMenu.RadioGroup = (props: DropdownMenuRadioGroupProps) => {
  const [local, others] = splitProps(props, ['class', 'children'])
  return (
    <KobalteDropdownMenu.RadioGroup class={local.class} {...others}>
      {local.children}
    </KobalteDropdownMenu.RadioGroup>
  )
}

export interface DropdownMenuRadioItemProps {
  class?: string
  value: string
  disabled?: boolean
  closeOnSelect?: boolean
  children?: JSX.Element
}

DropdownMenu.RadioItem = (props: DropdownMenuRadioItemProps) => {
  const [local, others] = splitProps(props, ['class', 'children'])
  return (
    <KobalteDropdownMenu.RadioItem
      class={cn(
        'relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors',
        'focus:bg-surface-sunken',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        local.class
      )}
      {...others}
    >
      {local.children}
    </KobalteDropdownMenu.RadioItem>
  )
}

export interface DropdownMenuSubmenuProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: JSX.Element
}

DropdownMenu.Submenu = (props: DropdownMenuSubmenuProps) => <KobalteDropdownMenu.Sub {...props} />

export interface DropdownMenuSubmenuTriggerProps {
  class?: string
  disabled?: boolean
  children?: JSX.Element
}

DropdownMenu.SubmenuTrigger = (props: DropdownMenuSubmenuTriggerProps) => {
  const [local, others] = splitProps(props, ['class', 'children'])
  return (
    <KobalteDropdownMenu.SubTrigger
      class={cn(
        'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
        'focus:bg-surface-sunken',
        'data-[expanded]:bg-surface-sunken',
        local.class
      )}
      {...others}
    >
      {local.children}
      <svg
        class="ml-auto h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </KobalteDropdownMenu.SubTrigger>
  )
}

export interface DropdownMenuSubmenuPanelProps {
  class?: string
  children?: JSX.Element
}

DropdownMenu.SubmenuPanel = (props: DropdownMenuSubmenuPanelProps) => {
  const [local, others] = splitProps(props, ['class', 'children'])
  return (
    <KobalteDropdownMenu.Portal>
      <KobalteDropdownMenu.SubContent
        class={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface-raised p-1 shadow-lg',
          'data-[expanded]:animate-scale-in',
          'origin-[var(--kb-menu-content-transform-origin)]',
          local.class
        )}
        {...others}
      >
        {local.children}
      </KobalteDropdownMenu.SubContent>
    </KobalteDropdownMenu.Portal>
  )
}

/** Example usage - copy this pattern */
export function DropdownMenuExample() {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
      <DropdownMenu.Panel>
        <DropdownMenu.Group>
          <DropdownMenu.GroupLabel>Actions</DropdownMenu.GroupLabel>
          <DropdownMenu.Item onSelect={() => console.log('Edit')}>Edit</DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => console.log('Duplicate')}>Duplicate</DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item variant="danger" onSelect={() => console.log('Delete')}>
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Panel>
    </DropdownMenu>
  )
}
