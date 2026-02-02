import { SegmentedControl as KobalteSegmentedControl } from '@kobalte/core/segmented-control'
import { splitProps, JSX, For, Show } from 'solid-js'
import { cn } from '../../utils/cn'

export type SegmentedOption = {
  value: string
  label?: string
  /** Icon element to display (can be used with or without label) */
  icon?: JSX.Element
  disabled?: boolean
}

export type SegmentedControlProps = {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  options: SegmentedOption[]
  label?: string
  description?: string
  errorMessage?: string
  validationState?: 'valid' | 'invalid'
  orientation?: 'horizontal' | 'vertical'
  disabled?: boolean
  name?: string
  class?: string
}

export const SegmentedControl = (props: SegmentedControlProps) => {
  const [local, others] = splitProps(props, [
    'value',
    'defaultValue',
    'onChange',
    'options',
    'label',
    'description',
    'errorMessage',
    'validationState',
    'orientation',
    'disabled',
    'name',
    'class',
  ])

  const isInvalid = () => local.validationState === 'invalid'
  const isVertical = () => local.orientation === 'vertical'

  return (
    <KobalteSegmentedControl
      value={local.value}
      defaultValue={local.defaultValue}
      onChange={local.onChange}
      orientation={local.orientation}
      validationState={local.validationState}
      disabled={local.disabled}
      name={local.name}
      class={cn('flex flex-col gap-1.5', local.disabled && 'opacity-50', local.class)}
      {...others}
    >
      <Show when={local.label}>
        <KobalteSegmentedControl.Label class="text-sm font-medium text-text">
          {local.label}
        </KobalteSegmentedControl.Label>
      </Show>

      <div
        role="presentation"
        class={cn(
          'relative inline-flex p-1 rounded-lg bg-surface-sunken',
          isVertical() ? 'flex-col' : 'flex-row'
        )}
      >
        <KobalteSegmentedControl.Indicator
          class={cn(
            'absolute bg-surface-raised rounded-md shadow-sm transition-all duration-200 pointer-events-none',
            isVertical() ? 'left-1 right-1' : 'top-1 bottom-1'
          )}
        />
        <For each={local.options}>
          {(option) => (
            <KobalteSegmentedControl.Item
              value={option.value}
              disabled={option.disabled}
              class={cn(
                'relative z-10 px-3 py-1.5 text-sm font-medium rounded-md cursor-pointer',
                'text-text-secondary transition-colors hover:text-text hover:bg-transparent',
                'data-[checked]:text-text',
                'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              )}
            >
              <KobalteSegmentedControl.ItemInput class="sr-only" />
              <KobalteSegmentedControl.ItemLabel class="flex items-center gap-1.5">
                <Show when={option.icon}>{option.icon}</Show>
                <Show when={option.label}>{option.label}</Show>
              </KobalteSegmentedControl.ItemLabel>
            </KobalteSegmentedControl.Item>
          )}
        </For>
      </div>

      <Show when={local.description}>
        <KobalteSegmentedControl.Description class="text-xs text-text-secondary">
          {local.description}
        </KobalteSegmentedControl.Description>
      </Show>

      <Show when={local.errorMessage}>
        <KobalteSegmentedControl.ErrorMessage class="text-xs text-danger-500">
          {local.errorMessage}
        </KobalteSegmentedControl.ErrorMessage>
      </Show>
    </KobalteSegmentedControl>
  )
}
