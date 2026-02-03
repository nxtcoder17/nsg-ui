import { Dialog as KobalteDialog } from '@kobalte/core/dialog'
import { type JSX, splitProps, Show } from 'solid-js'
import { cn } from '../../utils/cn'
import { Button, type ButtonOwnProps } from '../button'

type DialogBaseProps = {
  show?: boolean
  onChange?: (show: boolean) => void
  /** Trigger element. If omitted, dialog is controlled entirely via show/onChange */
  trigger?: JSX.Element
  description?: string
  children?: JSX.Element
  /** Close dialog on Escape key (default: true) */
  closeOnEscape?: boolean
  /** Close dialog on click outside (default: true) */
  closeOnClickOutside?: boolean
  /** Position of the dialog: 'center' (default) or 'top' (command-bar style) */
  position?: 'center' | 'top'
  /** Additional classes for the content container */
  contentClass?: string
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
            'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
            'data-[expanded]:animate-fade-in'
          )}
        />
        {/* Flexbox wrapper avoids transform conflicts with animations */}
        <div
          class={cn(
            'fixed inset-0 z-50 flex justify-center pointer-events-none',
            position() === 'center' ? 'items-center' : 'items-start pt-[15vh]'
          )}
        >
          <KobalteDialog.Content
            class={cn(
              'pointer-events-auto w-full max-w-lg mx-4',
              'bg-surface-raised text-text border border-border rounded-lg shadow-lg',
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
        </div>
      </KobalteDialog.Portal>
    </KobalteDialog>
  )
}

Dialog.CloseButton = (props: ButtonOwnProps) => {
  return <KobalteDialog.CloseButton as={Button} variant="outline" {...props}/>
}
