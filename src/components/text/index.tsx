import { splitProps, mergeProps, JSX, ValidComponent } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { cn } from '../../utils/cn'

export type TextColor = 'default' | 'muted' | 'secondary' | 'primary' | 'danger' | 'success' | 'warning'
export type TextElement = 'span' | 'p' | 'div' | 'label' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type TextProps = {
  color?: TextColor
  as?: TextElement
  class?: string
  truncate?: boolean
  children: JSX.Element
}

export const Text = (props: TextProps) => {
  const merged = mergeProps({ color: 'default' as TextColor, as: 'span' as TextElement }, props)
  const [local, others] = splitProps(merged, ['color', 'as', 'class', 'children'])

  return (
    <Dynamic
      component={local.as as ValidComponent}
      class={cn('nsg-text', local.class)}
      data-color={local.color}
      {...others}
    >
      {local.children}
    </Dynamic>
  )
}
