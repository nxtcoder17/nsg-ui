import { SegmentedControl as KobalteSegmentedControl } from '@kobalte/core/segmented-control'
import { splitProps, JSX, Show } from 'solid-js'
import { cn } from '../../utils/cn'

export type SegmentedControlProps = {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  label?: string
  description?: string
  errorMessage?: string
  validationState?: 'valid' | 'invalid'
  direction?: 'row' | 'column'
  disabled?: boolean
  name?: string
  class?: string
  children?: JSX.Element
}

export const SegmentedControl = (props: SegmentedControlProps) => {
  const [local, others] = splitProps(props, [
    'value',
    'defaultValue',
    'onChange',
    'label',
    'description',
    'errorMessage',
    'validationState',
    'direction',
    'disabled',
    'name',
    'class',
    'children',
  ])

  const isColumn = () => local.direction === 'column'

  return (
    <KobalteSegmentedControl
      value={local.value}
      defaultValue={local.defaultValue}
      onChange={local.onChange}
      orientation={isColumn() ? 'vertical' : 'horizontal'}
      validationState={local.validationState}
      disabled={local.disabled}
      name={local.name}
      class={cn('flex flex-col gap-1.5 max-w-fit', local.disabled && 'opacity-50', local.class)}
      {...others}
    >
      <Show when={local.label}>
        <KobalteSegmentedControl.Label class="nsg-segmented-control-label">
          {local.label}
        </KobalteSegmentedControl.Label>
      </Show>

      <div
        role="presentation"
        class={cn(
          'relative inline-flex items-stretch',
          'nsg-segmented-control-track',
          '[&>*:nth-child(2)]:before:hidden [&>[data-checked]+*]:before:opacity-0',
          isColumn() ? 'flex-col' : 'flex-row',
        )}
      >
        <KobalteSegmentedControl.Indicator
          class={cn(
            'absolute pointer-events-none',
            'nsg-segmented-control-indicator',
            isColumn() ? 'left-1 right-1' : 'top-1 bottom-1'
          )}
        />
        {local.children}
      </div>

      <Show when={local.description}>
        <KobalteSegmentedControl.Description class="nsg-segmented-control-description">
          {local.description}
        </KobalteSegmentedControl.Description>
      </Show>

      <Show when={local.errorMessage}>
        <KobalteSegmentedControl.ErrorMessage class="nsg-segmented-control-error">
          {local.errorMessage}
        </KobalteSegmentedControl.ErrorMessage>
      </Show>
    </KobalteSegmentedControl>
  )
}

export type SegmentedControlItemProps = {
  value: string
  disabled?: boolean
  class?: string
  unstyled?: boolean
  children?: JSX.Element
}

SegmentedControl.Item = (props: SegmentedControlItemProps) => {
  const [local, others] = splitProps(props, ['value', 'disabled', 'class', 'children', 'unstyled'])

  return (
    <KobalteSegmentedControl.Item
      value={local.value}
      disabled={local.disabled}
      class={cn(
        'relative z-10 cursor-pointer flex items-center justify-center',
        'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
        !local.unstyled && [
          'nsg-segmented-control-item',
          'nsg-segmented-control-item-separator',
        ],
        local.class,
      )}
      {...others}
    >
      <KobalteSegmentedControl.ItemInput class="sr-only" />
      <KobalteSegmentedControl.ItemLabel class={'flex items-center justify-center gap-1.5 px-3 py-1.5 w-full h-full'}>
        {local.children}
      </KobalteSegmentedControl.ItemLabel>
    </KobalteSegmentedControl.Item>
  )
}
