import { Component, createSignal } from 'solid-js'
import { Button } from 'nsg-ui'
import { Dialog } from 'nsg-ui'
import { DemoCard } from '../components/DemoCard'
import { DialogIcon } from '../icons'

// Demo components
function DeleteItemDialog() {
  return (
    <Dialog
      trigger={<Button variant="danger">Delete Item</Button>}
      title="Delete Item?"
      description="This action cannot be undone."
    >
      <div class="flex justify-end gap-2 p-4 border-t border-border">
        <Dialog.CloseButton>Cancel</Dialog.CloseButton>
        <Button variant="danger">Delete</Button>
      </div>
    </Dialog>
  )
}

function ConfirmationDialogDemo() {
  const [show, setShow] = createSignal(false)
  return (
    <Dialog
      show={show()}
      onChange={setShow}
      trigger={<Button>Save Changes</Button>}
      title="Save changes?"
      description="Your changes will be permanently saved. This action cannot be undone."
    >
      <div class="flex justify-end gap-2 p-4 border-t border-border">
        <Button variant="ghost" onClick={() => setShow(false)}>Cancel</Button>
        <Button onClick={() => setShow(false)}>Save</Button>
      </div>
    </Dialog>
  )
}

function FormDialogDemo() {
  const [show, setShow] = createSignal(false)
  return (
    <Dialog
      show={show()}
      onChange={setShow}
      trigger={<Button variant="outline">Edit Profile</Button>}
      title="Edit Profile"
      closeOnClickOutside={false}
    >
      <div class="p-6 pt-0 space-y-4">
        <div>
          <label class="block text-sm font-medium text-text mb-1.5">Name</label>
          <input
            type="text"
            placeholder="John Doe"
            class="w-full px-3 py-2.5 border border-border rounded-lg bg-surface text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-text mb-1.5">Email</label>
          <input
            type="email"
            placeholder="john@example.com"
            class="w-full px-3 py-2.5 border border-border rounded-lg bg-surface text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"
          />
        </div>
      </div>
      <div class="flex justify-end gap-2 p-4 border-t border-border">
        <Button variant="ghost" onClick={() => setShow(false)}>Cancel</Button>
        <Button onClick={() => setShow(false)}>Save Changes</Button>
      </div>
    </Dialog>
  )
}

export const DialogSection: Component = () => {
  return (
    <section id="dialog" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <DialogIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">Dialog</h2>
        </div>
        <p class="text-text-secondary ml-11">Modal dialog for focused interactions and confirmations.</p>
      </div>

      <div class="grid gap-6">
        <DemoCard title="Delete Item Confirmation" description="Dialog for Delete Item Confirmation">
          <DeleteItemDialog />
        </DemoCard>

        <DemoCard title="Confirmation Dialog" description="For destructive or important actions">
          <ConfirmationDialogDemo />
        </DemoCard>

        <DemoCard title="Form Dialog" description="Dialog with form inputs and validation">
          <FormDialogDemo />
        </DemoCard>
      </div>
    </section>
  )
}
