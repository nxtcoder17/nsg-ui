import { Component, createSignal, onMount, For, Show } from 'solid-js'
import { utilityRegistry } from '../data/utilityRegistry'

export const CssEditorPanel: Component = () => {
  const [isOpen, setIsOpen] = createSignal(
    localStorage.getItem('nsg-css-editor-open') === 'true'
  )
  const [cssContent, setCssContent] = createSignal('')
  const [expandedGroups, setExpandedGroups] = createSignal<Set<string>>(new Set())
  const [copiedName, setCopiedName] = createSignal<string | null>(null)

  let debounceTimer: ReturnType<typeof setTimeout> | undefined

  onMount(async () => {
    try {
      const res = await fetch('/__nsg/css-editor')
      const data = await res.json()
      if (data.content) setCssContent(data.content)
    } catch {}
  })

  const toggleOpen = () => {
    const next = !isOpen()
    setIsOpen(next)
    localStorage.setItem('nsg-css-editor-open', String(next))
  }

  const toggleGroup = (name: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  const postContent = (content: string) => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      fetch('/__nsg/css-editor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      }).catch(() => {})
    }, 500)
  }

  const handleInput = (value: string) => {
    setCssContent(value)
    postContent(value)
  }

  const handleReset = () => {
    setCssContent('')
    postContent('')
  }

  const copyUtility = async (name: string, defaults: string) => {
    try {
      await navigator.clipboard.writeText(defaults)
      setCopiedName(name)
      setTimeout(() => setCopiedName(null), 1500)
    } catch {}
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={toggleOpen}
        class="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 transition-colors text-sm font-medium"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        CSS Editor
      </button>

      {/* Panel */}
      <Show when={isOpen()}>
        <div class="fixed top-0 right-0 h-full w-96 z-40 bg-surface-raised border-l border-border shadow-2xl flex flex-col">
          {/* Header */}
          <div class="flex items-center justify-between px-4 py-3 border-b border-border">
            <h2 class="text-sm font-semibold text-text">CSS Override Editor</h2>
            <div class="flex items-center gap-2">
              <button
                onClick={handleReset}
                class="px-2 py-1 text-xs rounded bg-danger-100 text-danger-700 hover:bg-danger-200 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={toggleOpen}
                class="p-1 rounded hover:bg-surface-sunken transition-colors text-text-secondary"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Utility Browser */}
          <div class="flex-1 overflow-y-auto min-h-0">
            <div class="p-2">
              <For each={utilityRegistry}>
                {(group) => (
                  <div class="mb-1">
                    <button
                      onClick={() => toggleGroup(group.component)}
                      class="w-full flex items-center justify-between px-2 py-1.5 text-xs font-semibold text-text-secondary hover:bg-surface-sunken rounded transition-colors"
                    >
                      <span>
                        {expandedGroups().has(group.component) ? '▾' : '▸'}{' '}
                        {group.component} ({group.utilities.length})
                      </span>
                    </button>
                    <Show when={expandedGroups().has(group.component)}>
                      <div class="ml-2">
                        <For each={group.utilities}>
                          {(util) => (
                            <button
                              onClick={() => copyUtility(util.name, util.defaults)}
                              class="w-full flex items-center justify-between px-2 py-1 text-xs font-mono text-text hover:bg-surface-sunken rounded transition-colors group"
                            >
                              <span class="truncate">.{util.name}</span>
                              <span class="text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                                {copiedName() === util.name ? 'Copied!' : 'copy'}
                              </span>
                            </button>
                          )}
                        </For>
                      </div>
                    </Show>
                  </div>
                )}
              </For>
            </div>
          </div>

          {/* Editor */}
          <div class="flex flex-col border-t border-border" style={{ height: '50%' }}>
            <div class="px-4 py-2 text-xs font-medium text-text-secondary">
              Custom CSS (overrides.css)
            </div>
            <textarea
              value={cssContent()}
              onInput={(e) => handleInput(e.currentTarget.value)}
              placeholder={`@utility nsg-accordion-trigger {\n  @apply px-8 py-6 text-lg font-bold;\n}`}
              class="flex-1 mx-2 mb-2 p-3 rounded-md bg-neutral-900 text-neutral-100 font-mono text-xs resize-none border border-neutral-700 focus:outline-none focus:border-primary-500 placeholder:text-neutral-600"
              spellcheck={false}
            />
          </div>
        </div>
      </Show>
    </>
  )
}
