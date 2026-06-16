import { RadioGroup as KobalteRadioGroup } from '@kobalte/core/radio-group'
import { type JSX, splitProps, Show } from 'solid-js'
import { cn } from '../../utils/cn'
import { DotIcon } from '../../icons'

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

const RadioGroupRoot = (props: RadioGroupProps) => {
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

  return (
    <KobalteRadioGroup
      value={local.value}
      defaultValue={local.defaultValue}
      onChange={local.onChange}
      orientation={local.orientation ?? 'vertical'}
      validationState={local.validationState}
      disabled={local.disabled}
      name={local.name}
      class={cn('nsg-radio-group', local.class)}
      {...others}
    >
      <div data-nsg-radio-group="items">
        {local.children}
      </div>
      <Show when={local.errorMessage}>
        <span data-nsg-radio-group="error">
          {local.errorMessage}
        </span>
      </Show>
    </KobalteRadioGroup>
  )
}

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
      class={local.class}
      data-nsg-radio-group="option"
      {...others}
    >
      <KobalteRadioGroup.ItemInput class="sr-only" />
      <KobalteRadioGroup.ItemControl data-nsg-radio-group="control">
        <KobalteRadioGroup.ItemIndicator data-nsg-radio-group="indicator">
          <DotIcon size="xs" />
        </KobalteRadioGroup.ItemIndicator>
      </KobalteRadioGroup.ItemControl>
      <div data-nsg-radio-group="option-content">
        <KobalteRadioGroup.ItemLabel data-nsg-radio-group="label">
          {local.label}
        </KobalteRadioGroup.ItemLabel>
        <Show when={local.description}>
          <KobalteRadioGroup.ItemDescription data-nsg-radio-group="description">
            {local.description}
          </KobalteRadioGroup.ItemDescription>
        </Show>
      </div>
    </KobalteRadioGroup.Item>
  )
}

export const RadioGroup = Object.assign(RadioGroupRoot, { Option })
