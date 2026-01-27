import { Component, createSignal, onCleanup } from 'solid-js'
import { Progress } from 'nsg-ui'
import { DemoCard } from '../components/DemoCard'

export function ProgressIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="2" y="10" width="20" height="4" rx="2" />
      <rect x="2" y="10" width="12" height="4" rx="2" fill="currentColor" />
    </svg>
  )
}

export const ProgressSection: Component = () => {
  const [value, setValue] = createSignal(45)
  const [animated, setAnimated] = createSignal(0)

  // Animate progress for demo
  const interval = setInterval(() => {
    setAnimated(prev => (prev >= 100 ? 0 : prev + 5))
  }, 500)
  onCleanup(() => clearInterval(interval))

  return (
    <section id="progress" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <ProgressIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">Progress</h2>
        </div>
        <p class="text-text-secondary ml-11">Visual indicator for task completion or loading state.</p>
      </div>

      <div class="grid gap-6">
        <DemoCard title="Basic" description="Simple progress bar">
          <div class="max-w-md space-y-4">
            <Progress value={25} />
            <Progress value={50} />
            <Progress value={75} />
            <Progress value={100} />
          </div>
        </DemoCard>

        <DemoCard title="With Label & Value" description="Shows context and percentage">
          <div class="max-w-md space-y-6">
            <Progress value={value()} label="Uploading..." showValue />
            <Progress value={animated()} label="Processing" showValue />
            <div class="flex gap-2">
              <button
                onClick={() => setValue(Math.max(0, value() - 10))}
                class="px-3 py-1 text-sm bg-neutral-100 rounded"
              >
                -10
              </button>
              <button
                onClick={() => setValue(Math.min(100, value() + 10))}
                class="px-3 py-1 text-sm bg-neutral-100 rounded"
              >
                +10
              </button>
            </div>
          </div>
        </DemoCard>

        <DemoCard title="Variants" description="Different colors for different contexts">
          <div class="max-w-md space-y-4">
            <Progress value={60} label="Default" showValue />
            <Progress value={60} label="Success" showValue variant="success" />
            <Progress value={60} label="Warning" showValue variant="warning" />
            <Progress value={60} label="Danger" showValue variant="danger" />
          </div>
        </DemoCard>

        <DemoCard title="Sizes" description="Different track heights">
          <div class="max-w-md space-y-4">
            <Progress value={60} size="sm" />
            <Progress value={60} size="md" />
            <Progress value={60} size="lg" />
          </div>
        </DemoCard>

        <DemoCard title="Indeterminate" description="Unknown duration loading state">
          <div class="max-w-md space-y-4">
            <Progress indeterminate label="Loading..." />
            <Progress indeterminate variant="success" />
          </div>
        </DemoCard>
      </div>
    </section>
  )
}
