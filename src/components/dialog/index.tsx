import { Dialog as KobalteDialog } from "@kobalte/core/dialog";
import { type JSX, splitProps, mergeProps, Show, createSignal } from "solid-js";
import { Button, type ButtonOwnProps } from "../button";
import { XIcon } from "../../icons";
import { cn } from "../../utils/cn";

export type DialogHeaderProps = {
  title: string;
  description?: string;
  withCloseIcon?: boolean;
};

export type DialogBodyProps = {
  class?: string;
  children?: JSX.Element;
} & JSX.HTMLAttributes<HTMLDivElement>;

export type DialogFooterProps = {
  class?: string;
  children?: JSX.Element;
} & JSX.HTMLAttributes<HTMLDivElement>;

export type DialogRenderApi = { close: () => void };
export type DialogRenderProp = (api: DialogRenderApi) => JSX.Element;

export type DialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: JSX.Element;
  children?: JSX.Element | DialogRenderProp;
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
};

export function Dialog(props: DialogProps & { children: DialogRenderProp }): JSX.Element;
export function Dialog(props: DialogProps): JSX.Element;
export function Dialog(props: DialogProps) {
  const [local] = splitProps(
    mergeProps({ closeOnEscape: true, closeOnClickOutside: true }, props),
    ["open", "onOpenChange", "trigger", "children", "closeOnEscape", "closeOnClickOutside"],
  );

  const [internalOpen, setInternalOpen] = createSignal(false);
  const isControlled = () => local.open !== undefined;
  const open = () => (isControlled() ? local.open! : internalOpen());
  const setOpen = (v: boolean) => {
    if (isControlled()) local.onOpenChange?.(v);
    else setInternalOpen(v);
  };
  return (
    <KobalteDialog open={open()} onOpenChange={setOpen} modal preventScroll>
      {local.trigger}
      <KobalteDialog.Portal>
        <KobalteDialog.Overlay class="nsg-dialog" data-nsg-dialog="overlay" />
        <div class="nsg-dialog" data-nsg-dialog="positioner">
          <KobalteDialog.Content
            data-nsg-dialog="content"
            onEscapeKeyDown={(e) => !local.closeOnEscape && e.preventDefault()}
            onPointerDownOutside={(e) => !local.closeOnClickOutside && e.preventDefault()}
          >
            {typeof local.children === "function"
              ? (local.children as DialogRenderProp)({ close: () => setOpen(false) })
              : local.children}
          </KobalteDialog.Content>
        </div>
      </KobalteDialog.Portal>
    </KobalteDialog>
  );
}

function Header(props: DialogHeaderProps) {
  return (
    <div data-nsg-dialog="header">
      <div data-nsg-dialog="header-info">
        <KobalteDialog.Title data-nsg-dialog="title">{props.title}</KobalteDialog.Title>
        <Show when={props.description}>
          <KobalteDialog.Description data-nsg-dialog="description">
            {props.description}
          </KobalteDialog.Description>
        </Show>
      </div>

      <Show when={props.withCloseIcon}>
        <CloseButton size="icon-sm">
          <XIcon />
        </CloseButton>
      </Show>
    </div>
  );
}

function Body(props: DialogBodyProps) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <div data-nsg-dialog="body" class={cn(local.class)} {...others}>
      {local.children}
    </div>
  );
}

function Footer(props: DialogFooterProps) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <div data-nsg-dialog="footer" class={cn(local.class)} {...others}>
      {local.children}
    </div>
  );
}

function CloseButton(props: ButtonOwnProps) {
  return <KobalteDialog.CloseButton as={Button} kind="secondary" {...props} />;
}

function TriggerButton(props: ButtonOwnProps) {
  return <KobalteDialog.Trigger as={Button} {...props} />;
}

Dialog.Header = Header;
Dialog.Body = Body;
Dialog.Footer = Footer;
Dialog.CloseButton = CloseButton;
Dialog.TriggerButton = TriggerButton;
