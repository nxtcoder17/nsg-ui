import { Button as KobalteButton } from '@kobalte/core/button'
import type { PolymorphicProps } from '@kobalte/core/polymorphic'
import { type JSX, splitProps, mergeProps, type ValidComponent } from 'solid-js'
import { cn } from '../../utils/cn'

export interface ButtonOwnProps {
  kind?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'icon-sm'
  outline?: boolean
  class?: string
  children?: JSX.Element
}

// Polymorphic: T is inferred from the `as` value (default 'button'), so
// <Button as={A} href="…"> gets A's props while <Button onClick={…}> keeps
// native button attributes. `as` itself comes from PolymorphicAttributes.
export type ButtonProps<T extends ValidComponent = 'button'> = ButtonOwnProps &
  Omit<PolymorphicProps<T>, keyof ButtonOwnProps>

export const Button = <T extends ValidComponent = 'button'>(props: ButtonProps<T>) => {
  const merged = mergeProps({ kind: 'primary', size: 'md' } as const, props)
  const [local, others] = splitProps(merged, [
    'kind',
    'size',
    'outline',
    'as',
    'class',
    'children',
  ])

  return (
    <KobalteButton
      as={local.as}
      class={cn(
        'nsg-button',
        local.outline && 'nsg-button-outline',
        local.class
      )}
      data-kind={local.kind}
      data-size={local.size}
      {...others}
    >
      {local.children}
    </KobalteButton>
  )
}
