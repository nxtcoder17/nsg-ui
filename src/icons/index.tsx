import type { JSX } from 'solid-js'
import { cn } from '../utils/cn'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg'

type IconProps = {
  class?: string
  /** Predefined size: xs=12px, sm=14px, md=16px (default), lg=20px */
  size?: IconSize
  /** Stroke width for stroke-based icons (default varies per icon) */
  strokeWidth?: number
}

const sizeClasses: Record<IconSize, string> = {
  xs: 'w-3 h-3',     // 12px
  sm: 'w-3.5 h-3.5', // 14px
  md: 'w-4 h-4',     // 16px
  lg: 'w-5 h-5',     // 20px
}

export const CheckIcon = (props: IconProps): JSX.Element => (
  <svg
    class={cn(sizeClasses[props.size ?? 'md'], props.class)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width={props.strokeWidth ?? 2}
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export const MinusIcon = (props: IconProps): JSX.Element => (
  <svg
    class={cn(sizeClasses[props.size ?? 'md'], props.class)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width={props.strokeWidth ?? 3}
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export const DotIcon = (props: IconProps): JSX.Element => (
  <svg
    class={cn(sizeClasses[props.size ?? 'md'], props.class)}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <circle cx="12" cy="12" r="4" />
  </svg>
)

export const ChevronRightIcon = (props: IconProps): JSX.Element => (
  <svg
    class={cn(sizeClasses[props.size ?? 'md'], props.class)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width={props.strokeWidth ?? 2}
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export const ChevronDownIcon = (props: IconProps): JSX.Element => (
  <svg
    class={cn(sizeClasses[props.size ?? 'md'], props.class)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width={props.strokeWidth ?? 2}
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

export const XIcon = (props: IconProps): JSX.Element => (
  <svg
    class={cn(sizeClasses[props.size ?? 'md'], props.class)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width={props.strokeWidth ?? 2}
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export const PlusIcon = (props: IconProps): JSX.Element => (
  <svg
    class={cn(sizeClasses[props.size ?? 'md'], props.class)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width={props.strokeWidth ?? 2}
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export const ChevronUpIcon = (props: IconProps): JSX.Element => (
  <svg
    class={cn(sizeClasses[props.size ?? 'md'], props.class)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width={props.strokeWidth ?? 2}
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
)

export const SearchIcon = (props: IconProps): JSX.Element => (
  <svg
    class={cn(sizeClasses[props.size ?? 'md'], props.class)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width={props.strokeWidth ?? 2}
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
)

export const SpinnerIcon = (props: IconProps): JSX.Element => (
  <svg
    class={cn(sizeClasses[props.size ?? 'md'], 'animate-spin', props.class)}
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)
