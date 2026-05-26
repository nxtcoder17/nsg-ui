import { type Component, For } from 'solid-js'
import { Button } from 'nsg-ui'
import { DemoCard } from '../components/DemoCard'
import { DemoWithCode } from '../components/CodeBlock'
import { ButtonIcon, PlusIcon } from '../icons'
import { Section } from '../components/section'

const kindsCode = `<Button kind="default">Default</Button>
// <Button kind="outline">Outline</Button>
<Button kind="ghost">Ghost</Button>
<Button kind="danger">Danger</Button>
<Button kind="link">Link</Button>`

const sizesCode = `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <PlusIcon class="w-5 h-5" />
</Button>`

export const ButtonSection: Component = () => {
  return (
    <Section
      id="button"
      header={{
        title: "Button",
        icon: ButtonIcon,
        description: "Interactive button component with multiple variants and sizes."
      }}
    >
      <DemoWithCode title="Kinds" description="Different visual styles for different contexts" code={kindsCode}>
        <div class="flex flex-wrap gap-3">
          <Button class="">Default</Button>
          <Button kind="outline">Outline</Button>
          <Button kind="ghost">Ghost</Button>
          <Button kind="danger">Danger</Button>
          <Button kind="link">Link</Button>
        </div>
      </DemoWithCode>

      <DemoWithCode title="Sizes" description="Small, medium, large, and icon sizes" code={sizesCode}>
        <div class="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Add">
            <PlusIcon class="w-5 h-5" />
          </Button>
        </div>
      </DemoWithCode>

      <DemoCard title="States" description="Disabled state reduces opacity and prevents interaction">
        <div class="flex flex-wrap gap-3">
          <Button disabled>Disabled Default</Button>
          <Button kind="outline" disabled>Disabled Outline</Button>
          <Button kind="danger" disabled>Disabled Danger</Button>
        </div>
      </DemoCard>

      <DemoCard title="All Combinations" description="Complete matrix of variants and sizes">
        <div class="space-y-4">
          <For each={['default', 'outline', 'ghost', 'danger', 'link'] as const}>
            {(kind) => (
              <div class="flex items-center gap-4">
                <span class={`w-20 text-sm capitalize font-mono ${kind === 'danger' ? 'text-danger-600' : 'text-primary-600'}`}>{kind}</span>
                <Button kind={kind} size="sm">Small</Button>
                <Button kind={kind} size="md">Medium</Button>
                <Button kind={kind} size="lg">Large</Button>
              </div>
            )}
          </For>
        </div>
      </DemoCard>
    </Section>
  )
}
