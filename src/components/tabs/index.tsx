import { Tabs as KobalteTabs } from '@kobalte/core/tabs'
import { splitProps, JSX, For, children } from 'solid-js'
import { cn } from '../../utils/cn'

type TabItemData = {
  $$tabItem: true
  value: string
  trigger: JSX.Element
  disabled?: boolean
  content: JSX.Element
}

type TabItemProps = {
  value: string
  trigger: JSX.Element
  disabled?: boolean
  children: JSX.Element
}

export type TabsProps = {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  /** Custom color for the selected tab indicator (CSS color string) */
  indicatorColor?: string
  /** Navigation-only mode - renders only tab triggers without content panels */
  navigationOnly?: boolean
  /** Custom classes for the tab list container */
  listClass?: string
  /** Custom classes for each tab trigger */
  triggerClass?: string
  class?: string
  children: JSX.Element
}

const Item = (props: TabItemProps): JSX.Element => {
  return {
    $$tabItem: true,
    get value() { return props.value },
    get trigger() { return props.trigger },
    get disabled() { return props.disabled },
    get content() { return props.children },
  } as unknown as JSX.Element
}

const TabsRoot = (props: TabsProps) => {
  const [local, others] = splitProps(props, [
    'value',
    'defaultValue',
    'onChange',
    'orientation',
    'indicatorColor',
    'navigationOnly',
    'listClass',
    'triggerClass',
    'class',
    'children',
  ])

  const resolved = children(() => local.children)
  const items = () =>
    resolved.toArray().filter((c: any) => c?.$$tabItem) as unknown as TabItemData[]

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
          !local.listClass && (isVertical()
            ? 'flex-col border-r border-border pr-4'
            : 'flex-row border-b border-border'),
          local.listClass
        )}
      >
        <For each={items()}>
          {(item) => (
            <KobalteTabs.Trigger
              value={item.value}
              disabled={item.disabled}
              class={cn(
                // Default styles (applied when no triggerClass override)
                !local.triggerClass && 'px-4 py-2 text-sm font-medium',
                'transition-colors',
                'text-text-secondary hover:text-text',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
                'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
                // Selected styles - use CSS variable when indicatorColor is set
                local.indicatorColor
                  ? 'data-[selected]:text-[var(--indicator-color)]'
                  : 'data-[selected]:text-primary-500',
                // Border indicator
                isVertical()
                  ? cn(
                      'text-left border-r-2 border-transparent -mr-px',
                      local.indicatorColor
                        ? 'data-[selected]:border-r-[var(--indicator-color)]'
                        : 'data-[selected]:border-r-primary-500'
                    )
                  : cn(
                      'border-b-2 border-transparent -mb-px',
                      local.indicatorColor
                        ? 'data-[selected]:border-b-[var(--indicator-color)]'
                        : 'data-[selected]:border-b-primary-500'
                    ),
                local.triggerClass
              )}
              style={local.indicatorColor ? {
                '--indicator-color': local.indicatorColor,
              } as any : undefined}
            >
              {item.trigger}
            </KobalteTabs.Trigger>
          )}
        </For>
      </KobalteTabs.List>

      {!local.navigationOnly && (
        <For each={items()}>
          {(item) => (
            <KobalteTabs.Content value={item.value} class="flex-1 outline-none">
              {item.content}
            </KobalteTabs.Content>
          )}
        </For>
      )}
    </KobalteTabs>
  )
}

export const Tabs = Object.assign(TabsRoot, { Item })
