import { Button as KobalteButton, type ButtonRootProps } from '@kobalte/core/button'
import { type PolymorphicProps } from '@kobalte/core/polymorphic'
import { type JSX, splitProps, type ValidComponent } from 'solid-js'
import { cn } from '../../utils/cn'

export interface ButtonOwnProps {
  variant?: 'default' | 'outline' | 'ghost' | 'danger' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  class?: string
  children?: JSX.Element
}

export type ButtonProps<T extends ValidComponent = 'button'> = PolymorphicProps<T, ButtonOwnProps & ButtonRootProps<T>>

const variantStyles = {
  default: 'bg-primary text-white hover:bg-primary/90',
  outline: 'border border-border bg-transparent text-text hover:bg-surface-sunken',
  ghost: 'bg-transparent text-text hover:bg-surface-sunken',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  link: 'bg-transparent text-primary underline-offset-4 hover:underline',
}

const sizeStyles = {
  sm: 'h-8 px-3 text-xs rounded-sm',
  md: 'h-10 px-4 text-sm rounded-md',
  lg: 'h-12 px-6 text-base rounded-lg',
  icon: 'h-10 w-10 rounded-md',
}

export const Button = function <T extends ValidComponent = 'button'>(props: ButtonProps<T>) {
  const [local, others] = splitProps(props as ButtonOwnProps & ButtonRootProps<'button'>, [
    'variant',
    'size',
    'class',
    'children',
  ])

  return (
    <KobalteButton
      as={(props as { as?: T }).as}
      class={cn(
        'inline-flex items-center justify-center font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variantStyles[local.variant ?? 'default'],
        sizeStyles[local.size ?? 'md'],
        local.class
      )}
      {...others}
    >
      {local.children}
    </KobalteButton>
  )
}
