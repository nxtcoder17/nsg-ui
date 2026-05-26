import { Accordion as KobalteAccordion, AccordionRootProps } from '@kobalte/core/accordion'
import { splitProps, JSX } from 'solid-js'
import { cn } from '../../utils/cn'
import { ChevronRightIcon } from '../../icons'

export type AccordionProps = AccordionRootProps & {
  class?: string
  children?: JSX.Element
}

const AccordionRoot = (props: AccordionProps) => {
  const [local, others] = splitProps(props as any, ['class', 'children'])

  return (
    <KobalteAccordion
      collapsible
      class={cn('nsg-accordion', local.class)}
      {...others}
    >
      {local.children}
    </KobalteAccordion>
  )
}

export type AccordionItemProps = {
  value: string
  trigger: JSX.Element
  disabled?: boolean
  class?: string
  children?: JSX.Element
}

const Item = (props: AccordionItemProps) => {
  const [local, others] = splitProps(props, ['value', 'trigger', 'disabled', 'class', 'children'])

  return (
    <KobalteAccordion.Item
      value={local.value}
      disabled={local.disabled}
      class={cn(local.class)}
      {...others}
    >
      <KobalteAccordion.Header>
        <KobalteAccordion.Trigger
          data-nsg-accordion="trigger"
        >
          <div class="flex-1">
            {local.trigger}
          </div>
          <ChevronRightIcon data-nsg-accordion="trigger-icon" />
        </KobalteAccordion.Trigger>
      </KobalteAccordion.Header>
      <KobalteAccordion.Content
        class="overflow-hidden"
        data-nsg-accordion="content-wrapper"
      >
        <div data-nsg-accordion="content">
          {local.children}
        </div>
      </KobalteAccordion.Content>
    </KobalteAccordion.Item>
  )
}

export const Accordion = Object.assign(AccordionRoot, { Item })
