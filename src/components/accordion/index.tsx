import { Accordion as KobalteAccordion } from '@kobalte/core/accordion'
import { splitProps, JSX } from 'solid-js'
import { cn } from '../../utils/cn'
import { ChevronDownIcon } from '../../icons'

// ============================================================================
// Types
// ============================================================================

export type AccordionProps = {
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
  multiple?: boolean
  collapsible?: boolean
  unstyled?: boolean
  class?: string
  children?: JSX.Element
}

type AccordionItemProps = {
  value: string
  disabled?: boolean
  class?: string
  children?: JSX.Element
}

type AccordionTriggerProps = {
  unstyled?: boolean
  class?: string
  children?: JSX.Element
}

type AccordionContentProps = {
  unstyled?: boolean
  class?: string
  children?: JSX.Element
}

// ============================================================================
// Root
// ============================================================================

const AccordionRoot = (props: AccordionProps) => {
  const [local, others] = splitProps(props, [
    'value', 'defaultValue', 'onChange', 'multiple', 'collapsible', 'unstyled', 'class', 'children',
  ])

  return (
    <KobalteAccordion
      value={local.value}
      defaultValue={local.defaultValue}
      onChange={local.onChange}
      multiple={local.multiple}
      collapsible={local.collapsible ?? true}
      class={cn(!local.unstyled && 'nsg-accordion', local.class)}
      {...others}
    >
      {local.children}
    </KobalteAccordion>
  )
}

// ============================================================================
// Item
// ============================================================================

const Item = (props: AccordionItemProps) => {
  const [local, others] = splitProps(props, ['value', 'disabled', 'class', 'children'])

  return (
    <KobalteAccordion.Item
      value={local.value}
      disabled={local.disabled}
      class={cn(local.class)}
      {...others}
    >
      {local.children}
    </KobalteAccordion.Item>
  )
}

// ============================================================================
// Trigger
// ============================================================================

const Trigger = (props: AccordionTriggerProps) => {
  const [local, others] = splitProps(props, ['unstyled', 'class', 'children'])

  return (
    <KobalteAccordion.Header>
      <KobalteAccordion.Trigger
        class={cn('flex w-full items-center justify-between', local.class)}
        {...(!local.unstyled && { 'data-nsg-accordion': 'trigger' })}
        {...others}
      >
        {local.children}
        <ChevronDownIcon
          {...(!local.unstyled && { 'data-nsg-accordion': 'trigger-icon' })}
        />
      </KobalteAccordion.Trigger>
    </KobalteAccordion.Header>
  )
}

// ============================================================================
// Content
// ============================================================================

const Content = (props: AccordionContentProps) => {
  const [local, others] = splitProps(props, ['unstyled', 'class', 'children'])

  return (
    <KobalteAccordion.Content
      class="overflow-hidden"
      {...(!local.unstyled && { 'data-nsg-accordion': 'content' })}
      {...others}
    >
      <div
        class={cn(local.class)}
        {...(!local.unstyled && { 'data-nsg-accordion': 'content-inner' })}
      >
        {local.children}
      </div>
    </KobalteAccordion.Content>
  )
}

// ============================================================================
// Export
// ============================================================================

export const Accordion = Object.assign(AccordionRoot, { Item, Trigger, Content })
