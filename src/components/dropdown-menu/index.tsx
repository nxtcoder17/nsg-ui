import { DropdownMenu as KobalteDropdownMenu } from '@kobalte/core/dropdown-menu'
import { type JSX, splitProps, createContext, useContext, Show } from 'solid-js'
import { cn } from '../../utils/cn'
import { CheckIcon, DotIcon, ChevronRightIcon } from '../../icons'
import { Text } from '../text'
import { Button } from '../button'

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
      sameWidth={true}
      {...others}
    >
      <KobalteDropdownMenu.Trigger as="div" class="max-w-fit" aria-label={local.triggerLabel}>
        {local.trigger}
      </KobalteDropdownMenu.Trigger>

      <KobalteDropdownMenu.Portal>
        <KobalteDropdownMenu.Content
          class={cn(
            'z-50 min-w-6 overflow-hidden p-1.5',
            'bg-surface-raised border border-border text-text',
            'shadow-[0_4px_24px_-4px_rgba(0,0,0,0.15),0_1px_3px_rgba(0,0,0,0.08)]',
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
        !local.unstyled && [
          'rounded-sm px-2 py-1 text-sm',
          local.variant === 'danger'
            ? 'text-danger data-[highlighted]:bg-danger-100 data-[highlighted]:text-danger'
            : 'text-text data-[highlighted]:bg-surface-sunken data-[highlighted]:text-text',
        ],
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
    'relative flex cursor-pointer select-none items-center rounded-lg py-2 text-sm outline-none transition-all duration-150',
    'text-text focus:bg-surface-sunken',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    // Only add left padding for indicator when using default rendering
    !hasCustomRender && 'pl-9 pr-3',
    local.class
  )

  const indicatorClass = 'absolute left-3 inline-flex items-center justify-center text-primary'

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

export interface SeparatorProps {
  class?: string
}

DropdownMenu.Separator = (props: SeparatorProps) => (
  <KobalteDropdownMenu.Separator class={cn('-mx-1.5 my-1.5 h-px bg-border', props.class)} />
)

export interface GroupProps {
  label?: string
  children: JSX.Element
  class?: string
}

const ItemLabel = (props) => {
  return <Show when={props.children}>
    <KobalteDropdownMenu.ItemLabel>
      <Text color="muted" class="text-sm">{props.children}</Text>
    </KobalteDropdownMenu.ItemLabel>
  </Show>
}

const GroupLabel = (props) => {
  return <Show when={props.children}>
    <KobalteDropdownMenu.GroupLabel>
      <Text color="muted" class="text-sm">{props.children}</Text>
    </KobalteDropdownMenu.GroupLabel>
  </Show>
}

DropdownMenu.Group = (props: GroupProps) => {
  const [local, others] = splitProps(props, ['label', 'children', 'class'])

  return (
    <KobalteDropdownMenu.Group class={local.class} {...others}>
      <GroupLabel>{local.label}</GroupLabel>
      {local.children}
    </KobalteDropdownMenu.Group>
  )
}

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
        <GroupLabel>{local.label}</GroupLabel>
        <OptionContext.Provider value={{ type: 'multi' }}>
          {local.children}
        </OptionContext.Provider>
      </KobalteDropdownMenu.Group>
    )
  }

  // Single selection (radio)
  return (
    <KobalteDropdownMenu.RadioGroup value={local.value} onChange={local.onChange} class={local.class} {...others}>
      <GroupLabel>{local.label}</GroupLabel>
      <OptionContext.Provider value={{ type: 'single' }}>
        {local.children}
      </OptionContext.Provider>
    </KobalteDropdownMenu.RadioGroup>
  )
}

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
          'relative flex cursor-pointer select-none items-center px-3 py-2 text-sm outline-none transition-all duration-150',
          'text-text focus:bg-surface-sunken',
          'data-[expanded]:bg-surface-sunken',
          'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
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
            'z-50 min-w-[10rem] overflow-hidden rounded-xl p-1.5',
            'bg-surface-raised border border-border text-text',
            'shadow-[0_4px_24px_-4px_rgba(0,0,0,0.15),0_1px_3px_rgba(0,0,0,0.08)]',
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
      <DropdownMenu.ActionItem unstyled onSelect={() => console.log('Settings')}>
        <div class="flex items-center gap-2 px-2 py-1 rounded-sm group-data-[highlighted]:bg-surface-sunken">
          <span>Settings</span>
          <kbd class="ml-auto text-xs text-text-muted">⌘,</kbd>
        </div>
      </DropdownMenu.ActionItem>
      <DropdownMenu.Separator />
      <DropdownMenu.ActionItem variant="danger" onSelect={() => console.log('Delete')}>Delete</DropdownMenu.ActionItem>
    </DropdownMenu>
  )
}
