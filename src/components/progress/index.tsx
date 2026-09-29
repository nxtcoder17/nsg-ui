import { Progress as KobalteProgress } from '@kobalte/core/progress'
import { splitProps, Show, mergeProps, createUniqueId } from 'solid-js'
import { cn } from '../../utils/cn'

export type ProgressKind = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'

export type ProgressProps = {
  value?: number
  min?: number
  max?: number
  indeterminate?: boolean
  /** Visible caption, and the bar's accessible name. */
  label?: string
  showValue?: boolean
  kind?: ProgressKind
  /** Custom fill color (CSS color string). Overrides kind when set. */
  color?: string
  size?: 'sm' | 'md' | 'lg'
  class?: string
  /** Accessible name for the bar when there is no visible `label` — or to
   *  override it. A `progressbar` with no name is an unnamed widget. */
  'aria-label'?: string
  /** Ids of the element(s) that name the bar. */
  'aria-labelledby'?: string
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

  const labelId = createUniqueId()

  return (
    <KobalteProgress
      value={local.value}
      minValue={min()}
      maxValue={max()}
      indeterminate={local.indeterminate}
      getValueLabel={({ value }) => formatValue(value)}
      /* The bar carries `role="progressbar"`, and a role with no accessible name
       * is an unnamed widget — a screen reader announces a bare percentage with
       * nothing saying what is progressing.
       *
       * Precedence, and it matters: an explicit `aria-label` from the caller
       * wins, then the visible `label` (rendered as the bar's caption), then the
       * `showValue` caption. These read FROM the spread above rather than being
       * set by it, so a `label`-less usage can never overwrite a label the caller
       * already supplied — which is exactly the bug the first version had. */
      {...others}
      aria-label={others['aria-label'] ?? local.label ?? undefined}
      aria-labelledby={
        others['aria-labelledby'] ??
        (!local.label && !others['aria-label'] && local.showValue
          ? labelId
          : undefined)
      }
      class={cn('nsg-progress', local.class)}
      data-size={local.size}
    >
      <Show when={local.label || local.showValue}>
        <div data-nsg-progress="header">
          <Show when={local.label}>
            <KobalteProgress.Label data-nsg-progress="label" id={labelId}>
              {local.label}
            </KobalteProgress.Label>
          </Show>
          <Show when={local.showValue && !local.indeterminate}>
            <KobalteProgress.ValueLabel
              data-nsg-progress="value-label"
              id={local.label ? undefined : labelId}
            />
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
