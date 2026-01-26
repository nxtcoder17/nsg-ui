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
  containerClass?: string
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
    'containerClass',
    'inputClass',
    'multiline',
    'rows',
    'autoResize',
    'prefix',
    'suffix',
  ])

  const isInvalid = () => !!local.errorMessage

  const inputStyles = cn(
    'flex-1 bg-transparent outline-none text-sm text-text placeholder:text-text-muted',
    'disabled:cursor-not-allowed'
  )

  const wrapperStyles = cn(
    'flex items-center gap-2 px-3 py-2 rounded-md border bg-surface-raised',
    'transition-colors',
    'focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1',
    isInvalid()
      ? 'border-danger-500'
      : 'border-border hover:border-primary-400 focus-within:border-primary-500'
  )

  return (
    <TextField
      value={local.value}
      onChange={local.onChange}
      validationState={isInvalid() ? 'invalid' : 'valid'}
      disabled={local.disabled}
      readOnly={local.readOnly}
      required={local.required}
      name={local.name}
      class={cn('flex flex-col gap-1.5', local.disabled && 'opacity-50', local.containerClass)}
      {...others}
    >
      <Show when={local.label}>
        <TextField.Label class="text-sm font-medium text-text">
          {local.label}
          <Show when={local.required}>
            <span class="text-danger-500 ml-0.5">*</span>
          </Show>
        </TextField.Label>
      </Show>

      <div class={wrapperStyles}>
        <Show when={local.prefix}>
          <span class="text-text-muted shrink-0">{local.prefix}</span>
        </Show>

        <Show
          when={local.multiline}
          fallback={
            <TextField.Input
              type={local.type ?? 'text'}
              placeholder={local.placeholder}
              class={cn(inputStyles, local.inputClass)}
            />
          }
        >
          <TextField.TextArea
            placeholder={local.placeholder}
            rows={local.rows}
            autoResize={local.autoResize}
            class={cn(inputStyles, 'resize-none', local.inputClass)}
          />
        </Show>

        <Show when={local.suffix}>
          <span class="text-text-muted shrink-0">{local.suffix}</span>
        </Show>
      </div>

      <Show when={local.description}>
        <TextField.Description class="text-xs text-text-secondary">
          {local.description}
        </TextField.Description>
      </Show>

      <Show when={local.errorMessage}>
        <TextField.ErrorMessage class="text-xs text-danger-500">
          {local.errorMessage}
        </TextField.ErrorMessage>
      </Show>
    </TextField>
  )
}
