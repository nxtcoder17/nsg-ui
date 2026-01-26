import { RadioGroup as KobalteRadioGroup } from '@kobalte/core/radio-group'
import { type JSX, splitProps, Show } from 'solid-js'
import { cn } from '../../utils/cn'
import { DotIcon } from '../../icons'

// ============================================================================
// Types
// ============================================================================

export type RadioGroupProps = {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  disabled?: boolean
  name?: string
  errorMessage?: string
  validationState?: 'valid' | 'invalid'
  class?: string
  children?: JSX.Element
}

export type RadioOptionProps = {
  value: string
  label: string
  description?: string
  disabled?: boolean
  class?: string
}

// ============================================================================
// RadioGroup Component
// ============================================================================

export const RadioGroup = (props: RadioGroupProps) => {
  const [local, others] = splitProps(props, [
    'value',
    'defaultValue',
    'onChange',
    'orientation',
    'disabled',
    'name',
    'errorMessage',
    'validationState',
    'class',
    'children',
  ])

  const isInvalid = () => local.validationState === 'invalid'

  return (
    <KobalteRadioGroup
      value={local.value}
      defaultValue={local.defaultValue}
      onChange={local.onChange}
      orientation={local.orientation ?? 'vertical'}
      validationState={local.validationState}
      disabled={local.disabled}
      name={local.name}
      class={cn('flex flex-col gap-1', local.class)}
      {...others}
    >
      <div
        class={cn(
          'flex',
          local.orientation === 'horizontal' ? 'flex-row gap-4' : 'flex-col gap-2'
        )}
      >
        {local.children}
      </div>
      <Show when={local.errorMessage}>
        <div class={cn('text-xs text-danger-500', !isInvalid() && 'invisible')}>
          {local.errorMessage}
        </div>
      </Show>
    </KobalteRadioGroup>
  )
}

// ============================================================================
// RadioGroup.Option Component
// ============================================================================

const Option = (props: RadioOptionProps) => {
  const [local, others] = splitProps(props, [
    'value',
    'label',
    'description',
    'disabled',
    'class',
  ])

  return (
    <KobalteRadioGroup.Item
      value={local.value}
      disabled={local.disabled}
      class={cn(
        'flex items-start gap-3 group',
        local.disabled && 'opacity-50 cursor-not-allowed',
        local.class
      )}
      {...others}
    >
      <KobalteRadioGroup.ItemInput class="sr-only" />
      <KobalteRadioGroup.ItemControl
        class={cn(
          'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-px',
          'border-neutral-300 bg-surface-raised',
          'group-hover:border-primary-400',
          'data-[checked]:border-primary-500 data-[checked]:bg-primary-50',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'transition-colors'
        )}
      >
        <KobalteRadioGroup.ItemIndicator>
          <DotIcon class="w-2.5 h-2.5 text-primary-500" />
        </KobalteRadioGroup.ItemIndicator>
      </KobalteRadioGroup.ItemControl>
      <div class="flex flex-col gap-0.5">
        <KobalteRadioGroup.ItemLabel class="text-sm font-medium text-text cursor-pointer">
          {local.label}
        </KobalteRadioGroup.ItemLabel>
        <Show when={local.description}>
          <KobalteRadioGroup.ItemDescription class="text-xs text-text-secondary">
            {local.description}
          </KobalteRadioGroup.ItemDescription>
        </Show>
      </div>
    </KobalteRadioGroup.Item>
  )
}

RadioGroup.Option = Option
