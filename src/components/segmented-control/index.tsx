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
  unstyled?: boolean
  class?: string
  children?: JSX.Element
}

const SegmentedControlRoot = (props: SegmentedControlProps) => {
  const [local, others] = splitProps(props, [
    'value', 'defaultValue', 'onChange', 'label', 'description',
    'errorMessage', 'validationState', 'direction', 'disabled',
    'name', 'unstyled', 'class', 'children',
  ])

  return (
    <KobalteSegmentedControl
      value={local.value}
      defaultValue={local.defaultValue}
      onChange={local.onChange}
      orientation={local.direction === 'column' ? 'vertical' : 'horizontal'}
      validationState={local.validationState}
      disabled={local.disabled}
      name={local.name}
      class={cn(!local.unstyled && 'nsg-segmented-control', local.class)}
      {...others}
    >
      <Show when={local.label}>
        <KobalteSegmentedControl.Label
          {...(!local.unstyled && { 'data-nsg-segmented-control': 'label' })}
        >
          {local.label}
        </KobalteSegmentedControl.Label>
      </Show>

      <div
        role="presentation"
        class="relative inline-flex items-stretch"
        {...(!local.unstyled && { 'data-nsg-segmented-control': 'track' })}
      >
        <KobalteSegmentedControl.Indicator
          class="absolute pointer-events-none"
          {...(!local.unstyled && { 'data-nsg-segmented-control': 'indicator' })}
        />
        {local.children}
      </div>

      <Show when={local.description}>
        <KobalteSegmentedControl.Description
          {...(!local.unstyled && { 'data-nsg-segmented-control': 'description' })}
        >
          {local.description}
        </KobalteSegmentedControl.Description>
      </Show>

      <Show when={local.errorMessage}>
        <KobalteSegmentedControl.ErrorMessage
          {...(!local.unstyled && { 'data-nsg-segmented-control': 'error' })}
        >
          {local.errorMessage}
        </KobalteSegmentedControl.ErrorMessage>
      </Show>
    </KobalteSegmentedControl>
  )
}

export type SegmentedControlItemProps = {
  value: string
  disabled?: boolean
  unstyled?: boolean
  class?: string
  children?: JSX.Element
  'aria-label'?: string
}

const Item = (props: SegmentedControlItemProps) => {
  const [local, others] = splitProps(props, ['value', 'disabled', 'unstyled', 'class', 'children', 'aria-label'])

  return (
    <KobalteSegmentedControl.Item
      value={local.value}
      disabled={local.disabled}
      class={cn('relative z-10', local.class)}
      {...(!local.unstyled && { 'data-nsg-segmented-control': 'item' })}
      {...others}
    >
      <KobalteSegmentedControl.ItemInput class="sr-only" aria-label={local['aria-label']} />
      <KobalteSegmentedControl.ItemLabel
        class="flex items-center justify-center w-full h-full"
        {...(!local.unstyled && { 'data-nsg-segmented-control': 'item-label' })}
      >
        {local.children}
      </KobalteSegmentedControl.ItemLabel>
    </KobalteSegmentedControl.Item>
  )
}

export const SegmentedControl = Object.assign(SegmentedControlRoot, { Item })
