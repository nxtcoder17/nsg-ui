import { ToggleButton as KobalteToggleButton } from '@kobalte/core/toggle-button'
import { splitProps, JSX, mergeProps } from 'solid-js'
import { cn } from '../../utils/cn'

export type ToggleButtonKind = 'primary' | 'secondary' | 'ghost'
export type ToggleButtonSize = 'sm' | 'md' | 'lg' | 'icon' | 'icon-sm'

export type ToggleButtonProps = {
  pressed?: boolean
  defaultPressed?: boolean
  onChange?: (pressed: boolean) => void
  kind?: ToggleButtonKind
  size?: ToggleButtonSize
  outline?: boolean
  disabled?: boolean
  class?: string
  children: JSX.Element | ((state: { pressed: () => boolean }) => JSX.Element)
}

export const ToggleButton = (props: ToggleButtonProps) => {
  const merged = mergeProps({ kind: 'primary', size: 'md' } as const, props)
  const [local, others] = splitProps(merged, [
    'pressed',
    'defaultPressed',
    'onChange',
    'kind',
    'size',
    'outline',
    'disabled',
    'class',
    'children',
  ])

  return (
    <KobalteToggleButton
      pressed={local.pressed}
      defaultPressed={local.defaultPressed}
      onChange={local.onChange}
      disabled={local.disabled}
      class={cn(
        'nsg-toggle-button',
        local.outline && 'nsg-toggle-button-outline',
        local.class
      )}
      data-kind={local.kind}
      data-size={local.size}
      {...others}
    >
      {local.children}
    </KobalteToggleButton>
  )
}
