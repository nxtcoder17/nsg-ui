import { Checkbox as KobalteCheckbox } from '@kobalte/core/checkbox'
import { splitProps, Show } from 'solid-js'
import { cn } from '../../utils/cn'
import { CheckIcon, MinusIcon } from '../../icons'

// ============================================================================
// Types
// ============================================================================

export type CheckboxProps = {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  indeterminate?: boolean
  label?: string
  description?: string
  errorMessage?: string
  validationState?: 'valid' | 'invalid'
  disabled?: boolean
  name?: string
  value?: string
  class?: string
}

// ============================================================================
// Checkbox Component
// ============================================================================

export const Checkbox = (props: CheckboxProps) => {
  const [local, others] = splitProps(props, [
    'checked',
    'defaultChecked',
    'onChange',
    'indeterminate',
    'label',
    'description',
    'errorMessage',
    'validationState',
    'disabled',
    'name',
    'value',
    'class',
  ])

  const isInvalid = () => local.validationState === 'invalid'

  return (
    <KobalteCheckbox
      checked={local.checked}
      defaultChecked={local.defaultChecked}
      onChange={local.onChange}
      indeterminate={local.indeterminate}
      validationState={local.validationState}
      disabled={local.disabled}
      name={local.name}
      value={local.value}
      class={cn(
        'group',
        local.disabled && 'opacity-50 cursor-not-allowed',
        local.class
      )}
      {...others}
    >
      {(state) => (
        <div class="flex items-start gap-3">
          <KobalteCheckbox.Input class="sr-only" />
          <KobalteCheckbox.Control
            class={cn(
              'w-5 h-5 rounded border-2 flex items-center justify-center shrink-0',
              'bg-surface-raised',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'transition-colors',
              isInvalid()
                ? 'border-danger-500 group-hover:border-danger-600'
                : 'border-neutral-300 group-hover:border-primary-400',
              'data-[checked]:border-primary-500 data-[checked]:bg-primary-500',
              'data-[indeterminate]:border-primary-500 data-[indeterminate]:bg-primary-500'
            )}
          >
            <KobalteCheckbox.Indicator class="text-white">
              <Show when={state.indeterminate()} fallback={<CheckIcon size="sm" strokeWidth={3} />}>
                <MinusIcon size="sm" />
              </Show>
            </KobalteCheckbox.Indicator>
          </KobalteCheckbox.Control>
          <Show when={local.label || local.description || local.errorMessage}>
            <div class="flex flex-col gap-0.5">
              <Show when={local.label}>
                <KobalteCheckbox.Label class="text-sm font-medium text-text cursor-pointer leading-5">
                  {local.label}
                </KobalteCheckbox.Label>
              </Show>
              <Show when={local.description}>
                <KobalteCheckbox.Description class="text-xs text-text-secondary">
                  {local.description}
                </KobalteCheckbox.Description>
              </Show>
              <Show when={local.errorMessage}>
                <div class={cn('text-xs text-danger-500', !isInvalid() && 'invisible')}>
                  {local.errorMessage}
                </div>
              </Show>
            </div>
          </Show>
        </div>
      )}
    </KobalteCheckbox>
  )
}
