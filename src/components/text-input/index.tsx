import { TextField } from '@kobalte/core/text-field'
import { splitProps, Show, JSX } from 'solid-js'
import { cn } from '../../utils/cn'

export type TextInputProps = {
  value: string
  onChange: (value: string) => void
  label?: string
  description?: string
  errorMessage?: string
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'url' | 'tel'
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  name?: string
  class?: string
  inputClass?: string
  // Multiline (textarea)
  multiline?: boolean
  rows?: number
  autoResize?: boolean
  // Addons
  prefix?: JSX.Element
  suffix?: JSX.Element
}

export const TextInput = (props: TextInputProps) => {
  const [local, others] = splitProps(props, [
    'value',
    'onChange',
    'label',
    'description',
    'errorMessage',
    'placeholder',
    'type',
    'disabled',
    'readOnly',
    'required',
    'name',
    'class',
    'inputClass',
    'multiline',
    'rows',
    'autoResize',
    'prefix',
    'suffix',
  ])

  const isInvalid = () => !!local.errorMessage

  return (
    <TextField
      value={local.value}
      onChange={local.onChange}
      validationState={isInvalid() ? 'invalid' : 'valid'}
      disabled={local.disabled}
      readOnly={local.readOnly}
      required={local.required}
      name={local.name}
      class={cn('nsg-text-input', local.class)}
      {...others}
    >
      <Show when={local.label}>
        <TextField.Label data-nsg-text-input="label">
          {local.label}
          <Show when={local.required}>
            <span>*</span>
          </Show>
        </TextField.Label>
      </Show>

      <div data-nsg-text-input="wrapper">
        <Show when={local.prefix}>
          <span data-nsg-text-input="prefix">{local.prefix}</span>
        </Show>

        <Show
          when={local.multiline}
          fallback={
            <TextField.Input
              type={local.type ?? 'text'}
              placeholder={local.placeholder}
              class={local.inputClass}
              data-nsg-text-input="input"
            />
          }
        >
          <TextField.TextArea
            placeholder={local.placeholder}
            rows={local.rows}
            autoResize={local.autoResize}
            class={local.inputClass}
            data-nsg-text-input="input"
          />
        </Show>

        <Show when={local.suffix}>
          <span data-nsg-text-input="suffix">{local.suffix}</span>
        </Show>
      </div>

      <Show when={local.description}>
        <TextField.Description data-nsg-text-input="description">
          {local.description}
        </TextField.Description>
      </Show>

      <Show when={local.errorMessage}>
        <TextField.ErrorMessage data-nsg-text-input="error">
          {local.errorMessage}
        </TextField.ErrorMessage>
      </Show>
    </TextField>
  )
}
