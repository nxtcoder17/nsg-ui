import { Component, For } from 'solid-js'
import { Button } from 'nsg-ui'
import { DemoCard } from '../components/DemoCard'
import { ButtonIcon, PlusIcon } from '../icons'

export const ButtonSection: Component = () => {
  return (
    <section id="button" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <ButtonIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">Button</h2>
        </div>
        <p class="text-text-secondary ml-11">Interactive button component with multiple variants and sizes.</p>
      </div>

      <div class="grid gap-6">
        <DemoCard title="Variants" description="Different visual styles for different contexts">
          <div class="flex flex-wrap gap-3">
            <Button variant="default">Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="link">Link</Button>
          </div>
        </DemoCard>

        <DemoCard title="Sizes" description="Small, medium, large, and icon sizes">
          <div class="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <PlusIcon class="w-5 h-5" />
            </Button>
          </div>
        </DemoCard>

        <DemoCard title="States" description="Disabled state reduces opacity and prevents interaction">
          <div class="flex flex-wrap gap-3">
            <Button disabled>Disabled Default</Button>
            <Button variant="outline" disabled>Disabled Outline</Button>
            <Button variant="danger" disabled>Disabled Danger</Button>
          </div>
        </DemoCard>

        <DemoCard title="All Combinations" description="Complete matrix of variants and sizes">
          <div class="space-y-4">
            <For each={['default', 'outline', 'ghost', 'danger', 'link'] as const}>
              {(variant) => (
                <div class="flex items-center gap-4">
                  <span class="w-20 text-sm text-text-muted capitalize font-mono">{variant}</span>
                  <Button variant={variant} size="sm">Small</Button>
                  <Button variant={variant} size="md">Medium</Button>
                  <Button variant={variant} size="lg">Large</Button>
                </div>
              )}
            </For>
          </div>
        </DemoCard>
      </div>
    </section>
  )
}
