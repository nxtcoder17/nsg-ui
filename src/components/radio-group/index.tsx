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
  unstyled?: boolean
  class?: string
  children?: JSX.Element
}

export type RadioOptionProps = {
  value: string
  label: string
  description?: string
  disabled?: boolean
  unstyled?: boolean
  class?: string
}

const RadioGroupRoot = (props: RadioGroupProps) => {
  const [local, others] = splitProps(props, [
    'value', 'defaultValue', 'onChange', 'orientation',
    'disabled', 'name', 'errorMessage', 'validationState',
    'unstyled', 'class', 'children',
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
      class={cn(!local.unstyled && 'nsg-radio-group', local.class)}
      {...others}
    >
      <div {...(!local.unstyled && { 'data-nsg-radio-group': 'items' })}>
        {local.children}
      </div>
      <Show when={local.errorMessage}>
        <span {...(!local.unstyled && { 'data-nsg-radio-group': 'error' })}>
          {local.errorMessage}
        </span>
      </Show>
    </KobalteRadioGroup>
  )
}

const Option = (props: RadioOptionProps) => {
  const [local, others] = splitProps(props, [
    'value', 'label', 'description', 'disabled', 'unstyled', 'class',
  ])

  return (
    <KobalteRadioGroup.Item
      value={local.value}
      disabled={local.disabled}
      class={cn(local.class)}
      {...(!local.unstyled && { 'data-nsg-radio-group': 'option' })}
      {...others}
    >
      <KobalteRadioGroup.ItemInput class="sr-only" />
      <KobalteRadioGroup.ItemControl
        class="shrink-0"
        {...(!local.unstyled && { 'data-nsg-radio-group': 'control' })}
      >
        <KobalteRadioGroup.ItemIndicator
          {...(!local.unstyled && { 'data-nsg-radio-group': 'indicator' })}
        >
          <DotIcon size="xs" />
        </KobalteRadioGroup.ItemIndicator>
      </KobalteRadioGroup.ItemControl>
      <div class="flex flex-col gap-0.5">
        <KobalteRadioGroup.ItemLabel
          {...(!local.unstyled && { 'data-nsg-radio-group': 'label' })}
        >
          {local.label}
        </KobalteRadioGroup.ItemLabel>
        <Show when={local.description}>
          <KobalteRadioGroup.ItemDescription
            {...(!local.unstyled && { 'data-nsg-radio-group': 'description' })}
          >
            {local.description}
          </KobalteRadioGroup.ItemDescription>
        </Show>
      </div>
    </KobalteRadioGroup.Item>
  )
}

export const RadioGroup = Object.assign(RadioGroupRoot, { Option })
