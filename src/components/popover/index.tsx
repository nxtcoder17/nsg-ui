import { Popover as KobaltePopover } from '@kobalte/core/popover'
import { type JSX, splitProps, Show } from 'solid-js'
import { cn } from '../../utils/cn'
import { Button } from '../button'

export interface PopoverProps {
  show?: boolean
  onChange?: (show: boolean) => void
  trigger: JSX.Element
  /** Accessible label for the trigger (required for icon-only triggers) */
  triggerLabel?: string
  title?: string
  description?: string
  children?: JSX.Element
  /** Show arrow pointing to trigger */
  arrow?: boolean
  /** Placement relative to trigger */
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
  /** Gap between popover and trigger */
  gutter?: number
}

export function Popover(props: PopoverProps) {
  const [local, others] = splitProps(props, [
    'show', 'onChange', 'trigger', 'triggerLabel', 'title', 'description', 'children', 'arrow', 'placement', 'gutter'
  ])

  return (
    <KobaltePopover
      open={local.show}
      onOpenChange={local.onChange}
      placement={local.placement}
      gutter={local.gutter ?? 8}
      {...others}
    >
      <KobaltePopover.Trigger as="div" aria-label={local.triggerLabel}>{local.trigger}</KobaltePopover.Trigger>

      <KobaltePopover.Portal>
        <KobaltePopover.Content
          class={cn(
            'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface-raised shadow-lg',
            'data-[expanded]:animate-scale-in',
            'origin-[var(--kb-popover-content-transform-origin)]'
          )}
        >
          <Show when={local.arrow}>
            <KobaltePopover.Arrow class="fill-surface-raised" />
          </Show>

          <div class="p-4">
            <Show when={local.title || local.description}>
              <div class="space-y-1 mb-2">
                <Show when={local.title}>
                  <KobaltePopover.Title class="text-sm font-medium text-text">
                    {local.title}
                  </KobaltePopover.Title>
                </Show>
                <Show when={local.description}>
                  <KobaltePopover.Description class="text-sm text-text-secondary">
                    {local.description}
                  </KobaltePopover.Description>
                </Show>
              </div>
            </Show>
            {local.children}
          </div>
        </KobaltePopover.Content>
      </KobaltePopover.Portal>
    </KobaltePopover>
  )
}

/** Example usage - copy this pattern */
export function PopoverExample() {
  return (
    <Popover
      trigger={<Button variant="outline">Open Popover</Button>}
      title="Popover Title"
      description="This is a popover with some helpful information."
      arrow
    >
      <div class="flex justify-end mt-2">
        <Button variant="ghost" size="sm">Got it</Button>
      </div>
    </Popover>
  )
}
