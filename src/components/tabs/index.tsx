import { Tabs as KobalteTabs } from '@kobalte/core/tabs'
import { splitProps, JSX, For, createContext, useContext, onMount, onCleanup, createSignal } from 'solid-js'
import { cn } from '../../utils/cn'

type TabItemData = {
  ref: HTMLSpanElement
  value: string
  trigger: JSX.Element
  disabled?: boolean
  content: JSX.Element
}

type TabsContextValue = {
  register: (item: TabItemData) => void
  unregister: (value: string) => void
}

const TabsContext = createContext<TabsContextValue>()

export type TabItemProps = {
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
  navigationOnly?: boolean
  unstyled?: boolean
  class?: string
  children: JSX.Element
}

function Item(props: TabItemProps) {
  const ctx = useContext(TabsContext)
  let ref!: HTMLSpanElement

  onMount(() => {
    ctx?.register({
      ref,
      get value() { return props.value },
      get trigger() { return props.trigger },
      get disabled() { return props.disabled },
      get content() { return props.children },
    })
  })

  onCleanup(() => ctx?.unregister(props.value))

  // Hidden marker — its DOM position determines tab order
  return <span ref={ref} data-tabs-item-marker style="display:none" />
}

const TabsRoot = (props: TabsProps) => {
  const [local, others] = splitProps(props, [
    'value',
    'defaultValue',
    'onChange',
    'orientation',
    'navigationOnly',
    'unstyled',
    'class',
    'children',
  ])

  const [items, setItems] = createSignal<TabItemData[]>([])

  const ctx: TabsContextValue = {
    register: (item) => {
      setItems(prev => {
        const all = [...prev, item]
        // Sort by current DOM position — correct even when Show inserts mid-list
        const markers = Array.from(
          item.ref.parentElement?.querySelectorAll('[data-tabs-item-marker]') ?? []
        )
        return all.sort((a, b) => markers.indexOf(a.ref) - markers.indexOf(b.ref))
      })
    },
    unregister: (value) =>
      setItems(prev => prev.filter(i => i.value !== value)),
  }

  return (
    <TabsContext.Provider value={ctx}>
      {/* Hidden container — Items render markers here to establish DOM order */}
      <div data-tabs-items style="display:none">
        {local.children}
      </div>
      <KobalteTabs
        value={local.value}
        defaultValue={local.defaultValue}
        onChange={local.onChange}
        orientation={local.orientation}
        class={cn(!local.unstyled && 'nsg-tabs', local.class)}
        {...others}
      >
        <KobalteTabs.List
          {...(!local.unstyled && { 'data-nsg-tabs': 'list' })}
        >
          <For each={items()}>
            {(item) => (
              <KobalteTabs.Trigger
                value={item.value}
                disabled={item.disabled}
                {...(!local.unstyled && { 'data-nsg-tabs': 'trigger' })}
              >
                {item.trigger}
              </KobalteTabs.Trigger>
            )}
          </For>
        </KobalteTabs.List>

        {!local.navigationOnly && (
          <For each={items()}>
            {(item) => (
              <KobalteTabs.Content
                value={item.value}
                {...(!local.unstyled && { 'data-nsg-tabs': 'content' })}
              >
                {item.content}
              </KobalteTabs.Content>
            )}
          </For>
        )}
      </KobalteTabs>
    </TabsContext.Provider>
  )
}

export const Tabs = Object.assign(TabsRoot, { Item })
