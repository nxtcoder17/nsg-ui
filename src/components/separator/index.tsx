import { Separator as KobalteSeparator } from '@kobalte/core/separator'
import { splitProps } from 'solid-js'
import { cn } from '../../utils/cn'

export type SeparatorProps = {
  orientation?: 'horizontal' | 'vertical'
  class?: string
}

export const Separator = (props: SeparatorProps) => {
  const [local, others] = splitProps(props, ['orientation', 'class'])

  return (
    <KobalteSeparator
      orientation={local.orientation}
      class={cn('nsg-separator', local.class)}
      {...others}
    />
  )
}
