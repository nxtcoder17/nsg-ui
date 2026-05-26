import { Button as KobalteButton } from '@kobalte/core/button'
import { type JSX, splitProps, mergeProps, type ValidComponent, type ComponentProps } from 'solid-js'
import { cn } from '../../utils/cn'

export interface ButtonOwnProps {
  kind?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'icon-sm'
  outline?: boolean
  as?: ValidComponent
  class?: string
  children?: JSX.Element
}

export type ButtonProps = ButtonOwnProps & Omit<ComponentProps<'button'>, keyof ButtonOwnProps>

export const Button = (props: ButtonProps) => {
  const merged = mergeProps({ kind: 'primary', size: 'md' } as const, props)
  const [local, others] = splitProps(merged, [
    'kind',
    'size',
    'outline',
    'as',
    'class',
    'children',
  ])

  return (
    <KobalteButton
      as={local.as}
      class={cn(
        'nsg-button',
        local.outline && 'nsg-button-outline',
        local.class
      )}
      data-kind={local.kind}
      data-size={local.size}
      {...others}
    >
      {local.children}
    </KobalteButton>
  )
}
