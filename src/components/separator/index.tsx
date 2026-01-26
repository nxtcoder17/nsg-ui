import { Separator as KobalteSeparator } from '@kobalte/core/separator'
import { splitProps } from 'solid-js'
import { cn } from '../../utils/cn'

// ============================================================================
// Types
// ============================================================================

export type SeparatorProps = {
  orientation?: 'horizontal' | 'vertical'
  class?: string
}

// ============================================================================
// Separator Component
// ============================================================================

export const Separator = (props: SeparatorProps) => {
  const [local, others] = splitProps(props, ['orientation', 'class'])

  const isVertical = () => local.orientation === 'vertical'

  return (
    <KobalteSeparator
      orientation={local.orientation}
      class={cn(
        'bg-border shrink-0',
        isVertical() ? 'w-px h-full' : 'h-px w-full',
        local.class
      )}
      {...others}
    />
  )
}
