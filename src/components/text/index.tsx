import { splitProps, JSX, ValidComponent } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { cn } from '../../utils/cn'

export type TextColor = 'default' | 'muted' | 'secondary' | 'primary' | 'danger' | 'success' | 'warning'
export type TextElement = 'span' | 'p' | 'div' | 'label' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type TextProps = {
  color?: TextColor
  as?: TextElement
  class?: string
  children: JSX.Element
}

const colorStyles: Record<TextColor, string> = {
  default: 'text-text',
  muted: 'text-text-muted',
  secondary: 'text-text-secondary',
  primary: 'text-primary-500',
  danger: 'text-danger-500',
  success: 'text-success-500',
  warning: 'text-warning-500',
}

export const Text = (props: TextProps) => {
  const [local, others] = splitProps(props, ['color', 'as', 'class', 'children'])

  return (
    <Dynamic
      component={(local.as ?? 'span') as ValidComponent}
      class={cn(
        colorStyles[local.color ?? 'default'],
        local.class
      )}
      {...others}
    >
      {local.children}
    </Dynamic>
  )
}
