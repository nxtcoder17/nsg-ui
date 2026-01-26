import { type JSX, splitProps, createSignal, createEffect, For, Show, onMount, onCleanup } from 'solid-js'
import { cn } from '../../utils/cn'
import { SearchIcon } from '../../icons'
import { Dialog } from '../dialog'

export type CommandBarItem = {
  id: string
  label: string
  icon?: (props: { class?: string }) => JSX.Element
  disabled?: boolean
  keywords?: string[]
}

export type CommandBarItemState = {
  highlighted: boolean
  disabled: boolean
}

export type CommandBarProps<T extends CommandBarItem> = {
  items: T[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onSelect: (item: T) => void
  placeholder?: string
  noResultsMessage?: string
  filterFn?: (item: T, query: string) => boolean
  itemComponent?: (item: T, state: CommandBarItemState) => JSX.Element
  globalShortcut?: boolean
  class?: string
}

const defaultFilter = <T extends CommandBarItem>(item: T, query: string): boolean => {
  const q = query.toLowerCase()
  if (item.label.toLowerCase().includes(q)) return true
  if (item.keywords?.some(k => k.toLowerCase().includes(q))) return true
  return false
}

export function CommandBar<T extends CommandBarItem>(props: CommandBarProps<T>): JSX.Element {
  const [local, others] = splitProps(props, [
    'items',
    'open',
    'onOpenChange',
    'onSelect',
    'placeholder',
    'noResultsMessage',
    'filterFn',
    'itemComponent',
    'globalShortcut',
    'class',
  ])

  const [query, setQuery] = createSignal('')
  const [highlightedIndex, setHighlightedIndex] = createSignal(0)
  let inputRef: HTMLInputElement | undefined

  const filterFn = () => local.filterFn ?? defaultFilter

  const filteredItems = () => {
    const q = query().trim()
    if (!q) return local.items.filter(i => !i.disabled)
    return local.items.filter(i => !i.disabled && filterFn()(i, q))
  }

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

  // Clamp highlighted index when filtered items change
  createEffect(() => {
    const items = filteredItems()
    if (highlightedIndex() >= items.length) {
      setHighlightedIndex(Math.max(0, items.length - 1))
    }
  })

  // Global Cmd+K shortcut handler
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
          local.onSelect(item)
          local.onOpenChange?.(false)
        }
        break
    }
  }

  return (
    <Dialog
      show={local.open}
      onChange={local.onOpenChange}
      position="top"
      aria-label="Command bar"
      contentClass={cn('shadow-xl', local.class)}
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
          class={cn(
            'flex-1 h-12 text-sm bg-transparent',
            'text-text placeholder:text-text-muted',
            'focus:outline-none'
          )}
        />
        <kbd class="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-text-muted bg-surface-sunken border border-border rounded">
          esc
        </kbd>
      </div>

      {/* Results list */}
      <div class="max-h-72 overflow-y-auto p-2">
        <Show
          when={filteredItems().length > 0}
          fallback={
            <div class="px-3 py-8 text-sm text-text-secondary text-center">
              {local.noResultsMessage ?? 'No results found'}
            </div>
          }
        >
          <For each={filteredItems()}>
            {(item, index) => {
              const isHighlighted = () => index() === highlightedIndex()
              const state = () => ({
                highlighted: isHighlighted(),
                disabled: item.disabled ?? false,
              })

              return (
                <button
                  type="button"
                  class={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-left',
                    'transition-colors duration-75',
                    isHighlighted()
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-text hover:bg-surface-sunken'
                  )}
                  onMouseEnter={() => setHighlightedIndex(index())}
                  onClick={() => {
                    local.onSelect(item)
                    local.onOpenChange?.(false)
                  }}
                >
                  <Show when={local.itemComponent} fallback={
                    <>
                      <Show when={item.icon}>
                        {(Icon) => {
                          const IconComponent = Icon()
                          return <IconComponent class={cn('w-5 h-5', isHighlighted() ? 'text-primary-600' : 'text-text-muted')} />
                        }}
                      </Show>
                      <span>{item.label}</span>
                    </>
                  }>
                    {local.itemComponent!(item, state())}
                  </Show>
                </button>
              )
            }}
          </For>
        </Show>
      </div>

      {/* Footer with keyboard hints */}
      <div class="flex items-center gap-4 px-4 py-2.5 border-t border-border text-xs text-text-muted">
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
    </Dialog>
  )
}
