import { splitProps, JSX } from 'solid-js'
import { cn } from '../../utils/cn'

export type CardProps = {
  class?: string
  children: JSX.Element
} & JSX.HTMLAttributes<HTMLDivElement>

export const Card = (props: CardProps) => {
  const [local, others] = splitProps(props, ['class', 'children'])

  return (
    <div
      class={cn(
        'bg-surface-raised text-text rounded-xl border border-border shadow-[var(--shadow-card)]',
        local.class
      )}
      {...others}
    >
      {local.children}
    </div>
  )
}
