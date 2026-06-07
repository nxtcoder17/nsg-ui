import { type JSX, splitProps, mergeProps, createSignal, createEffect, For, Show, onCleanup, createMemo } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { Dialog as KobalteDialog } from '@kobalte/core/dialog'
import { SearchIcon } from '../../icons'

export interface CommandBarItemState {
  highlighted: boolean
  disabled: boolean
}

export interface Value {
  id: string
  label: string
  description: string // Used for text search/filtering
  group?: string
  icon?: (props: { class?: string }) => JSX.Element
  render?: (state: CommandBarItemState) => JSX.Element
  disabled?: boolean
}

export type CommandBarProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (id: string, label: string) => void
  values: Value[]

  placeholder?: string
  groupsOrder?: string[]
  noResultsFallback?: JSX.Element
  filterFn?: (item: Value, query: string) => boolean
  globalShortcut?: boolean
}

type CommandBarEntry =
  | { type: 'header'; label: string }
  | { type: 'item'; item: Value; flatIndex: number }

const defaultFilter = (item: Value, query: string): boolean => {
  const q = query.toLowerCase()
  return (
    item.label.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q)
  )
}

type ItemProps = {
  item: Value
  flatIndex: number
  highlightedIndex: number
  setHighlightedIndex: (index: number) => void
  onSelect: (id: string, label: string) => void
  onOpenChange: (open: boolean) => void
}

function Item(props: ItemProps): JSX.Element {
  const isHighlighted = () => props.flatIndex === props.highlightedIndex
  const state = () => ({
    highlighted: isHighlighted(),
    disabled: props.item.disabled ?? false,
  })

  return (
    <button
      type="button"
      disabled={props.item.disabled}
      data-index={props.flatIndex}
      data-nsg-command-bar="item"
      data-highlighted={isHighlighted() ? '' : undefined}
      data-disabled={props.item.disabled ? '' : undefined}
      onMouseEnter={() => !props.item.disabled && props.setHighlightedIndex(props.flatIndex)}
      onClick={() => {
        if (props.item.disabled) return
        props.onSelect(props.item.id, props.item.label)
        props.onOpenChange(false)
      }}
    >
      <Show when={props.item.render} fallback={
        <>
          <Show when={props.item.icon}>
            {(Icon) => (
              <Dynamic
                component={Icon()}
                class="nsg-command-bar-item-icon"
              />
            )}
          </Show>
          <span>{props.item.label}</span>
        </>
      }>
        {props.item.render!(state())}
      </Show>
    </button>
  )
}

type InputProps = {
  ref: HTMLInputElement | undefined | ((el: HTMLInputElement) => void)
  value: string
  onInput: (val: string) => void
  onKeyDown: (e: KeyboardEvent) => void
  placeholder?: string
}

function Input(props: InputProps): JSX.Element {
  return (
    <div data-nsg-command-bar="search-wrapper">
      <SearchIcon class="nsg-command-bar-search-icon" />
      <input
        ref={props.ref}
        type="text"
        value={props.value}
        onInput={(e) => props.onInput(e.currentTarget.value)}
        onKeyDown={props.onKeyDown}
        placeholder={props.placeholder}
        data-nsg-command-bar="input"
      />
      <kbd data-nsg-command-bar="shortcut">
        esc
      </kbd>
    </div>
  )
}

type ListProps = {
  ref: HTMLDivElement | undefined | ((el: HTMLDivElement) => void)
  entries: CommandBarEntry[]
  flatItemsCount: number
  highlightedIndex: number
  setHighlightedIndex: (idx: number) => void
  onSelect: (id: string, label: string) => void
  onOpenChange: (open: boolean) => void
  noResultsFallback?: JSX.Element
}

function List(props: ListProps): JSX.Element {
  return (
    <div ref={props.ref} data-nsg-command-bar="list">
      <Show
        when={props.flatItemsCount > 0}
        fallback={
          <div data-nsg-command-bar="list-empty">
            {props.noResultsFallback}
          </div>
        }
      >
        <For each={props.entries}>
          {(entry) => {
            if (entry.type === 'header') {
              return (
                <div data-nsg-command-bar="group-header">
                  {entry.label}
                </div>
              )
            }

            return (
              <Item
                item={entry.item}
                flatIndex={entry.flatIndex}
                highlightedIndex={props.highlightedIndex}
                setHighlightedIndex={props.setHighlightedIndex}
                onSelect={props.onSelect}
                onOpenChange={props.onOpenChange}
              />
            )
          }}
        </For>
      </Show>
    </div>
  )
}

function Footer(): JSX.Element {
  return (
    <div data-nsg-command-bar="footer">
      <span>
        <kbd>&uarr;</kbd>
        <kbd>&darr;</kbd>
        <span>to navigate</span>
      </span>
      <span>
        <kbd>&crarr;</kbd>
        <span>to select</span>
      </span>
    </div>
  )
}

export function CommandBar(props: CommandBarProps): JSX.Element {
  const merged = mergeProps(
    {
      placeholder: 'Search...',
      noResultsFallback: <span>No results found</span>,
      globalShortcut: true,
      filterFn: defaultFilter,
    },
    props
  )

  const [local, others] = splitProps(merged, [
    'open',
    'onOpenChange',
    'onSelect',
    'values',
    'placeholder',
    'groupsOrder',
    'noResultsFallback',
    'filterFn',
    'globalShortcut',
  ])

  const [search, setSearch] = createSignal('')
  const [highlightedIndex, setHighlightedIndex] = createSignal(0)

  let inputRef: HTMLInputElement | undefined
  let listRef: HTMLDivElement | undefined

  const processedData = createMemo(() => {
    const q = search().trim()
    const filtered = q 
      ? local.values.filter(i => local.filterFn(i, q))
      : local.values

    // 1. Group items
    const groupsMap = new Map<string, Value[]>()
    const ungrouped: Value[] = []
    
    for (const item of filtered) {
      if (item.group) {
        if (!groupsMap.has(item.group)) {
          groupsMap.set(item.group, [])
        }
        groupsMap.get(item.group)!.push(item)
      } else {
        ungrouped.push(item)
      }
    }

    // 2. Determine group ordering
    const orderedGroupNames = local.groupsOrder || []
    const allGroupNames = [...orderedGroupNames]
    for (const g of groupsMap.keys()) {
      if (!allGroupNames.includes(g)) {
        allGroupNames.push(g)
      }
    }

    // 3. Build visual entries and flat items list
    const entries: CommandBarEntry[] = []
    const flatItems: Value[] = []
    let flatIndex = 0

    // Ungrouped items first
    for (const item of ungrouped) {
      entries.push({ type: 'item', item, flatIndex })
      flatItems.push(item)
      flatIndex++
    }

    // Grouped items
    for (const groupName of allGroupNames) {
      const groupItems = groupsMap.get(groupName) || []
      if (groupItems.length > 0) {
        entries.push({ type: 'header', label: groupName })
        for (const item of groupItems) {
          entries.push({ type: 'item', item, flatIndex })
          flatItems.push(item)
          flatIndex++
        }
      }
    }

    return { entries, flatItems }
  })

  // Keep highlighted entry in command bar's view
  createEffect(() => {
    const items = processedData().flatItems
    const idx = highlightedIndex()

    if (idx >= items.length) {
      const newIdx = Math.max(0, items.length - 1)
      setHighlightedIndex(newIdx)
    }

    const currentIdx = highlightedIndex()
    const el = listRef?.querySelector(`[data-index="${currentIdx}"]`) as HTMLElement | null
    el?.scrollIntoView({ block: 'nearest' })
  })

  // Global keyboard shortcut handler (Cmd/Ctrl+K)
  createEffect(() => {
    if (!local.globalShortcut) return

    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault()
        local.onOpenChange(!local.open)
      }
    }

    document.addEventListener('keydown', handler)
    onCleanup(() => document.removeEventListener('keydown', handler))
  })

  const handleKeyDown = (e: KeyboardEvent) => {
    const items = processedData().flatItems
    const len = items.length

    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        local.onOpenChange(false)
        break
      case 'ArrowDown': {
        e.preventDefault()
        if (len === 0) break
        let nextIdx = highlightedIndex()
        do {
          nextIdx = (nextIdx + 1) % len
        } while (items[nextIdx].disabled && nextIdx !== highlightedIndex())
        setHighlightedIndex(nextIdx)
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        if (len === 0) break
        let prevIdx = highlightedIndex()
        do {
          prevIdx = (prevIdx - 1 + len) % len
        } while (items[prevIdx].disabled && prevIdx !== highlightedIndex())
        setHighlightedIndex(prevIdx)
        break
      }
      case 'Enter': {
        e.preventDefault()
        const item = items[highlightedIndex()]
        if (item && !item.disabled) {
          local.onSelect(item.id, item.label)
          local.onOpenChange(false)
        }
        break
      }
    }
  }

  return (
    <KobalteDialog
      open={local.open}
      onOpenChange={local.onOpenChange}
      modal
      preventScroll
    >
      <KobalteDialog.Portal>
        <KobalteDialog.Overlay
          class="nsg-command-bar-overlay"
          data-nsg-command-bar="overlay"
        />
         <div
          class="nsg-command-bar-positioner"
          data-nsg-command-bar="positioner"
        >
          <KobalteDialog.Content
            class="nsg-command-bar"
            data-nsg-command-bar="content"
            aria-label="Command bar"
          >
            <Input
              ref={inputRef}
              value={search()}
              onInput={(val) => {
                setSearch(val)
                setHighlightedIndex(0)
              }}
              onKeyDown={handleKeyDown}
              placeholder={local.placeholder}
            />

            <List
              ref={listRef}
              entries={processedData().entries}
              flatItemsCount={processedData().flatItems.length}
              highlightedIndex={highlightedIndex()}
              setHighlightedIndex={setHighlightedIndex}
              onSelect={local.onSelect}
              onOpenChange={local.onOpenChange}
              noResultsFallback={local.noResultsFallback}
            />

            <Footer />
          </KobalteDialog.Content>
        </div>
      </KobalteDialog.Portal>
    </KobalteDialog>
  )
}
