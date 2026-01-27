import { JSX } from 'solid-js'
import { Card } from 'nsg-ui'

interface DemoCardProps {
  title: string
  description?: string
  children: JSX.Element
}

export function DemoCard(props: DemoCardProps): JSX.Element {
  return (
    <Card class="group hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
      <div class="px-6 py-4 border-b border-border-subtle">
        <h3 class="font-semibold text-text text-[15px]">{props.title}</h3>
        {props.description && (
          <p class="text-text-muted text-sm mt-1">{props.description}</p>
        )}
      </div>
      <div class="p-6 demo-pattern">
        {props.children}
      </div>
    </Card>
  )
}
