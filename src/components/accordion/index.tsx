import { Accordion as KobalteAccordion } from '@kobalte/core/accordion'
import { splitProps, JSX, For } from 'solid-js'
import { cn } from '../../utils/cn'
import { ChevronDownIcon } from '../../icons'

export type AccordionItem = {
  value: string
  title: string
  content: JSX.Element
  disabled?: boolean
}

export type AccordionProps = {
  items: AccordionItem[]
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
  multiple?: boolean
  collapsible?: boolean
  class?: string
}

export const Accordion = (props: AccordionProps) => {
  const [local, others] = splitProps(props, [
    'items',
    'value',
    'defaultValue',
    'onChange',
    'multiple',
    'collapsible',
    'class',
  ])

  return (
    <KobalteAccordion
      value={local.value}
      defaultValue={local.defaultValue}
      onChange={local.onChange}
      multiple={local.multiple}
      collapsible={local.collapsible ?? true}
      class={cn('divide-y divide-border rounded-lg border border-border', local.class)}
      {...others}
    >
      <For each={local.items}>
        {(item) => (
          <KobalteAccordion.Item
            value={item.value}
            disabled={item.disabled}
            class="group"
          >
            <KobalteAccordion.Header>
              <KobalteAccordion.Trigger
                class={cn(
                  'flex w-full items-center justify-between px-4 py-3',
                  'text-sm font-medium text-text',
                  'hover:bg-neutral-50 dark:hover:bg-neutral-800/50',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
                  'transition-colors',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                {item.title}
                <ChevronDownIcon
                  class={cn(
                    'text-text-secondary transition-transform duration-200',
                    'group-data-[expanded]:rotate-180'
                  )}
                />
              </KobalteAccordion.Trigger>
            </KobalteAccordion.Header>
            <KobalteAccordion.Content
              class={cn(
                'overflow-hidden text-sm text-text-secondary',
                'data-[expanded]:animate-accordion-down',
                'data-[closed]:animate-accordion-up'
              )}
            >
              <div class="px-4 pb-4">
                {item.content}
              </div>
            </KobalteAccordion.Content>
          </KobalteAccordion.Item>
        )}
      </For>
    </KobalteAccordion>
  )
}
