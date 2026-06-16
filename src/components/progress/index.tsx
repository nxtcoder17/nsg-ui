import { Progress as KobalteProgress } from '@kobalte/core/progress'
import { splitProps, Show, mergeProps } from 'solid-js'
import { cn } from '../../utils/cn'

export type ProgressKind = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'

export type ProgressProps = {
  value?: number
  min?: number
  max?: number
  indeterminate?: boolean
  label?: string
  showValue?: boolean
  kind?: ProgressKind
  /** Custom fill color (CSS color string). Overrides kind when set. */
  color?: string
  size?: 'sm' | 'md' | 'lg'
  class?: string
}

export const Progress = (props: ProgressProps) => {
  const merged = mergeProps({ kind: 'primary', size: 'md' } as const, props)
  const [local, others] = splitProps(merged, [
    'value',
    'min',
    'max',
    'indeterminate',
    'label',
    'showValue',
    'kind',
    'color',
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
      class={cn('nsg-progress', local.class)}
      data-size={local.size}
      {...others}
    >
      <Show when={local.label || local.showValue}>
        <div data-nsg-progress="header">
          <Show when={local.label}>
            <KobalteProgress.Label data-nsg-progress="label">
              {local.label}
            </KobalteProgress.Label>
          </Show>
          <Show when={local.showValue && !local.indeterminate}>
            <KobalteProgress.ValueLabel data-nsg-progress="value-label" />
          </Show>
        </div>
      </Show>

      <KobalteProgress.Track data-nsg-progress="track">
        <KobalteProgress.Fill
          data-nsg-progress="fill"
          data-kind={local.color ? undefined : local.kind}
          style={{
            width: local.indeterminate ? undefined : 'var(--kb-progress-fill-width)',
            background: local.color,
          }}
        />
      </KobalteProgress.Track>
    </KobalteProgress>
  )
}
