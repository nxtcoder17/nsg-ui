import { Popover as KobaltePopover } from '@kobalte/core/popover'
import { type JSX, splitProps, Show } from 'solid-js'
import { cn } from '../../utils/cn'

export interface PopoverProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
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
  class?: string
}

export function Popover(props: PopoverProps) {
  const [local, others] = splitProps(props, [
    'open',
    'onOpenChange',
    'trigger',
    'triggerLabel',
    'title',
    'description',
    'children',
    'arrow',
    'placement',
    'gutter',
    'class'
  ])

  return (
    <KobaltePopover
      open={local.open}
      onOpenChange={local.onOpenChange}
      placement={local.placement}
      gutter={local.gutter ?? 8}
      {...others}
    >
      <KobaltePopover.Trigger as="div" class="nsg-trigger" aria-label={local.triggerLabel}>
        {local.trigger}
      </KobaltePopover.Trigger>

      <KobaltePopover.Portal>
        <KobaltePopover.Content
          class={cn('nsg-popover', local.class)}
          data-nsg-popover="content"
        >
          <Show when={local.arrow}>
            <KobaltePopover.Arrow data-nsg-popover="arrow" size={18} />
          </Show>

          <div data-nsg-popover="inner">
            <Show when={local.title || local.description}>
              <div data-nsg-popover="header">
                <Show when={local.title}>
                  <KobaltePopover.Title data-nsg-popover="title">
                    {local.title}
                  </KobaltePopover.Title>
                </Show>
                <Show when={local.description}>
                  <KobaltePopover.Description data-nsg-popover="description">
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
