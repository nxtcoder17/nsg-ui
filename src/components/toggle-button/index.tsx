import { ToggleButton as KobalteToggleButton } from '@kobalte/core/toggle-button'
import { splitProps, JSX } from 'solid-js'
import { cn } from '../../utils/cn'

export type ToggleButtonVariant = 'default' | 'outline' | 'ghost'
export type ToggleButtonSize = 'sm' | 'md' | 'lg' | 'icon'

export type ToggleButtonProps = {
  pressed?: boolean
  defaultPressed?: boolean
  onChange?: (pressed: boolean) => void
  variant?: ToggleButtonVariant
  size?: ToggleButtonSize
  disabled?: boolean
  class?: string
  children: JSX.Element | ((state: { pressed: () => boolean }) => JSX.Element)
}

const baseStyles = cn(
  'inline-flex items-center justify-center font-medium transition-colors',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  'disabled:opacity-50 disabled:cursor-not-allowed'
)

const variantStyles: Record<ToggleButtonVariant, string> = {
  default: cn(
    'bg-neutral-100 text-text-secondary',
    'hover:bg-neutral-200',
    'data-[pressed]:bg-primary-100 data-[pressed]:text-primary-700'
  ),
  outline: cn(
    'border border-border bg-transparent text-text-secondary',
    'hover:bg-neutral-100',
    'data-[pressed]:border-primary-500 data-[pressed]:bg-primary-50 data-[pressed]:text-primary-700'
  ),
  ghost: cn(
    'bg-transparent text-text-secondary',
    'hover:bg-neutral-100',
    'data-[pressed]:bg-primary-100 data-[pressed]:text-primary-700'
  ),
}

const sizeStyles: Record<ToggleButtonSize, string> = {
  sm: 'h-8 px-3 text-xs rounded-md',
  md: 'h-10 px-4 text-sm rounded-md',
  lg: 'h-12 px-6 text-base rounded-lg',
  icon: 'h-10 w-10 rounded-md',
}

export const ToggleButton = (props: ToggleButtonProps) => {
  const [local, others] = splitProps(props, [
    'pressed',
    'defaultPressed',
    'onChange',
    'variant',
    'size',
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
        baseStyles,
        variantStyles[local.variant ?? 'default'],
        sizeStyles[local.size ?? 'md'],
        local.class
      )}
      {...others}
    >
      {local.children}
    </KobalteToggleButton>
  )
}
