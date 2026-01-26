import { Component, createSignal } from 'solid-js'
import { Checkbox } from 'nsg-ui'
import { DemoCard } from '../components/DemoCard'

export function CheckboxIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7 12l3 3 7-7" stroke-width="2" />
    </svg>
  )
}

export const CheckboxSection: Component = () => {
  const [agreed, setAgreed] = createSignal(false)
  const [notify, setNotify] = createSignal(true)
  const [marketing, setMarketing] = createSignal(false)

  // For "select all" demo
  const [items, setItems] = createSignal([false, false, false])

  // For validation demo
  const [termsAccepted, setTermsAccepted] = createSignal(false)
  const [subscribed, setSubscribed] = createSignal(false)

  const allChecked = () => items().every(Boolean)
  const someChecked = () => items().some(Boolean) && !allChecked()

  const toggleAll = (checked: boolean) => {
    setItems([checked, checked, checked])
  }

  const toggleItem = (index: number, checked: boolean) => {
    setItems(prev => {
      const next = [...prev]
      next[index] = checked
      return next
    })
  }

  return (
    <section id="checkbox" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <CheckboxIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">Checkbox</h2>
        </div>
        <p class="text-text-secondary ml-11">A control that allows the user to toggle between checked and unchecked.</p>
      </div>

      <div class="grid gap-6">
        <DemoCard title="Basic" description="Simple checkbox with label">
          <div class="space-y-3">
            <Checkbox
              checked={agreed()}
              onChange={setAgreed}
              label="I agree to the terms and conditions"
            />
            <div class="text-sm text-text-secondary">
              Checked: <span class="font-mono text-primary-500">{agreed() ? 'true' : 'false'}</span>
            </div>
          </div>
        </DemoCard>

        <DemoCard title="With Description" description="Checkbox with additional help text">
          <div class="space-y-4">
            <Checkbox
              checked={notify()}
              onChange={setNotify}
              label="Email notifications"
              description="Receive email updates about your account activity"
            />
            <Checkbox
              checked={marketing()}
              onChange={setMarketing}
              label="Marketing emails"
              description="Receive tips, product updates and promotions"
            />
          </div>
        </DemoCard>

        <DemoCard title="Indeterminate" description="For 'select all' patterns with partial selection">
          <div class="space-y-3">
            <Checkbox
              checked={allChecked()}
              indeterminate={someChecked()}
              onChange={toggleAll}
              label="Select all items"
            />
            <div class="ml-6 space-y-2">
              <Checkbox
                checked={items()[0]}
                onChange={(c) => toggleItem(0, c)}
                label="Item 1"
              />
              <Checkbox
                checked={items()[1]}
                onChange={(c) => toggleItem(1, c)}
                label="Item 2"
              />
              <Checkbox
                checked={items()[2]}
                onChange={(c) => toggleItem(2, c)}
                label="Item 3"
              />
            </div>
          </div>
        </DemoCard>

        <DemoCard title="States" description="Disabled and default checked states">
          <div class="flex gap-8">
            <Checkbox label="Unchecked" />
            <Checkbox label="Checked" defaultChecked />
            <Checkbox label="Disabled" disabled />
            <Checkbox label="Disabled checked" disabled defaultChecked />
          </div>
        </DemoCard>

        <DemoCard title="Validation" description="Error clears when checkbox is checked">
          <div class="space-y-4">
            <Checkbox
              checked={termsAccepted()}
              onChange={setTermsAccepted}
              label="I agree to the terms and conditions"
              validationState={termsAccepted() ? 'valid' : 'invalid'}
              errorMessage="You must agree to continue"
            />
            <Checkbox
              checked={subscribed()}
              onChange={setSubscribed}
              label="Subscribe to newsletter"
              description="Get weekly updates"
              validationState={subscribed() ? 'valid' : 'invalid'}
              errorMessage="Please make a selection"
            />
          </div>
        </DemoCard>
      </div>
    </section>
  )
}
