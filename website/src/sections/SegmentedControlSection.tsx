import { Component, createSignal } from 'solid-js'
import { SegmentedControl } from 'nsg-ui'
import { DemoCard } from '../components/DemoCard'

export function SegmentedControlIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="2" y="7" width="20" height="10" rx="2" />
      <line x1="9" y1="7" x2="9" y2="17" />
      <line x1="15" y1="7" x2="15" y2="17" />
    </svg>
  )
}

export const SegmentedControlSection: Component = () => {
  const [view, setView] = createSignal('list')
  const [size, setSize] = createSignal('md')
  const [theme, setTheme] = createSignal('light')

  return (
    <section id="segmented-control" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <SegmentedControlIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">Segmented Control</h2>
        </div>
        <p class="text-text-secondary ml-11">A set of mutually exclusive options displayed as segments.</p>
      </div>

      <div class="grid gap-6">
        <DemoCard title="Basic" description="Simple toggle between options">
          <div class="space-y-4">
            <SegmentedControl
              value={view()}
              onChange={setView}
              options={[
                { value: 'list', label: 'List' },
                { value: 'grid', label: 'Grid' },
                { value: 'table', label: 'Table' },
              ]}
            />
            <div class="text-sm text-text-secondary">
              Selected: <span class="font-mono text-primary-500">{view()}</span>
            </div>
          </div>
        </DemoCard>

        <DemoCard title="With Label" description="Add context with a label">
          <SegmentedControl
            label="Size"
            value={size()}
            onChange={setSize}
            options={[
              { value: 'sm', label: 'S' },
              { value: 'md', label: 'M' },
              { value: 'lg', label: 'L' },
              { value: 'xl', label: 'XL' },
            ]}
          />
        </DemoCard>

        <DemoCard title="With Description" description="Additional help text">
          <SegmentedControl
            label="Theme"
            description="Choose your preferred color scheme"
            value={theme()}
            onChange={setTheme}
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'system', label: 'System' },
            ]}
          />
        </DemoCard>

        <DemoCard title="Disabled Options" description="Individual segments can be disabled">
          <SegmentedControl
            defaultValue="monthly"
            options={[
              { value: 'weekly', label: 'Weekly' },
              { value: 'monthly', label: 'Monthly' },
              { value: 'yearly', label: 'Yearly', disabled: true },
            ]}
          />
        </DemoCard>

        <DemoCard title="Validation" description="Error state with message">
          <SegmentedControl
            label="Plan"
            validationState="invalid"
            errorMessage="Please select a valid plan"
            defaultValue="free"
            options={[
              { value: 'free', label: 'Free' },
              { value: 'pro', label: 'Pro' },
              { value: 'enterprise', label: 'Enterprise' },
            ]}
          />
        </DemoCard>

        <DemoCard title="Disabled" description="Entire control disabled">
          <SegmentedControl
            label="Disabled control"
            disabled
            defaultValue="a"
            options={[
              { value: 'a', label: 'Option A' },
              { value: 'b', label: 'Option B' },
              { value: 'c', label: 'Option C' },
            ]}
          />
        </DemoCard>
      </div>
    </section>
  )
}
