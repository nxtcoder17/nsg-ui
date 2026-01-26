import { Badge as KobalteBadge } from '@kobalte/core/badge'
import { splitProps, JSX } from 'solid-js'
import { cn } from '../../utils/cn'

// ============================================================================
// Types
// ============================================================================

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'outline'
export type BadgeSize = 'sm' | 'md' | 'lg'

export type BadgeProps = {
  variant?: BadgeVariant
  size?: BadgeSize
  class?: string
  children: JSX.Element
}

// ============================================================================
// Styles
// ============================================================================

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
  primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300',
  success: 'bg-success-100 text-success-700 dark:bg-success-900 dark:text-success-300',
  warning: 'bg-warning-100 text-warning-700 dark:bg-warning-900 dark:text-warning-300',
  danger: 'bg-danger-100 text-danger-700 dark:bg-danger-900 dark:text-danger-300',
  outline: 'bg-transparent border border-border text-text-secondary',
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-[10px]',
  md: 'px-2 py-0.5 text-xs',
  lg: 'px-2.5 py-1 text-sm',
}

// ============================================================================
// Badge Component
// ============================================================================

export const Badge = (props: BadgeProps) => {
  const [local, others] = splitProps(props, ['variant', 'size', 'class', 'children'])

  return (
    <KobalteBadge
      class={cn(
        'inline-flex items-center font-medium rounded-full',
        variantStyles[local.variant ?? 'default'],
        sizeStyles[local.size ?? 'md'],
        local.class
      )}
      {...others}
    >
      {local.children}
    </KobalteBadge>
  )
}
