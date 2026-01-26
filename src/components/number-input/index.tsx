import { NumberField } from '@kobalte/core/number-field'
import { splitProps, Show, JSX } from 'solid-js'
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
  containerClass?: string
  inputClass?: string
  // Optional +/- buttons
  showButtons?: boolean
  // Addons
  prefix?: JSX.Element
  suffix?: JSX.Element
}

export const NumberInput = (props: NumberInputProps) => {
  const [local, others] = splitProps(props, [
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
    'containerClass',
    'inputClass',
    'showButtons',
    'prefix',
    'suffix',
  ])

  const isInvalid = () => !!local.errorMessage

  const inputStyles = cn(
    'flex-1 bg-transparent outline-none text-sm text-text placeholder:text-text-muted',
    'disabled:cursor-not-allowed',
    '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
  )

  const wrapperStyles = () =>
    cn(
      'flex items-center gap-2 px-3 py-2 rounded-md border bg-surface-raised',
      'transition-colors',
      'focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1',
      isInvalid()
        ? 'border-danger-500'
        : 'border-border hover:border-primary-400 focus-within:border-primary-500'
    )

  const buttonStyles = cn(
    'shrink-0 w-6 h-6 flex items-center justify-center rounded',
    'text-text-secondary hover:text-text hover:bg-neutral-100 dark:hover:bg-neutral-800',
    'transition-colors',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent'
  )

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
      class={cn('flex flex-col gap-1.5', local.disabled && 'opacity-50', local.containerClass)}
      {...others}
    >
      <Show when={local.label}>
        <NumberField.Label class="text-sm font-medium text-text">
          {local.label}
          <Show when={local.required}>
            <span class="text-danger-500 ml-0.5">*</span>
          </Show>
        </NumberField.Label>
      </Show>

      <div class={wrapperStyles()}>
        <Show when={local.showButtons}>
          <NumberField.DecrementTrigger class={buttonStyles}>
            <MinusIcon size="sm" />
          </NumberField.DecrementTrigger>
        </Show>

        <Show when={local.prefix}>
          <span class="text-text-muted shrink-0">{local.prefix}</span>
        </Show>

        <NumberField.Input
          placeholder={local.placeholder}
          class={cn(inputStyles, local.showButtons && 'text-center', local.inputClass)}
        />
        <NumberField.HiddenInput />

        <Show when={local.suffix}>
          <span class="text-text-muted shrink-0">{local.suffix}</span>
        </Show>

        <Show when={local.showButtons}>
          <NumberField.IncrementTrigger class={buttonStyles}>
            <PlusIcon size="sm" />
          </NumberField.IncrementTrigger>
        </Show>
      </div>

      <Show when={local.description}>
        <NumberField.Description class="text-xs text-text-secondary">
          {local.description}
        </NumberField.Description>
      </Show>

      <Show when={local.errorMessage}>
        <NumberField.ErrorMessage class="text-xs text-danger-500">
          {local.errorMessage}
        </NumberField.ErrorMessage>
      </Show>
    </NumberField>
  )
}
