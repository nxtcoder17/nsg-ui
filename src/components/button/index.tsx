import { Button as KobalteButton } from '@kobalte/core/button'
import { type JSX, splitProps, mergeProps, type ValidComponent, type ComponentProps } from 'solid-js'
import { cn } from '../../utils/cn'

export interface ButtonOwnProps {
  variant?: 'default' | 'outline' | 'ghost' | 'danger' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'icon-sm'
  as?: ValidComponent
  class?: string
  children?: JSX.Element
}

export type ButtonProps = ButtonOwnProps & Omit<ComponentProps<'button'>, keyof ButtonOwnProps>

export const Button = (props: ButtonProps) => {
  const merged = mergeProps({ variant: 'default', size: 'md' } as const, props)
  const [local, others] = splitProps(merged, [
    'variant',
    'size',
    'as',
    'class',
    'children',
  ])

  return (
    <KobalteButton
      as={local.as}
      class={cn('nsg-button', local.class)}
      data-variant={local.variant}
      data-size={local.size}
      {...others}
    >
      {local.children}
    </KobalteButton>
  )
}
