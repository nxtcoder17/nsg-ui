import { Link as KobalteLink } from '@kobalte/core/link'
import { type JSX, splitProps, mergeProps, type ComponentProps } from 'solid-js'
import { cn } from '../../utils/cn'

export type LinkKind = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'

export interface LinkOwnProps {
  href?: string
  kind?: LinkKind
  disabled?: boolean
  external?: boolean
  underline?: boolean
  class?: string
  children?: JSX.Element
}

export type LinkProps = LinkOwnProps & Omit<ComponentProps<'a'>, keyof LinkOwnProps>

export const Link = (props: LinkProps) => {
  const merged = mergeProps({ kind: 'primary', underline: true } as const, props)
  const [local, others] = splitProps(merged, [
    'href',
    'kind',
    'disabled',
    'external',
    'underline',
    'class',
    'children',
  ])

  return (
    <KobalteLink
      href={local.disabled ? undefined : local.href}
      disabled={local.disabled}
      target={local.external ? '_blank' : undefined}
      rel={local.external ? 'noopener noreferrer' : undefined}
      class={cn(
        'nsg-link',
        local.underline && 'nsg-link-underline',
        local.class
      )}
      data-kind={local.kind}
      data-disabled={local.disabled ? '' : undefined}
      {...others}
    >
      {local.children}
    </KobalteLink>
  )
}
