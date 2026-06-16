import { Dialog as KobalteDialog } from '@kobalte/core/dialog'
import { type JSX, splitProps, mergeProps, Show } from 'solid-js'
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
            data-nsg-dialog="content"
            onEscapeKeyDown={(e) => !local.closeOnEscape && e.preventDefault()}
            onPointerDownOutside={(e) => !local.closeOnClickOutside && e.preventDefault()}
          >
            <div data-nsg-dialog="header">
              <div data-nsg-dialog="header-info">
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

function CloseButton(props: ButtonOwnProps) {
  return <KobalteDialog.CloseButton as={Button} kind="ghost" {...props} />
}

Dialog.CloseButton = CloseButton;
