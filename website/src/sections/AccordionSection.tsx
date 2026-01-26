import { Component, createSignal } from 'solid-js'
import { Accordion } from 'nsg-ui'
import { DemoCard } from '../components/DemoCard'

export function AccordionIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="5" rx="1" />
      <rect x="3" y="10" width="18" height="5" rx="1" />
      <rect x="3" y="17" width="18" height="5" rx="1" />
    </svg>
  )
}

export const AccordionSection: Component = () => {
  const [expanded, setExpanded] = createSignal<string[]>([])

  const faqItems = [
    {
      value: 'item-1',
      title: 'Is it accessible?',
      content: 'Yes! The accordion follows WAI-ARIA design patterns and supports full keyboard navigation.',
    },
    {
      value: 'item-2',
      title: 'Can I style it?',
      content: 'Absolutely. The component accepts className props and uses data attributes for state-based styling.',
    },
    {
      value: 'item-3',
      title: 'Is it animated?',
      content: 'Yes, it includes smooth expand/collapse animations using CSS keyframes.',
    },
  ]

  const advancedItems = [
    {
      value: 'installation',
      title: 'Installation',
      content: (
        <div class="space-y-2">
          <p>Install the package using your preferred package manager:</p>
          <pre class="bg-neutral-100 dark:bg-neutral-800 p-2 rounded text-xs font-mono">
            bun add nsg-ui
          </pre>
        </div>
      ),
    },
    {
      value: 'usage',
      title: 'Usage',
      content: (
        <div class="space-y-2">
          <p>Import and use the component:</p>
          <pre class="bg-neutral-100 dark:bg-neutral-800 p-2 rounded text-xs font-mono overflow-x-auto">
{`import { Accordion } from 'nsg-ui'

<Accordion items={items} />`}
          </pre>
        </div>
      ),
    },
    {
      value: 'disabled',
      title: 'Disabled Item',
      content: 'This item is disabled and cannot be expanded.',
      disabled: true,
    },
  ]

  return (
    <section id="accordion" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <AccordionIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">Accordion</h2>
        </div>
        <p class="text-text-secondary ml-11">Vertically stacked sections that expand to reveal content.</p>
      </div>

      <div class="grid gap-6">
        <DemoCard title="Basic" description="Single item open at a time (collapsible)">
          <div class="max-w-lg">
            <Accordion items={faqItems} />
          </div>
        </DemoCard>

        <DemoCard title="Multiple" description="Allow multiple items open simultaneously">
          <div class="max-w-lg">
            <Accordion items={faqItems} multiple />
          </div>
        </DemoCard>

        <DemoCard title="Controlled" description="Control expanded state externally">
          <div class="max-w-lg space-y-4">
            <Accordion
              items={faqItems}
              value={expanded()}
              onChange={setExpanded}
              multiple
            />
            <div class="text-sm text-text-secondary">
              Expanded: <span class="font-mono text-primary-500">
                {expanded().length ? expanded().join(', ') : 'none'}
              </span>
            </div>
            <div class="flex gap-2">
              <button
                onClick={() => setExpanded(['item-1', 'item-2', 'item-3'])}
                class="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 rounded"
              >
                Expand All
              </button>
              <button
                onClick={() => setExpanded([])}
                class="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 rounded"
              >
                Collapse All
              </button>
            </div>
          </div>
        </DemoCard>

        <DemoCard title="Rich Content & Disabled" description="Complex content with disabled state">
          <div class="max-w-lg">
            <Accordion items={advancedItems} />
          </div>
        </DemoCard>
      </div>
    </section>
  )
}
