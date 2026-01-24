import { Component } from 'solid-js'
import { Button } from 'nsg-ui'
import { Popover, PopoverExample } from 'nsg-ui/components/popover'
import { DemoCard } from '../components/DemoCard'
import { PopoverIcon, InfoIcon } from '../icons'

export const PopoverSection: Component = () => {
  return (
    <section id="popover" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <PopoverIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">Popover</h2>
        </div>
        <p class="text-text-secondary ml-11">Floating content panel anchored to a trigger element.</p>
      </div>

      <div class="grid gap-6">
        <DemoCard title="Library Example" description="Built-in example from the component">
          <PopoverExample />
        </DemoCard>

        <DemoCard title="Placements" description="Position the popover relative to the trigger">
          <div class="flex flex-wrap gap-3">
            <Popover trigger={<Button variant="outline" size="sm">Top</Button>} placement="top" arrow>
              <p class="text-sm text-text">Popover on top</p>
            </Popover>
            <Popover trigger={<Button variant="outline" size="sm">Bottom</Button>} placement="bottom" arrow>
              <p class="text-sm text-text">Popover on bottom</p>
            </Popover>
            <Popover trigger={<Button variant="outline" size="sm">Left</Button>} placement="left" arrow>
              <p class="text-sm text-text">Popover on left</p>
            </Popover>
            <Popover trigger={<Button variant="outline" size="sm">Right</Button>} placement="right" arrow>
              <p class="text-sm text-text">Popover on right</p>
            </Popover>
          </div>
        </DemoCard>

        <DemoCard title="Info Popover" description="Contextual help and information">
          <Popover
            trigger={
              <Button variant="ghost" size="icon" aria-label="Show helpful information">
                <InfoIcon class="w-5 h-5" />
              </Button>
            }
            triggerLabel="Show helpful information"
            title="Helpful Information"
            description="This is additional context that helps users understand a feature or action."
            arrow
          >
            <a href="#" class="text-sm text-primary hover:underline">Learn more</a>
          </Popover>
        </DemoCard>

        <DemoCard title="User Card Popover" description="Rich content like user profiles">
          <Popover
            trigger={
              <button class="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-surface-raised hover:bg-surface-sunken transition-colors">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-medium">
                  JD
                </div>
                <span class="text-sm text-text font-medium">John Doe</span>
              </button>
            }
            placement="bottom-start"
          >
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-medium text-lg">
                  JD
                </div>
                <div>
                  <p class="font-medium text-text">John Doe</p>
                  <p class="text-sm text-text-muted">john@example.com</p>
                </div>
              </div>
              <div class="flex gap-2">
                <Button size="sm" variant="outline">View Profile</Button>
                <Button size="sm">Message</Button>
              </div>
            </div>
          </Popover>
        </DemoCard>
      </div>
    </section>
  )
}
