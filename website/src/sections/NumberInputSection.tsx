import { Component, createSignal } from 'solid-js'
import { NumberInput } from 'nsg-ui'
import { DemoCard } from '../components/DemoCard'

export function NumberInputIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M8 12h8M12 9v6" stroke-width="2" />
    </svg>
  )
}

export const NumberInputSection: Component = () => {
  const [quantity, setQuantity] = createSignal(1)
  const [price, setPrice] = createSignal(0)
  const [age, setAge] = createSignal(0)
  const [rating, setRating] = createSignal(5)

  return (
    <section id="number-input" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <NumberInputIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">NumberInput</h2>
        </div>
        <p class="text-text-secondary ml-11">A numeric input with optional increment/decrement buttons.</p>
      </div>

      <div class="grid gap-6">
        <DemoCard title="Basic" description="Simple number input">
          <div class="max-w-xs space-y-4">
            <NumberInput
              value={quantity()}
              onChange={setQuantity}
              label="Quantity"
              placeholder="Enter amount"
            />
            <div class="text-sm text-text-secondary">
              Value: <span class="font-mono text-primary-500">{quantity()}</span>
            </div>
          </div>
        </DemoCard>

        <DemoCard title="With Buttons" description="Increment/decrement controls">
          <div class="max-w-xs space-y-4">
            <NumberInput
              value={quantity()}
              onChange={setQuantity}
              label="Quantity"
              showButtons
              min={1}
              max={99}
            />
            <NumberInput
              value={rating()}
              onChange={setRating}
              label="Rating"
              description="Rate from 1 to 10"
              showButtons
              min={1}
              max={10}
              step={1}
            />
          </div>
        </DemoCard>

        <DemoCard title="Min/Max & Step" description="Constrained values">
          <div class="max-w-xs space-y-4">
            <NumberInput
              value={age()}
              onChange={setAge}
              label="Age"
              placeholder="18-100"
              min={18}
              max={100}
              description="Must be 18 or older"
            />
            <NumberInput
              value={0}
              onChange={() => {}}
              label="Step by 5"
              step={5}
              showButtons
              description="Use buttons or arrow keys"
            />
            <NumberInput
              value={0}
              onChange={() => {}}
              label="Decimal (0.1 step)"
              step={0.1}
              showButtons
            />
          </div>
        </DemoCard>

        <DemoCard title="With Prefix & Suffix" description="Currency, units, etc.">
          <div class="max-w-xs space-y-4">
            <NumberInput
              value={price()}
              onChange={setPrice}
              label="Price"
              placeholder="0.00"
              prefix={<span class="text-sm">$</span>}
              step={0.01}
            />
            <NumberInput
              value={0}
              onChange={() => {}}
              label="Weight"
              placeholder="0"
              suffix={<span class="text-sm">kg</span>}
            />
            <NumberInput
              value={0}
              onChange={() => {}}
              label="Percentage"
              placeholder="0"
              suffix={<span class="text-sm">%</span>}
              min={0}
              max={100}
            />
          </div>
        </DemoCard>

        <DemoCard title="Validation" description="Error state with message">
          <div class="max-w-xs space-y-4">
            <NumberInput
              value={age()}
              onChange={setAge}
              label="Age"
              placeholder="Enter age"
              min={18}
              errorMessage={age() < 18 ? 'Must be at least 18 years old' : undefined}
              required
            />
          </div>
        </DemoCard>

        <DemoCard title="States" description="Disabled and readonly">
          <div class="max-w-xs space-y-4">
            <NumberInput
              value={42}
              onChange={() => {}}
              label="Disabled"
              disabled
              showButtons
            />
            <NumberInput
              value={100}
              onChange={() => {}}
              label="Read only"
              readOnly
            />
          </div>
        </DemoCard>
      </div>
    </section>
  )
}
