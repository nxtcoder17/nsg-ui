import { Tabs as KobalteTabs } from '@kobalte/core/tabs'
import { splitProps, JSX, For, Show } from 'solid-js'
import { cn } from '../../utils/cn'

// ============================================================================
// Types
// ============================================================================

export type TabItem = {
  value: string
  label: string
  disabled?: boolean
}

export type TabsProps = {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  tabs: TabItem[]
  orientation?: 'horizontal' | 'vertical'
  class?: string
  children: (value: string) => JSX.Element
}

// ============================================================================
// Tabs Component
// ============================================================================

export const Tabs = (props: TabsProps) => {
  const [local, others] = splitProps(props, [
    'value',
    'defaultValue',
    'onChange',
    'tabs',
    'orientation',
    'class',
    'children',
  ])

  const isVertical = () => local.orientation === 'vertical'

  return (
    <KobalteTabs
      value={local.value}
      defaultValue={local.defaultValue}
      onChange={local.onChange}
      orientation={local.orientation}
      class={cn(
        'flex',
        isVertical() ? 'flex-row gap-4' : 'flex-col gap-3',
        local.class
      )}
      {...others}
    >
      <KobalteTabs.List
        class={cn(
          'flex shrink-0',
          isVertical()
            ? 'flex-col border-r border-border pr-4'
            : 'flex-row border-b border-border'
        )}
      >
        <For each={local.tabs}>
          {(tab) => (
            <KobalteTabs.Trigger
              value={tab.value}
              disabled={tab.disabled}
              class={cn(
                'px-4 py-2 text-sm font-medium transition-colors',
                'text-text-secondary hover:text-text',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
                'data-[selected]:text-primary-500',
                'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
                isVertical()
                  ? 'text-left border-r-2 border-transparent -mr-px data-[selected]:border-r-primary-500'
                  : 'border-b-2 border-transparent -mb-px data-[selected]:border-b-primary-500'
              )}
            >
              {tab.label}
            </KobalteTabs.Trigger>
          )}
        </For>
      </KobalteTabs.List>

      <For each={local.tabs}>
        {(tab) => (
          <KobalteTabs.Content value={tab.value} class="flex-1 outline-none">
            {local.children(tab.value)}
          </KobalteTabs.Content>
        )}
      </For>
    </KobalteTabs>
  )
}
