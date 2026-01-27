import { Link as KobalteLink } from '@kobalte/core/link'
import { splitProps, JSX } from 'solid-js'
import { cn } from '../../utils/cn'

// ============================================================================
// Types
// ============================================================================

export type LinkVariant = 'default' | 'muted' | 'danger'

export type LinkProps = {
  href?: string
  variant?: LinkVariant
  disabled?: boolean
  external?: boolean
  class?: string
  children: JSX.Element
}

// ============================================================================
// Styles
// ============================================================================

const variantStyles: Record<LinkVariant, string> = {
  default: 'text-primary-500 hover:text-primary-600',
  muted: 'text-text-secondary hover:text-text',
  danger: 'text-danger-500 hover:text-danger-600',
}

// ============================================================================
// Link Component
// ============================================================================

export const Link = (props: LinkProps) => {
  const [local, others] = splitProps(props, [
    'href',
    'variant',
    'disabled',
    'external',
    'class',
    'children',
  ])

  return (
    <KobalteLink
      href={local.href}
      disabled={local.disabled}
      target={local.external ? '_blank' : undefined}
      rel={local.external ? 'noopener noreferrer' : undefined}
      class={cn(
        'underline underline-offset-2 transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm',
        variantStyles[local.variant ?? 'default'],
        local.disabled && 'opacity-50 cursor-not-allowed no-underline',
        local.class
      )}
      {...others}
    >
      {local.children}
    </KobalteLink>
  )
}
