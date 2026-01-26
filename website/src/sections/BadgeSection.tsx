import { Component } from 'solid-js'
import { Badge } from 'nsg-ui'
import { DemoCard } from '../components/DemoCard'

export function BadgeIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="7" width="18" height="10" rx="5" />
    </svg>
  )
}

export const BadgeSection: Component = () => {
  return (
    <section id="badge" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <BadgeIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">Badge</h2>
        </div>
        <p class="text-text-secondary ml-11">Small labels for status, counts, or categories.</p>
      </div>

      <div class="grid gap-6">
        <DemoCard title="Variants" description="Different visual styles for various contexts">
          <div class="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </DemoCard>

        <DemoCard title="Sizes" description="Small, medium, and large">
          <div class="flex flex-wrap items-center gap-3">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </div>
        </DemoCard>

        <DemoCard title="With Icons" description="Combine with icons for context">
          <div class="flex flex-wrap gap-3">
            <Badge variant="success">
              <span class="flex items-center gap-1">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Verified
              </span>
            </Badge>
            <Badge variant="danger">
              <span class="flex items-center gap-1">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Error
              </span>
            </Badge>
            <Badge variant="warning">
              <span class="flex items-center gap-1">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="5" />
                </svg>
                Pending
              </span>
            </Badge>
          </div>
        </DemoCard>

        <DemoCard title="Use Cases" description="Common badge patterns">
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <span class="text-sm text-text">Notifications</span>
              <Badge variant="danger" size="sm">3</Badge>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm text-text">Status</span>
              <Badge variant="success" size="sm">Active</Badge>
              <Badge variant="outline" size="sm">Inactive</Badge>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm text-text">Tags</span>
              <Badge size="sm">React</Badge>
              <Badge size="sm">TypeScript</Badge>
              <Badge size="sm">Tailwind</Badge>
            </div>
          </div>
        </DemoCard>
      </div>
    </section>
  )
}
