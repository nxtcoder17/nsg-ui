import { Component, createSignal } from 'solid-js'
import { RadioGroup } from 'nsg-ui'
import { DemoCard } from '../components/DemoCard'

export function RadioGroupIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="6" r="3" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <circle cx="12" cy="18" r="3" />
    </svg>
  )
}

export const RadioGroupSection: Component = () => {
  const [theme, setTheme] = createSignal('system')
  const [plan, setPlan] = createSignal('pro')
  const [size, setSize] = createSignal('md')

  return (
    <section id="radio-group" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <RadioGroupIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">RadioGroup</h2>
        </div>
        <p class="text-text-secondary ml-11">A set of mutually exclusive radio buttons.</p>
      </div>

      <div class="grid gap-6">
        <DemoCard title="Basic" description="Simple radio group with string values">
          <div class="flex items-start gap-8">
            <RadioGroup value={theme()} onChange={setTheme}>
              <RadioGroup.Option value="light" label="Light" />
              <RadioGroup.Option value="dark" label="Dark" />
              <RadioGroup.Option value="system" label="System" />
            </RadioGroup>
            <div class="text-sm text-text-secondary">
              Selected: <span class="font-mono text-primary-500">{theme()}</span>
            </div>
          </div>
        </DemoCard>

        <DemoCard title="With Descriptions" description="Radio options with additional help text">
          <div class="flex items-start gap-8">
            <RadioGroup value={plan()} onChange={setPlan}>
              <RadioGroup.Option
                value="free"
                label="Free"
                description="Basic features, limited usage"
              />
              <RadioGroup.Option
                value="pro"
                label="Pro"
                description="Advanced features, unlimited usage"
              />
              <RadioGroup.Option
                value="enterprise"
                label="Enterprise"
                description="Custom solutions, dedicated support"
              />
            </RadioGroup>
            <div class="text-sm text-text-secondary">
              Selected: <span class="font-mono text-primary-500">{plan()}</span>
            </div>
          </div>
        </DemoCard>

        <DemoCard title="Horizontal" description="Horizontal layout for compact spaces">
          <div class="space-y-4">
            <RadioGroup value={size()} onChange={setSize} orientation="horizontal">
              <RadioGroup.Option value="sm" label="Small" />
              <RadioGroup.Option value="md" label="Medium" />
              <RadioGroup.Option value="lg" label="Large" />
            </RadioGroup>
            <div class="text-sm text-text-secondary">
              Selected: <span class="font-mono text-primary-500">{size()}</span>
            </div>
          </div>
        </DemoCard>

        <DemoCard title="Disabled" description="Disabled group and individual options">
          <div class="flex gap-12">
            <div>
              <p class="text-xs text-text-muted mb-2">Disabled option</p>
              <RadioGroup value="a">
                <RadioGroup.Option value="a" label="Option A" />
                <RadioGroup.Option value="b" label="Option B" disabled />
                <RadioGroup.Option value="c" label="Option C" />
              </RadioGroup>
            </div>
            <div>
              <p class="text-xs text-text-muted mb-2">Disabled group</p>
              <RadioGroup value="x" disabled>
                <RadioGroup.Option value="x" label="Option X" />
                <RadioGroup.Option value="y" label="Option Y" />
              </RadioGroup>
            </div>
          </div>
        </DemoCard>
      </div>
    </section>
  )
}
