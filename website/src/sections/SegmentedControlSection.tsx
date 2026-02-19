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
            <SegmentedControl value={view()} onChange={setView}>
              <SegmentedControl.Item value="list">List</SegmentedControl.Item>
              <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
              <SegmentedControl.Item value="table">Table</SegmentedControl.Item>
            </SegmentedControl>
            <div class="text-sm text-text-secondary">
              Selected: <span class="font-mono text-primary-500">{view()}</span>
            </div>
          </div>
        </DemoCard>

        <DemoCard title="With Label" description="Add context with a label">
          <SegmentedControl label="Size" value={size()} onChange={setSize}>
            <SegmentedControl.Item value="sm">S</SegmentedControl.Item>
            <SegmentedControl.Item value="md">M</SegmentedControl.Item>
            <SegmentedControl.Item value="lg">L</SegmentedControl.Item>
            <SegmentedControl.Item value="xl">XL</SegmentedControl.Item>
          </SegmentedControl>
        </DemoCard>

        <DemoCard title="With Description" description="Additional help text">
          <SegmentedControl
            label="Theme"
            description="Choose your preferred color scheme"
            value={theme()}
            onChange={setTheme}
          >
            <SegmentedControl.Item value="light">Light</SegmentedControl.Item>
            <SegmentedControl.Item value="dark">Dark</SegmentedControl.Item>
            <SegmentedControl.Item value="system">System</SegmentedControl.Item>
          </SegmentedControl>
        </DemoCard>

        <DemoCard title="Disabled Options" description="Individual segments can be disabled">
          <SegmentedControl defaultValue="monthly">
            <SegmentedControl.Item value="weekly">Weekly</SegmentedControl.Item>
            <SegmentedControl.Item value="monthly">Monthly</SegmentedControl.Item>
            <SegmentedControl.Item value="yearly" disabled>Yearly</SegmentedControl.Item>
          </SegmentedControl>
        </DemoCard>

        <DemoCard title="Validation" description="Error state with message">
          <SegmentedControl
            label="Plan"
            validationState="invalid"
            errorMessage="Please select a valid plan"
            defaultValue="free"
          >
            <SegmentedControl.Item value="free">Free</SegmentedControl.Item>
            <SegmentedControl.Item value="pro">Pro</SegmentedControl.Item>
            <SegmentedControl.Item value="enterprise">Enterprise</SegmentedControl.Item>
          </SegmentedControl>
        </DemoCard>

        <DemoCard title="Disabled" description="Entire control disabled">
          <SegmentedControl label="Disabled control" disabled defaultValue="a">
            <SegmentedControl.Item value="a">Option A</SegmentedControl.Item>
            <SegmentedControl.Item value="b">Option B</SegmentedControl.Item>
            <SegmentedControl.Item value="c">Option C</SegmentedControl.Item>
          </SegmentedControl>
        </DemoCard>
      </div>
    </section>
  )
}
