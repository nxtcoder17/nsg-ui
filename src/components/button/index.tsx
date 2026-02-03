import { Button as KobalteButton } from '@kobalte/core/button'
import { type JSX, splitProps, type ValidComponent, type ComponentProps } from 'solid-js'
import { cn } from '../../utils/cn'

export interface ButtonOwnProps {
  variant?: 'default' | 'outline' | 'ghost' | 'danger' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'icon-sm'
  as?: ValidComponent
  class?: string
  children?: JSX.Element
}

export type ButtonProps = ButtonOwnProps & Omit<ComponentProps<'button'>, keyof ButtonOwnProps>

const variantStyles = {
  default: 'bg-primary-500 text-primary-50 hover:bg-primary-600',
  outline: 'border border-border bg-transparent text-text hover:bg-neutral-100',
  ghost: 'bg-transparent text-text hover:bg-neutral-100',
  danger: 'bg-danger-500 text-danger-50 hover:bg-danger-600',
  link: 'bg-transparent text-primary-600 underline-offset-4 hover:underline hover:text-primary-700',
}

const sizeStyles = {
  sm: 'h-8 px-3 text-xs rounded-sm',
  md: 'h-10 px-4 text-sm rounded-md',
  lg: 'h-12 px-6 text-base rounded-lg',
  icon: 'h-10 w-10 rounded-md',
  'icon-sm': 'h-6 w-6 rounded-sm',
}

export const Button = (props: ButtonProps) => {
  const [local, others] = splitProps(props, [
    'variant',
    'size',
    'as',
    'class',
    'children',
  ])

  return (
    <KobalteButton
      as={local.as}
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
