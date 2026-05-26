import { Badge as KobalteBadge } from '@kobalte/core/badge'
import { splitProps, JSX } from 'solid-js'
import { cn } from '../../utils/cn'

export type BadgeKind = 'neutral' | 'info' | 'success' | 'warning' | 'danger'
export type BadgeSize = 'sm' | 'md' | 'lg'

export type BadgeProps = {
  kind?: BadgeKind
  size?: BadgeSize
  outline?: boolean
  class?: string
  children: JSX.Element
}

export const Badge = (props: BadgeProps) => {
  const [local, others] = splitProps(props, ['kind', 'size', 'outline', 'class', 'children'])

  return (
    <KobalteBadge
      class={cn(
        'nsg-badge',
        local.outline && 'nsg-badge-outline',
        local.class
      )}
      data-kind={local.kind ?? 'neutral'}
      data-size={local.size ?? 'md'}
      {...others}
    >
      {local.children}
    </KobalteBadge>
  )
}
