import { Component, For } from 'solid-js'
import { CheckIcon, DotIcon, ChevronRightIcon } from 'nsg-ui/icons'
import { Button } from 'nsg-ui'
import { DemoCard } from '../components/DemoCard'
import { DemoWithCode } from '../components/CodeBlock'

const icons = [
  { name: 'CheckIcon', component: CheckIcon, usage: 'Checkbox selection indicator' },
  { name: 'DotIcon', component: DotIcon, usage: 'Radio button selection indicator' },
  { name: 'ChevronRightIcon', component: ChevronRightIcon, usage: 'Submenu indicator' },
] as const

// Icon for the section header
function IconsIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  )
}

export { IconsIcon }

export const IconsSection: Component = () => {
  return (
    <section id="icons" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <IconsIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">Icons</h2>
        </div>
        <p class="text-text-secondary ml-11">Internal icons used by library components. Tree-shakeable named exports.</p>
      </div>

      <div class="grid gap-6">
        <DemoCard title="Library Icons" description="Icons used internally by dropdown-menu and other components">
          <div class="grid grid-cols-3 gap-6">
            <For each={icons}>
              {(icon) => (
                <div class="flex flex-col items-center gap-3 p-4 rounded-lg bg-surface-sunken">
                  <div class="w-12 h-12 rounded-lg bg-surface flex items-center justify-center border border-border">
                    <icon.component class="w-6 h-6 text-text" />
                  </div>
                  <div class="text-center">
                    <p class="font-mono text-sm text-text">{icon.name}</p>
                    <p class="text-xs text-text-muted mt-1">{icon.usage}</p>
                  </div>
                </div>
              )}
            </For>
          </div>
        </DemoCard>

        <DemoCard title="Sizes" description="Icons accept a class prop for sizing. Default is w-4 h-4.">
          <div class="flex items-end gap-8">
            <For each={['w-3.5 h-3.5', 'w-4 h-4', 'w-5 h-5', 'w-6 h-6']}>
              {(size) => (
                <div class="flex flex-col items-center gap-2">
                  <CheckIcon class={size} />
                  <span class="font-mono text-xs text-text-muted">{size}</span>
                </div>
              )}
            </For>
          </div>
        </DemoCard>

        <DemoWithCode
          title="Button Pairing"
          description="Recommended icon sizes for each button size"
          code={`// Small button (h-8) → w-3.5 h-3.5 or w-4 h-4
<Button size="sm">
  <CheckIcon class="w-3.5 h-3.5 mr-1.5" /> Save
</Button>

// Medium button (h-10) → w-4 h-4 or w-5 h-5
<Button size="md">
  <CheckIcon class="w-4 h-4 mr-2" /> Save
</Button>

// Large button (h-12) → w-5 h-5 or w-6 h-6
<Button size="lg">
  <CheckIcon class="w-5 h-5 mr-2" /> Save
</Button>

// Icon-only button (h-10 w-10) → w-5 h-5
<Button size="icon">
  <CheckIcon class="w-5 h-5" />
</Button>`}
        >
          <div class="flex flex-wrap items-end gap-4">
            <div class="flex flex-col items-center gap-2">
              <Button size="sm">
                <CheckIcon class="w-3.5 h-3.5 mr-1.5" /> Save
              </Button>
              <span class="font-mono text-xs text-text-muted">sm + w-3.5</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Button size="md">
                <CheckIcon class="w-4 h-4 mr-2" /> Save
              </Button>
              <span class="font-mono text-xs text-text-muted">md + w-4</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Button size="lg">
                <CheckIcon class="w-5 h-5 mr-2" /> Save
              </Button>
              <span class="font-mono text-xs text-text-muted">lg + w-5</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Button size="icon">
                <CheckIcon class="w-5 h-5" />
              </Button>
              <span class="font-mono text-xs text-text-muted">icon + w-5</span>
            </div>
          </div>
        </DemoWithCode>

        <DemoWithCode
          title="Styling"
          description="Icons inherit color from text classes via currentColor"
          code={`import { CheckIcon, DotIcon, ChevronRightIcon } from 'nsg-ui/icons'

// Green success check
<div class="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center">
  <CheckIcon class="w-5 h-5 text-success-600" />
</div>

// Icons use stroke="currentColor", so text-* classes work
<CheckIcon class="w-4 h-4 text-success-600" />
<DotIcon class="w-4 h-4 text-danger-600" />
<ChevronRightIcon class="w-4 h-4 text-primary-600" />`}
        >
          <div class="flex items-center gap-6">
            <div class="flex flex-col items-center gap-2">
              <div class="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center">
                <CheckIcon class="w-5 h-5 text-success-600" />
              </div>
              <span class="font-mono text-xs text-text-muted">success</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <div class="w-10 h-10 rounded-full bg-danger-100 flex items-center justify-center">
                <DotIcon class="w-5 h-5 text-danger-600" />
              </div>
              <span class="font-mono text-xs text-text-muted">danger</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <div class="w-10 h-10 rounded-full bg-warning-100 flex items-center justify-center">
                <ChevronRightIcon class="w-5 h-5 text-warning-600" />
              </div>
              <span class="font-mono text-xs text-text-muted">warning</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <CheckIcon class="w-5 h-5 text-primary-600" />
              </div>
              <span class="font-mono text-xs text-text-muted">primary</span>
            </div>
          </div>
        </DemoWithCode>
      </div>
    </section>
  )
}
