import { Progress as KobalteProgress } from '@kobalte/core/progress'
import { splitProps, Show } from 'solid-js'
import { cn } from '../../utils/cn'

export type ProgressVariant = 'default' | 'success' | 'warning' | 'danger'

export type ProgressProps = {
  value?: number
  min?: number
  max?: number
  indeterminate?: boolean
  label?: string
  showValue?: boolean
  variant?: ProgressVariant
  size?: 'sm' | 'md' | 'lg'
  class?: string
}

const variantStyles: Record<ProgressVariant, string> = {
  default: 'bg-primary-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-danger-500',
}

const sizeStyles: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
}

export const Progress = (props: ProgressProps) => {
  const [local, others] = splitProps(props, [
    'value',
    'min',
    'max',
    'indeterminate',
    'label',
    'showValue',
    'variant',
    'size',
    'class',
  ])

  const min = () => local.min ?? 0
  const max = () => local.max ?? 100

  const formatValue = (value: number) => {
    const percentage = Math.round(((value - min()) / (max() - min())) * 100)
    return `${percentage}%`
  }

  return (
    <KobalteProgress
      value={local.value}
      minValue={min()}
      maxValue={max()}
      indeterminate={local.indeterminate}
      getValueLabel={({ value }) => formatValue(value)}
      class={cn('flex flex-col gap-1.5', local.class)}
      {...others}
    >
      <Show when={local.label || local.showValue}>
        <div class="flex justify-between text-sm">
          <Show when={local.label}>
            <KobalteProgress.Label class="font-medium text-text">
              {local.label}
            </KobalteProgress.Label>
          </Show>
          <Show when={local.showValue && !local.indeterminate}>
            <KobalteProgress.ValueLabel class="text-text-secondary" />
          </Show>
        </div>
      </Show>

      <KobalteProgress.Track
        class={cn(
          'w-full rounded-full bg-neutral-200 overflow-hidden',
          sizeStyles[local.size ?? 'md']
        )}
      >
        <KobalteProgress.Fill
          class={cn(
            'h-full rounded-full transition-all duration-300',
            variantStyles[local.variant ?? 'default'],
            local.indeterminate && 'animate-progress-indeterminate w-1/3'
          )}
          style={{
            width: local.indeterminate ? undefined : 'var(--kb-progress-fill-width)',
          }}
        />
      </KobalteProgress.Track>
    </KobalteProgress>
  )
}
