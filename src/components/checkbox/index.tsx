import { Checkbox as KobalteCheckbox } from '@kobalte/core/checkbox'
import { splitProps, Show, JSX } from 'solid-js'
import { cn } from '../../utils/cn'
import { CheckIcon, MinusIcon } from '../../icons'

export type CheckboxProps = {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  indeterminate?: boolean
  label: JSX.Element
  description?: JSX.Element
  errorMessage?: JSX.Element
  validationState?: 'valid' | 'invalid'
  disabled?: boolean
  name?: string
  value?: string
  class?: string
}

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
      class={cn('nsg-checkbox', local.class)}
      {...others}
    >
      {(state: { checked: () => boolean; indeterminate: () => boolean }) => (
        <div data-nsg-checkbox="wrapper">
          <KobalteCheckbox.Input class="sr-only" />
          <KobalteCheckbox.Control data-nsg-checkbox="control">
            <KobalteCheckbox.Indicator data-nsg-checkbox="indicator">
              <Show when={state.indeterminate()} fallback={<CheckIcon size="sm" strokeWidth={3} />}>
                <MinusIcon size="sm" />
              </Show>
            </KobalteCheckbox.Indicator>
          </KobalteCheckbox.Control>
          <Show when={local.label || local.description || local.errorMessage}>
            <div data-nsg-checkbox="content">
              <Show when={local.label}>
                <KobalteCheckbox.Label data-nsg-checkbox="label">
                  {local.label}
                </KobalteCheckbox.Label>
              </Show>
              <Show when={local.description}>
                <KobalteCheckbox.Description data-nsg-checkbox="description">
                  {local.description}
                </KobalteCheckbox.Description>
              </Show>
              <Show when={local.errorMessage}>
                <div data-nsg-checkbox="error">
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
