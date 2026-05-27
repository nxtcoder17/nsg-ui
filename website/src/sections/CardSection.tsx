import type { Component } from 'solid-js'
import { Card, Button, Badge } from 'nsg-ui'
import { DemoCard } from '../components/DemoCard'
import { Section } from "../components/section"

export function CardIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 8h10" />
      <path d="M7 12h5" />
    </svg>
  )
}

export const CardSection: Component = () => {
  return (
    <Section id="card"
      header={{
        title: "Card",
        icon: CardIcon,
        description: "A flexible container component used to group related content and actions."
      }}
    >
      <DemoCard title="Card Kinds" description="The three distinct visual styles to structure hierarchy.">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card kind="raised" class="p-6">
            <Badge kind="primary" class="mb-4">Raised</Badge>
            <h4 class="text-base font-semibold text-text mb-2">Default Card</h4>
            <p class="text-sm text-text-muted mb-4">
              Raised above the background with a soft shadow. Ideal for key interactive cards or dashboard widgets.
            </p>
            <Button kind="primary" size="sm" class="w-full">Action</Button>
          </Card>

          <Card kind="flat" class="p-6">
            <Badge kind="neutral" class="mb-4">Flat</Badge>
            <h4 class="text-base font-semibold text-text mb-2">Flat Card</h4>
            <p class="text-sm text-text-muted mb-4">
              Flush with the background but bordered. Great for layout sections or non-interactive grouping containers.
            </p>
            <Button kind="secondary" size="sm" outline class="w-full">Action</Button>
          </Card>

          <Card kind="sunken" class="p-6">
            <Badge kind="warning" class="mb-4">Sunken</Badge>
            <h4 class="text-base font-semibold text-text mb-2">Sunken Card</h4>
            <p class="text-sm text-text-muted mb-4">
              Sunken background. Excellent for secondary content sections, headers, or well-contained tables and feeds.
            </p>
            <Button kind="ghost" size="sm" class="w-full">Action</Button>
          </Card>
        </div>
      </DemoCard>

      <DemoCard title="Custom Styling" description="Easily add custom hover effects and styles on top of nsg-card.">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            kind="raised" 
            class="p-6 cursor-pointer hover:border-primary-500 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            <span class="text-xs text-primary-500 font-semibold tracking-wider uppercase block mb-1">Feature</span>
            <h4 class="text-lg font-semibold text-text mb-2">Interactive Card</h4>
            <p class="text-sm text-text-muted">
              Hovering over this card changes the border color and raises it slightly with a shadow offset transition.
            </p>
          </Card>

          <Card 
            kind="flat" 
            class="p-6 border-dashed border-2 border-border-strong hover:bg-surface-raised transition-colors duration-300"
          >
            <span class="text-xs text-success-500 font-semibold tracking-wider uppercase block mb-1">Dashed</span>
            <h4 class="text-lg font-semibold text-text mb-2">Placeholder / Action</h4>
            <p class="text-sm text-text-muted">
              A dashed border style ideal for trigger actions, uploading areas, or adding new elements.
            </p>
          </Card>
        </div>
      </DemoCard>
    </Section>
  )
}
