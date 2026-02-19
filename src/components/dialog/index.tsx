import { Dialog as KobalteDialog } from '@kobalte/core/dialog'
import { type JSX, splitProps, Show } from 'solid-js'
import { cn } from '../../utils/cn'
import { Button, type ButtonOwnProps } from '../button'

/** @deprecated Use @utility nsg-dialog-* in CSS instead */
export const dialogStyles = {
  overlay: 'nsg-dialog-overlay',
  content: 'nsg-dialog-content',
  title: 'nsg-dialog-title',
  description: 'nsg-dialog-description',
}

// ============================================================================
// Types
// ============================================================================

type DialogBaseProps = {
  show?: boolean
  onChange?: (show: boolean) => void
  trigger?: JSX.Element
  description?: string
  children?: JSX.Element
  closeOnEscape?: boolean
  closeOnClickOutside?: boolean
  position?: 'center' | 'top'
  contentClass?: string
}

export type DialogProps = DialogBaseProps & (
  | { title: string; 'aria-label'?: string }
  | { title?: never; 'aria-label': string }
)

// ============================================================================
// Component
// ============================================================================

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
    'position',
    'contentClass',
  ])

  const position = () => local.position ?? 'center'

  return (
    <KobalteDialog
      open={local.show}
      onOpenChange={local.onChange}
      modal
      preventScroll
    >
      <Show when={local.trigger}>
        <KobalteDialog.Trigger as="span">
          {local.trigger}
        </KobalteDialog.Trigger>
      </Show>
      <KobalteDialog.Portal>
        <KobalteDialog.Overlay
          class={cn(
            'fixed inset-0 z-50',
            'nsg-dialog-overlay',
            'data-[expanded]:animate-fade-in'
          )}
        />
        <div
          class={cn(
            'fixed inset-0 z-50 flex justify-center pointer-events-none',
            position() === 'center' ? 'items-center' : 'items-start pt-[15vh]'
          )}
        >
          <KobalteDialog.Content
            class={cn(
              'pointer-events-auto w-full max-w-lg mx-4',
              'nsg-dialog-content',
              position() === 'center'
                ? 'data-[expanded]:animate-scale-in'
                : 'data-[expanded]:animate-slide-up',
              'focus:outline-none',
              local.contentClass
            )}
            aria-label={local.title ? undefined : local['aria-label']}
            onEscapeKeyDown={(e) => local.closeOnEscape === false && e.preventDefault()}
            onPointerDownOutside={(e) => local.closeOnClickOutside === false && e.preventDefault()}
          >
            <Show when={local.title || local.description}>
              <div class="p-6 space-y-2">
                <Show when={local.title}>
                  <KobalteDialog.Title class="nsg-dialog-title">
                    {local.title}
                  </KobalteDialog.Title>
                </Show>
                <Show when={local.description}>
                  <KobalteDialog.Description class="nsg-dialog-description">
                    {local.description}
                  </KobalteDialog.Description>
                </Show>
              </div>
            </Show>

            {local.children}
          </KobalteDialog.Content>
        </div>
      </KobalteDialog.Portal>
    </KobalteDialog>
  )
}

Dialog.CloseButton = (props: ButtonOwnProps & { unstyled?: boolean }) => {
  const [local, others] = splitProps(props, ['unstyled'])
  if (local.unstyled) {
    return <KobalteDialog.CloseButton {...others} />
  }
  return <KobalteDialog.CloseButton as={Button} variant="outline" {...others} />
}
