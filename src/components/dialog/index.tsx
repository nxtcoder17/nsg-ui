import { Dialog as KobalteDialog } from '@kobalte/core/dialog'
import { type JSX, splitProps, mergeProps, Show } from 'solid-js'
import { cn } from '../../utils/cn'
import { Button, type ButtonOwnProps } from '../button'
import { XIcon } from '../../icons'

type DialogHeader = {
  title: string
  description?: string
  withCloseIcon?: boolean
};

export type DialogProps = {
  header: DialogHeader
  show?: boolean
  onChange?: (show: boolean) => void
  trigger?: JSX.Element
  children?: JSX.Element
  closeOnEscape?: boolean
  closeOnClickOutside?: boolean
}

export const Dialog = (props: DialogProps) => {
  const [local, others] = splitProps(mergeProps(
    { closeOnEscape: true, closeOnClickOutside: true },
    props
  ), [
    'show',
    'onChange',
    'trigger',
    'header',
    'children',
    'closeOnEscape',
    'closeOnClickOutside',
  ])

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
        <KobalteDialog.Overlay class="nsg-dialog" data-nsg-dialog="overlay" />
        <div class="nsg-dialog" data-nsg-dialog="positioner">
          <KobalteDialog.Content
            class={cn(
              'pointer-events-auto w-full max-w-lg mx-4',
              'focus:outline-none',
            )}
            data-nsg-dialog="content"
            onEscapeKeyDown={(e) => !local.closeOnEscape && e.preventDefault()}
            onPointerDownOutside={(e) => !local.closeOnClickOutside && e.preventDefault()}
          >
            <div class="flex flex-row gap-2 p-4 justify-between">
              <div class="flex flex-col gap-2">
                <KobalteDialog.Title data-nsg-dialog="title">
                  {local.header.title}
                </KobalteDialog.Title>
                <Show when={local.header.description}>
                  <KobalteDialog.Description data-nsg-dialog="description">
                    {local.header.description}
                  </KobalteDialog.Description>
                </Show>
              </div>

              <Show when={local.header.withCloseIcon}>
                <CloseButton size="icon-sm">
                  <XIcon />
                </CloseButton>
              </Show>
            </div>

            {local.children}
          </KobalteDialog.Content>
        </div>
      </KobalteDialog.Portal>
    </KobalteDialog>
  )
}

function CloseButton(props: ButtonOwnProps & { unstyled?: boolean }) {
  const [local, others] = splitProps(props, ['unstyled'])
  if (local.unstyled) {
    return <KobalteDialog.CloseButton {...others} />
  }
  return <KobalteDialog.CloseButton as={Button} variant="ghost" {...others} />
}

Dialog.CloseButton = CloseButton;
