import { Dialog as KobalteDialog } from '@kobalte/core/dialog'
import { type JSX, splitProps, Show } from 'solid-js'
import { cn } from '../../utils/cn'
import { Button } from '../button'

type DialogBaseProps = {
  show?: boolean
  onChange?: (show: boolean) => void
  trigger: JSX.Element
  description?: string
  children?: JSX.Element
  /** Close dialog on Escape key (default: true) */
  closeOnEscape?: boolean
  /** Close dialog on click outside (default: true) */
  closeOnClickOutside?: boolean
}

export type DialogProps = DialogBaseProps & (
  | { title: string; 'aria-label'?: string }
  | { title?: never; 'aria-label': string }
)

export const Dialog = (props: DialogProps) => {
  const [local, others] = splitProps(props, [
    'show',
    'onChange',
    'trigger',
    'title',
    'description',
    'children',
    'closeOnEscape',
    'closeOnClickOutside',
    'aria-label',
  ])

  return (
    <KobalteDialog
      open={local.show}
      onOpenChange={local.onChange}
      modal
      preventScroll
    >
      <KobalteDialog.Trigger>
        {local.trigger ?? <Button>FALLBACK - trigger undefined</Button>}
      </KobalteDialog.Trigger>
      <KobalteDialog.Portal>
        <KobalteDialog.Overlay
          class={cn(
            'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
            'data-[expanded]:animate-fade-in'
          )}
        />
        <KobalteDialog.Content
          class={cn(
            'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
            'bg-surface-raised border border-border rounded-lg shadow-lg',
            'data-[expanded]:animate-scale-in',
            'focus:outline-none'
          )}
          aria-label={local.title ? undefined : local['aria-label']}
          onEscapeKeyDown={(e) => local.closeOnEscape === false && e.preventDefault()}
          onPointerDownOutside={(e) => local.closeOnClickOutside === false && e.preventDefault()}
        >
          <Show when={local.title || local.description}>
            <div class="p-6 space-y-2">
              <Show when={local.title}>
                <KobalteDialog.Title class="text-lg font-semibold text-text">
                  {local.title}
                </KobalteDialog.Title>
              </Show>
              <Show when={local.description}>
                <KobalteDialog.Description class="text-sm text-text-secondary">
                  {local.description}
                </KobalteDialog.Description>
              </Show>
            </div>
          </Show>

          {local.children}
        </KobalteDialog.Content>
      </KobalteDialog.Portal>
    </KobalteDialog>
  )
}

Dialog.ExampleUsage = () => {
  return (
    <Dialog
      trigger={<Button variant="danger">Delete Item</Button>}
      title="Delete Item?"
      description="This action cannot be undone."
    >
      <div class="flex justify-end gap-2 p-4 border-t border-border">
        <KobalteDialog.CloseButton as={Button} variant="ghost">
          Cancel
        </KobalteDialog.CloseButton>
        <Button variant="danger">Delete</Button>
      </div>
    </Dialog>
  )
}
