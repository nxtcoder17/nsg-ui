import { Component, createSignal } from 'solid-js'
import { Button, toast } from 'nsg-ui'
import { DemoCard } from '../components/DemoCard'

export function ToastIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M7 10h6M7 14h10" />
    </svg>
  )
}

export const ToastSection: Component = () => {
  const [lastId, setLastId] = createSignal<number | null>(null)

  const showInfo = () => {
    const id = toast.info({ title: 'New notification', description: 'You have a new message' })
    setLastId(id)
  }

  const showSuccess = () => {
    const id = toast.success({ title: 'Saved successfully' })
    setLastId(id)
  }

  const showWarning = () => {
    const id = toast.warning({ title: 'Session expiring', description: 'Your session will expire in 5 minutes' })
    setLastId(id)
  }

  const showDanger = () => {
    const id = toast.danger({ title: 'Delete failed', description: 'Could not delete the item' })
    setLastId(id)
  }

  const showPersistent = () => {
    const id = toast.info({
      title: 'Uploading...',
      description: 'This toast stays until dismissed',
      persistent: true
    })
    setLastId(id)
  }

  const showNoClose = () => {
    toast.success({
      title: 'Auto-dismiss only',
      description: 'No close button on this one',
      withCloseIcon: false
    })
  }

  const updateLast = () => {
    const id = lastId()
    if (id !== null) {
      toast.update(id, {
        title: 'Updated!',
        description: 'Toast content was updated',
        variant: 'success'
      })
    }
  }

  const dismissLast = () => {
    const id = lastId()
    if (id !== null) {
      toast.dismiss(id)
      setLastId(null)
    }
  }

  return (
    <section id="toast" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <ToastIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">Toast</h2>
        </div>
        <p class="text-text-secondary ml-11">Displays brief, auto-dismissing notifications.</p>
      </div>

      <div class="grid gap-6">
        <DemoCard title="Variants" description="Info, success, warning, and danger styles">
          <div class="flex flex-wrap gap-3">
            <Button variant="outline" onClick={showInfo}>Info</Button>
            <Button variant="outline" onClick={showSuccess}>Success</Button>
            <Button variant="outline" onClick={showWarning}>Warning</Button>
            <Button variant="danger" onClick={showDanger}>Danger</Button>
          </div>
        </DemoCard>

        <DemoCard title="Options" description="Persistent toasts and hiding the close button">
          <div class="flex flex-wrap gap-3">
            <Button variant="outline" onClick={showPersistent}>Persistent (no auto-dismiss)</Button>
            <Button variant="outline" onClick={showNoClose}>No close icon</Button>
          </div>
        </DemoCard>

        <DemoCard title="Programmatic Control" description="Update, dismiss, or clear toasts via API">
          <div class="flex flex-wrap gap-3">
            <Button variant="outline" onClick={updateLast} disabled={lastId() === null}>
              Update last toast
            </Button>
            <Button variant="outline" onClick={dismissLast} disabled={lastId() === null}>
              Dismiss last toast
            </Button>
            <Button variant="ghost" onClick={() => toast.clear()}>
              Clear all
            </Button>
          </div>
        </DemoCard>

        <DemoCard title="API Reference" description="How to use the toast API">
          <div class="font-mono text-sm text-text-secondary space-y-2">
            <p><span class="text-primary-500">toast.info</span>({'{ title, description?, withCloseIcon?, duration?, persistent? }'})</p>
            <p><span class="text-success-500">toast.success</span>({'{ ... }'})</p>
            <p><span class="text-warning-500">toast.warning</span>({'{ ... }'})</p>
            <p><span class="text-danger-500">toast.danger</span>({'{ ... }'})</p>
            <p class="pt-2 border-t border-border">
              <span class="text-text">toast.update</span>(id, {'{ title?, description?, variant? }'})
            </p>
            <p><span class="text-text">toast.dismiss</span>(id)</p>
            <p><span class="text-text">toast.clear</span>()</p>
          </div>
        </DemoCard>
      </div>
    </section>
  )
}
