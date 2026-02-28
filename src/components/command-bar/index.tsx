import { type JSX, splitProps, createSignal, createEffect, For, Show, onMount, onCleanup, createMemo, children } from 'solid-js'
import { Dialog as KobalteDialog } from '@kobalte/core/dialog'
import { cn } from '../../utils/cn'
import { SearchIcon } from '../../icons'

// ============================================================================
// Sentinel types
// ============================================================================

type CommandBarItemData = {
  $$commandBarItem: true
  id: string
  label: string
  icon?: (props: { class?: string }) => JSX.Element
  disabled?: boolean
  keywords?: string[]
}

type CommandBarGroupData = {
  $$commandBarGroup: true
  label: string
  children: JSX.Element
}

// ============================================================================
// Types
// ============================================================================

export type CommandBarItemState = {
  highlighted: boolean
  disabled: boolean
}

export type CommandBarProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onSelect: (id: string, label: string) => void
  placeholder?: string
  noResultsMessage?: string
  filterFn?: (item: { id: string; label: string; keywords?: string[] }, query: string) => boolean
  itemComponent?: (item: { id: string; label: string; icon?: (props: { class?: string }) => JSX.Element }, state: CommandBarItemState) => JSX.Element
  globalShortcut?: boolean
  class?: string
  children?: JSX.Element
}

type CommandBarItemProps = {
  id: string
  label: string
  icon?: (props: { class?: string }) => JSX.Element
  disabled?: boolean
  keywords?: string[]
}

type CommandBarGroupProps = {
  label: string
  children: JSX.Element
}

// ============================================================================
// Sub-components (sentinel objects)
// ============================================================================

const Item = (props: CommandBarItemProps): JSX.Element => {
  return {
    $$commandBarItem: true,
    get id() { return props.id },
    get label() { return props.label },
    get icon() { return props.icon },
    get disabled() { return props.disabled },
    get keywords() { return props.keywords },
  } as unknown as JSX.Element
}

const Group = (props: CommandBarGroupProps): JSX.Element => {
  return {
    $$commandBarGroup: true,
    get label() { return props.label },
    get children() { return props.children },
  } as unknown as JSX.Element
}

// ============================================================================
// Helpers
// ============================================================================

const defaultFilter = (item: { id: string; label: string; keywords?: string[] }, query: string): boolean => {
  const q = query.toLowerCase()
  if (item.label.toLowerCase().includes(q)) return true
  if (item.keywords?.some(k => k.toLowerCase().includes(q))) return true
  return false
}

/** Recursively extract CommandBarItemData from resolved children (handles Groups) */
function extractItems(resolved: any[]): CommandBarItemData[] {
  const items: CommandBarItemData[] = []
  for (const child of resolved) {
    if (child?.$$commandBarItem) {
      items.push(child as unknown as CommandBarItemData)
    } else if (child?.$$commandBarGroup) {
      const group = child as unknown as CommandBarGroupData
      const groupResolved = children(() => group.children)
      const groupArr = groupResolved.toArray()
      for (const gc of groupArr) {
        if ((gc as any)?.$$commandBarItem) {
          items.push(gc as unknown as CommandBarItemData)
        }
      }
    }
  }
  return items
}

/** Build grouped entries from resolved children for rendering */
function buildGroupedEntries(
  resolved: any[],
  filteredIds: Set<string>
): ({ type: 'header'; label: string } | { type: 'item'; item: CommandBarItemData; flatIndex: number })[] {
  const entries: ({ type: 'header'; label: string } | { type: 'item'; item: CommandBarItemData; flatIndex: number })[] = []
  let flatIndex = 0

  for (const child of resolved) {
    if (child?.$$commandBarItem) {
      const item = child as unknown as CommandBarItemData
      if (filteredIds.has(item.id)) {
        entries.push({ type: 'item', item, flatIndex })
        flatIndex++
      }
    } else if (child?.$$commandBarGroup) {
      const group = child as unknown as CommandBarGroupData
      const groupResolved = children(() => group.children)
      const groupItems = groupResolved.toArray().filter((gc: any) => gc?.$$commandBarItem && filteredIds.has(gc.id)) as unknown as CommandBarItemData[]
      if (groupItems.length > 0) {
        entries.push({ type: 'header', label: group.label })
        for (const item of groupItems) {
          entries.push({ type: 'item', item, flatIndex })
          flatIndex++
        }
      }
    }
  }
  return entries
}

// ============================================================================
// Root Component
// ============================================================================

function CommandBarRoot(props: CommandBarProps): JSX.Element {
  const [local, others] = splitProps(props, [
    'open',
    'onOpenChange',
    'onSelect',
    'placeholder',
    'noResultsMessage',
    'filterFn',
    'itemComponent',
    'globalShortcut',
    'class',
    'children',
  ])

  const [query, setQuery] = createSignal('')
  const [highlightedIndex, setHighlightedIndex] = createSignal(0)
  let inputRef: HTMLInputElement | undefined
  let listRef: HTMLDivElement | undefined

  const resolved = children(() => local.children)
  const allItems = createMemo(() => extractItems(resolved.toArray()))

  const filterFn = () => local.filterFn ?? defaultFilter

  const filteredItems = createMemo(() => {
    const q = query().trim()
    const items = allItems()
    if (!q) return items.filter(i => !i.disabled)
    return items.filter(i => !i.disabled && filterFn()(i, q))
  })

  const filteredIds = createMemo(() => new Set(filteredItems().map(i => i.id)))

  const groupedEntries = createMemo(() => buildGroupedEntries(resolved.toArray(), filteredIds()))

  // Reset on close
  createEffect(() => {
    if (!local.open) {
      setQuery('')
      setHighlightedIndex(0)
    }
  })

  // Focus input when opened
  createEffect(() => {
    if (local.open) {
      setTimeout(() => inputRef?.focus(), 0)
    }
  })

  // Clamp highlighted index
  createEffect(() => {
    const items = filteredItems()
    if (highlightedIndex() >= items.length) {
      setHighlightedIndex(Math.max(0, items.length - 1))
    }
  })

  // Scroll highlighted item into view
  createEffect(() => {
    const idx = highlightedIndex()
    const el = listRef?.querySelector(`[data-index="${idx}"]`) as HTMLElement | null
    el?.scrollIntoView({ block: 'nearest' })
  })

  // Global Cmd+K shortcut
  onMount(() => {
    if (local.globalShortcut === false) return

    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        local.onOpenChange?.(!local.open)
      }
    }

    document.addEventListener('keydown', handler)
    onCleanup(() => document.removeEventListener('keydown', handler))
  })

  const handleKeyDown = (e: KeyboardEvent) => {
    const items = filteredItems()

    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        local.onOpenChange?.(false)
        break
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(i => (i + 1) % items.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(i => (i - 1 + items.length) % items.length)
        break
      case 'Enter':
        e.preventDefault()
        const item = items[highlightedIndex()]
        if (item) {
          local.onSelect(item.id, item.label)
          local.onOpenChange?.(false)
        }
        break
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
        <KobalteDialog.Overlay class="nsg-dialog" data-nsg-dialog="overlay" />
        <div class="nsg-dialog fixed inset-0 z-50 flex justify-center items-start pt-[15vh] pointer-events-none" data-nsg-dialog="positioner">
          <KobalteDialog.Content
            class={cn(
              'pointer-events-auto w-full max-w-lg mx-4',
              'shadow-xl',
              'data-[expanded]:animate-slide-up',
              'focus:outline-none',
              local.class
            )}
            data-nsg-dialog="content"
            aria-label="Command bar"
          >
            {/* Search input */}
            <div class="flex items-center gap-3 px-4 border-b border-border">
              <SearchIcon class="w-5 h-5 text-text-muted shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query()}
                onInput={(e) => {
                  setQuery(e.currentTarget.value)
                  setHighlightedIndex(0)
                }}
                onKeyDown={handleKeyDown}
                placeholder={local.placeholder ?? 'Search...'}
                class="nsg-command-bar-input"
              />
              <kbd class="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-text-muted bg-surface-sunken border border-border rounded">
                esc
              </kbd>
            </div>

            {/* Results list */}
            <div ref={listRef} class="max-h-72 overflow-y-auto p-2">
              <Show
                when={filteredItems().length > 0}
                fallback={
                  <div class="px-3 py-8 text-sm text-text-secondary text-center">
                    {local.noResultsMessage ?? 'No results found'}
                  </div>
                }
              >
                <For each={groupedEntries()}>
                  {(entry) => {
                    if (entry.type === 'header') {
                      return (
                        <div class="nsg-command-bar-group-header">
                          {entry.label}
                        </div>
                      )
                    }

                    const isHighlighted = () => entry.flatIndex === highlightedIndex()
                    const state = () => ({
                      highlighted: isHighlighted(),
                      disabled: entry.item.disabled ?? false,
                    })

                    return (
                      <button
                        type="button"
                        data-index={entry.flatIndex}
                        class={cn(
                          'nsg-command-bar-item',
                          isHighlighted()
                            ? 'nsg-command-bar-item-highlighted'
                            : 'nsg-command-bar-item-default',
                        )}
                        onMouseEnter={() => setHighlightedIndex(entry.flatIndex)}
                        onClick={() => {
                          local.onSelect(entry.item.id, entry.item.label)
                          local.onOpenChange?.(false)
                        }}
                      >
                        <Show when={local.itemComponent} fallback={
                          <>
                            <Show when={entry.item.icon}>
                              {(Icon) => {
                                const IconComponent = Icon()
                                return <IconComponent class={cn('w-5 h-5', isHighlighted() ? 'text-primary-600' : 'text-text-muted')} />
                              }}
                            </Show>
                            <span>{entry.item.label}</span>
                          </>
                        }>
                          {local.itemComponent!(entry.item, state())}
                        </Show>
                      </button>
                    )
                  }}
                </For>
              </Show>
            </div>

            {/* Footer */}
            <div class="nsg-command-bar-footer">
              <span class="flex items-center gap-1.5">
                <kbd class="px-1.5 py-0.5 bg-surface-sunken border border-border rounded font-medium">&uarr;</kbd>
                <kbd class="px-1.5 py-0.5 bg-surface-sunken border border-border rounded font-medium">&darr;</kbd>
                <span>to navigate</span>
              </span>
              <span class="flex items-center gap-1.5">
                <kbd class="px-1.5 py-0.5 bg-surface-sunken border border-border rounded font-medium">&crarr;</kbd>
                <span>to select</span>
              </span>
            </div>
          </KobalteDialog.Content>
        </div>
      </KobalteDialog.Portal>
    </KobalteDialog>
  )
}

// ============================================================================
// Export
// ============================================================================

export const CommandBar = Object.assign(CommandBarRoot, { Item, Group })
