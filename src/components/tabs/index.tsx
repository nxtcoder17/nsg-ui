import { Tabs as KobalteTabs } from '@kobalte/core/tabs'
import { splitProps, JSX, For, children } from 'solid-js'
import { cn } from '../../utils/cn'

/** @deprecated Use @utility nsg-tabs-* in CSS instead */
export const tabsStyles = {
  list: 'nsg-tabs-list',
  listVertical: 'nsg-tabs-list-vertical',
  trigger: 'nsg-tabs-trigger',
  triggerSelected: 'data-[selected]:text-primary-500',
  triggerSelectedBorderBottom: 'border-b-2 border-transparent -mb-px data-[selected]:border-b-primary-500',
  triggerSelectedBorderRight: 'text-left border-r-2 border-transparent -mr-px data-[selected]:border-r-primary-500',
}

// ============================================================================
// Types
// ============================================================================

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
  indicatorColor?: string
  navigationOnly?: boolean
  listClass?: string
  triggerClass?: string
  class?: string
  children: JSX.Element
}

// ============================================================================
// Components
// ============================================================================

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
          isVertical() ? 'flex-col' : 'flex-row',
          !local.listClass && (isVertical()
            ? 'nsg-tabs-list-vertical'
            : 'nsg-tabs-list'),
          local.listClass
        )}
      >
        <For each={items()}>
          {(item) => (
            <KobalteTabs.Trigger
              value={item.value}
              disabled={item.disabled}
              class={cn(
                !local.triggerClass && 'nsg-tabs-trigger',
                'transition-colors',
                'text-text-secondary hover:text-text',
                'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
                local.indicatorColor
                  ? 'data-[selected]:text-[var(--indicator-color)]'
                  : tabsStyles.triggerSelected,
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
