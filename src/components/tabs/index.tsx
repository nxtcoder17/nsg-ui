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
          isVertical()
            ? 'flex-col border-r border-border pr-4'
            : 'flex-row border-b border-border'
        )}
      >
        <For each={items()}>
          {(item) => (
            <KobalteTabs.Trigger
              value={item.value}
              disabled={item.disabled}
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
              {item.trigger}
            </KobalteTabs.Trigger>
          )}
        </For>
      </KobalteTabs.List>

      <For each={items()}>
        {(item) => (
          <KobalteTabs.Content value={item.value} class="flex-1 outline-none">
            {item.content}
          </KobalteTabs.Content>
        )}
      </For>
    </KobalteTabs>
  )
}

export const Tabs = Object.assign(TabsRoot, { Item })
