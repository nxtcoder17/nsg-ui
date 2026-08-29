import { type JSX, splitProps, type ValidComponent } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import type { PolymorphicProps } from '@kobalte/core/polymorphic'
import { cn } from '../../utils/cn'

export type RowProps<T extends ValidComponent = 'div'> = {
  class?: string
  children?: JSX.Element
} & Omit<PolymorphicProps<T>, 'class' | 'children'>

// <Row> = flex-row. Polymorphic via `as` (e.g. <Row as="section">, <Row as={A}>).
export const Row = <T extends ValidComponent = 'div'>(props: RowProps<T>) => {
  const [local, others] = splitProps(props as RowProps<'div'> & { as?: ValidComponent }, [
    'class',
    'children',
    'as',
  ])

  return (
    <Dynamic component={local.as ?? 'div'} class={cn('flex flex-row', local.class)} {...(others as object)}>
      {local.children}
    </Dynamic>
  )
}

export type ColumnProps<T extends ValidComponent = 'div'> = {
  class?: string
  children?: JSX.Element
} & Omit<PolymorphicProps<T>, 'class' | 'children'>

// <Column> = flex-col. Polymorphic via `as`.
export const Column = <T extends ValidComponent = 'div'>(props: ColumnProps<T>) => {
  const [local, others] = splitProps(props as ColumnProps<'div'> & { as?: ValidComponent }, [
    'class',
    'children',
    'as',
  ])

  return (
    <Dynamic component={local.as ?? 'div'} class={cn('flex flex-col', local.class)} {...(others as object)}>
      {local.children}
    </Dynamic>
  )
}
