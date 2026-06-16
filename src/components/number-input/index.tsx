import { NumberField } from '@kobalte/core/number-field'
import { splitProps, Show, JSX, mergeProps } from 'solid-js'
import { cn } from '../../utils/cn'
import { MinusIcon, PlusIcon } from '../../icons'

export type NumberInputProps = {
  value: number
  onChange: (value: number) => void
  label?: string
  description?: string
  errorMessage?: string
  placeholder?: string
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  name?: string
  class?: string
  inputClass?: string
  showButtons?: boolean
  prefix?: JSX.Element
  suffix?: JSX.Element
}

export const NumberInput = (props: NumberInputProps) => {
  const merged = mergeProps({ showButtons: false } as const, props)
  const [local, others] = splitProps(merged, [
    'value',
    'onChange',
    'label',
    'description',
    'errorMessage',
    'placeholder',
    'min',
    'max',
    'step',
    'disabled',
    'readOnly',
    'required',
    'name',
    'class',
    'inputClass',
    'showButtons',
    'prefix',
    'suffix',
  ])

  const isInvalid = () => !!local.errorMessage

  return (
    <NumberField
      rawValue={local.value}
      onRawValueChange={local.onChange}
      validationState={isInvalid() ? 'invalid' : 'valid'}
      disabled={local.disabled}
      readOnly={local.readOnly}
      required={local.required}
      name={local.name}
      minValue={local.min}
      maxValue={local.max}
      step={local.step}
      class={cn('nsg-number-input', local.class)}
      {...others}
    >
      <Show when={local.label}>
        <NumberField.Label data-nsg-number-input="label">
          {local.label}
          <Show when={local.required}>
            <span>*</span>
          </Show>
        </NumberField.Label>
      </Show>

      <div data-nsg-number-input="wrapper">
        <Show when={local.showButtons}>
          <NumberField.DecrementTrigger data-nsg-number-input="button" aria-label="Decrease value">
            <MinusIcon size="sm" />
          </NumberField.DecrementTrigger>
        </Show>

        <Show when={local.prefix}>
          <span data-nsg-number-input="prefix">{local.prefix}</span>
        </Show>

        <NumberField.Input
          placeholder={local.placeholder}
          class={local.inputClass}
          data-nsg-number-input="input"
          data-center={local.showButtons ? '' : undefined}
        />
        <NumberField.HiddenInput />

        <Show when={local.suffix}>
          <span data-nsg-number-input="suffix">{local.suffix}</span>
        </Show>

        <Show when={local.showButtons}>
          <NumberField.IncrementTrigger data-nsg-number-input="button" aria-label="Increase value">
            <PlusIcon size="sm" />
          </NumberField.IncrementTrigger>
        </Show>
      </div>

      <Show when={local.description}>
        <NumberField.Description data-nsg-number-input="description">
          {local.description}
        </NumberField.Description>
      </Show>

      <Show when={local.errorMessage}>
        <NumberField.ErrorMessage data-nsg-number-input="error">
          {local.errorMessage}
        </NumberField.ErrorMessage>
      </Show>
    </NumberField>
  )
}
