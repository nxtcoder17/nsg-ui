import { splitProps, JSX } from 'solid-js'
import { cn } from '../../utils/cn'

export type CardKind = 'raised' | 'flat' | 'sunken'

export type CardProps = {
  kind?: CardKind
  class?: string
  children: JSX.Element
} & JSX.HTMLAttributes<HTMLDivElement>

export const Card = (props: CardProps) => {
  const [local, others] = splitProps(props, ['kind', 'class', 'children'])

  return (
    <div
      class={cn('nsg-card', local.class)}
      data-kind={local.kind ?? 'raised'}
      {...others}
    >
      {local.children}
    </div>
  )
}
