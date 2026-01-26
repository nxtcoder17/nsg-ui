import { Component, createSignal } from 'solid-js'
import { ComboBox } from 'nsg-ui'
import { DemoCard } from '../components/DemoCard'

export function ComboBoxIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7 8h10M7 12h6" />
      <path d="M15 15l3 3" stroke-width="2" />
    </svg>
  )
}

const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
]

const frameworks = [
  { value: 'solid', label: 'SolidJS' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular' },
  { value: 'qwik', label: 'Qwik', disabled: true },
]

export const ComboBoxSection: Component = () => {
  const [fruit, setFruit] = createSignal('')
  const [country, setCountry] = createSignal('')
  const [selectedFrameworks, setSelectedFrameworks] = createSignal<string[]>([])

  return (
    <section id="combobox" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <ComboBoxIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">ComboBox</h2>
        </div>
        <p class="text-text-secondary ml-11">A searchable dropdown that combines text input with a listbox.</p>
      </div>

      <div class="grid gap-6">
        <DemoCard title="String Options" description="Simple array of strings">
          <div class="flex items-start gap-8">
            <div class="w-64">
              <ComboBox
                options={fruits}
                value={fruit()}
                onChange={setFruit}
                placeholder="Select a fruit..."
              />
            </div>
            <div class="text-sm text-text-secondary">
              Selected: <span class="font-mono text-primary-500">{fruit() || 'none'}</span>
            </div>
          </div>
        </DemoCard>

        <DemoCard title="Object Options" description="Array of objects with value/label">
          <div class="flex items-start gap-8">
            <div class="w-64">
              <ComboBox
                options={countries}
                value={country()}
                onChange={setCountry}
                placeholder="Select a country..."
              />
            </div>
            <div class="text-sm text-text-secondary">
              Selected: <span class="font-mono text-primary-500">{country() || 'none'}</span>
            </div>
          </div>
        </DemoCard>

        <DemoCard title="Multiple Selection" description="Select multiple items with tags">
          <div class="flex items-start gap-8">
            <div class="w-80">
              <ComboBox
                multiple
                options={frameworks}
                value={selectedFrameworks()}
                onChange={setSelectedFrameworks}
                placeholder="Select frameworks..."
              />
            </div>
            <div class="text-sm text-text-secondary">
              Selected: <span class="font-mono text-primary-500">{selectedFrameworks().join(', ') || 'none'}</span>
            </div>
          </div>
        </DemoCard>

        <DemoCard title="Disabled" description="Disabled combobox state">
          <div class="w-64">
            <ComboBox
              options={fruits}
              value=""
              onChange={() => {}}
              placeholder="Cannot interact..."
              disabled
            />
          </div>
        </DemoCard>
      </div>
    </section>
  )
}
