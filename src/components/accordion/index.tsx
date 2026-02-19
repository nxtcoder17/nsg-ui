import { Accordion as KobalteAccordion } from '@kobalte/core/accordion'
import { splitProps, JSX, Show } from 'solid-js'
import { cn } from '../../utils/cn'
import { ChevronDownIcon } from '../../icons'

/** @deprecated Use @utility nsg-accordion-* in CSS instead */
export const accordionStyles = {
  trigger: 'nsg-accordion-trigger',
  content: 'nsg-accordion-content',
}

// ============================================================================
// Types
// ============================================================================

export type AccordionProps = {
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
  multiple?: boolean
  collapsible?: boolean
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
  triggerIconClass?: string
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
    'value',
    'defaultValue',
    'onChange',
    'multiple',
    'collapsible',
    'class',
    'children',
  ])

  return (
    <KobalteAccordion
      value={local.value}
      defaultValue={local.defaultValue}
      onChange={local.onChange}
      multiple={local.multiple}
      collapsible={local.collapsible ?? true}
      class={cn('nsg-accordion-root', local.class)}
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
      class={cn('group', local.class)}
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
  const [local, others] = splitProps(props, ['unstyled', 'triggerIconClass', 'class', 'children'])

  return (
    <KobalteAccordion.Header>
      <KobalteAccordion.Trigger
        class={cn(
          'flex w-full items-center justify-between',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          !local.unstyled && 'nsg-accordion-trigger',
          local.class
        )}
        {...others}
      >
        {local.children}
        <ChevronDownIcon
          class={cn(
            'nsg-accordion-icon',
            'group-data-[expanded]:rotate-180',
            local.triggerIconClass
          )}
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
      class={cn(
        'overflow-hidden',
        !local.unstyled && 'nsg-accordion-content',
        'data-[expanded]:animate-accordion-down',
        'data-[closed]:animate-accordion-up',
      )}
      {...others}
    >
      <div class={cn('nsg-accordion-content-inner', local.class)}>
        {local.children}
      </div>
    </KobalteAccordion.Content>
  )
}

// ============================================================================
// Export
// ============================================================================

export const Accordion = Object.assign(AccordionRoot, { Item, Trigger, Content })
