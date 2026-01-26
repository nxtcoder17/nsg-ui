import type { JSX } from 'solid-js'
import { cn } from '../utils/cn'

type IconProps = {
  class?: string
}

export const CheckIcon = (props: IconProps): JSX.Element => (
  <svg
    class={cn('w-4 h-4', props.class)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export const DotIcon = (props: IconProps): JSX.Element => (
  <svg
    class={cn('w-4 h-4', props.class)}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <circle cx="12" cy="12" r="4" />
  </svg>
)

export const ChevronRightIcon = (props: IconProps): JSX.Element => (
  <svg
    class={cn('ml-auto h-4 w-4', props.class)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
)
