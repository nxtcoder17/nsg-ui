import { Dialog as KobalteDialog } from "@kobalte/core/dialog";
import { type JSX, splitProps, mergeProps, Show, createSignal } from "solid-js";
import { Button, type ButtonOwnProps } from "../button";
import { XIcon } from "../../icons";

type DialogHeader = {
  title: string;
  description?: string;
  withCloseIcon?: boolean;
};

export type DialogRenderApi = { close: () => void }
export type DialogRenderProp = (api: DialogRenderApi) => JSX.Element

export type DialogProps = {
  header: DialogHeader;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: JSX.Element;
  children?: JSX.Element | DialogRenderProp;
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
};

export function Dialog(props: DialogProps & { children: DialogRenderProp }): JSX.Element
export function Dialog(props: DialogProps): JSX.Element
export function Dialog(props: DialogProps) {
  const [local, others] = splitProps(
    mergeProps({ closeOnEscape: true, closeOnClickOutside: true }, props),
    [
      "open",
      "onOpenChange",
      "trigger",
      "header",
      "children",
      "closeOnEscape",
      "closeOnClickOutside",
    ],
  );

  const [internalOpen, setInternalOpen] = createSignal(false);
  const isControlled = () => local.open !== undefined;
  const open = () => (isControlled() ? local.open! : internalOpen());
  const setOpen = (v: boolean) => {
    if (isControlled()) local.onOpenChange?.(v);
    else setInternalOpen(v);
  };
  return (
    <KobalteDialog
      open={open()}
      onOpenChange={setOpen}
      modal
      preventScroll
    >
      {local.trigger}
      <KobalteDialog.Portal>
        <KobalteDialog.Overlay class="nsg-dialog" data-nsg-dialog="overlay" />
        <div class="nsg-dialog" data-nsg-dialog="positioner">
          <KobalteDialog.Content
            data-nsg-dialog="content"
            onEscapeKeyDown={(e) => !local.closeOnEscape && e.preventDefault()}
            onPointerDownOutside={(e) =>
              !local.closeOnClickOutside && e.preventDefault()
            }
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

            {typeof local.children === "function"
              ? (local.children as DialogRenderProp)({ close: () => setOpen(false) })
              : local.children}
          </KobalteDialog.Content>
        </div>
      </KobalteDialog.Portal>
    </KobalteDialog>
  );
};

function CloseButton(props: ButtonOwnProps) {
  return <KobalteDialog.CloseButton as={Button} kind="secondary" {...props} />;
}

function TriggerButton(props: ButtonOwnProps) {
  return <KobalteDialog.Trigger as={Button} {...props} />;
}

Dialog.CloseButton = CloseButton;
Dialog.TriggerButton = TriggerButton;
