import { Component, createSignal, onMount, For, Show } from 'solid-js'
import { Editor } from 'solid-prism-editor'
import { basicSetup } from 'solid-prism-editor/setups'
import 'solid-prism-editor/prism/languages/css'
import 'solid-prism-editor/layout.css'
import '../styles/prism-editor-theme.css'
import type { PrismEditor } from 'solid-prism-editor/types'
import { utilityRegistry } from '../data/utilityRegistry'

export const CssEditorPanel: Component = () => {
  const [isOpen, setIsOpen] = createSignal(
    localStorage.getItem('nsg-theme-editor-open') === 'true'
  )
  const [cssContent, setCssContent] = createSignal('')
  const [expandedGroups, setExpandedGroups] = createSignal<Set<string>>(new Set())
  const [copiedName, setCopiedName] = createSignal<string | null>(null)

  let debounceTimer: ReturnType<typeof setTimeout> | undefined
  let editorRef: PrismEditor | undefined

  onMount(async () => {
    try {
      const res = await fetch('/__nsg/css-editor')
      const data = await res.json()
      if (data.content) {
        setCssContent(data.content)
        if (editorRef) {
          editorRef.textarea.value = data.content
          editorRef.update()
        }
      }
    } catch {}
  })

  const toggleOpen = () => {
    const next = !isOpen()
    setIsOpen(next)
    localStorage.setItem('nsg-theme-editor-open', String(next))
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

  const handleReset = () => {
    setCssContent('')
    postContent('')
    if (editorRef) {
      editorRef.textarea.value = ''
      editorRef.update()
    }
  }

  const insertUtility = async (name: string, defaults: string) => {
    try {
      await navigator.clipboard.writeText(defaults)
      setCopiedName(name)
      setTimeout(() => setCopiedName(null), 1500)
    } catch {}

    const current = cssContent()
    if (current.includes(`@utility ${name}`)) return

    const updated = current ? `${current.trimEnd()}\n\n${defaults}\n` : `${defaults}\n`
    setCssContent(updated)
    postContent(updated)
    if (editorRef) {
      editorRef.textarea.value = updated
      editorRef.update()
    }
  }

  return (
    <>
      <button
        onClick={toggleOpen}
        class="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary-600 dark:bg-primary-400 text-white shadow-lg hover:bg-primary-700 dark:hover:bg-primary-500 transition-colors text-sm font-medium"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        Theme Editor
      </button>

      <Show when={isOpen()}>
        <div class="fixed top-0 right-0 h-full w-[32rem] z-40 bg-surface-raised border-l border-border shadow-2xl flex flex-col">
          {/* Header */}
          <div class="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
            <h2 class="text-sm font-semibold text-text">Theme Editor</h2>
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
                              onClick={() => insertUtility(util.name, util.defaults)}
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
          <div class="flex flex-col border-t border-border min-h-0" style={{ flex: '1 1 50%' }}>
            <div class="px-4 py-2 text-xs font-medium text-text-secondary shrink-0">
              Custom CSS (overrides.css)
            </div>
            <div class="flex-1 min-h-0 mx-2 mb-2 rounded-md border border-border overflow-auto">
              <Editor
                language="css"
                value=""
                wordWrap={true}
                tabSize={2}
                insertSpaces={true}
                extensions={basicSetup}
                onMount={(editor) => { editorRef = editor }}
                onUpdate={(value) => {
                  setCssContent(value)
                  postContent(value)
                }}
              />
            </div>
          </div>
        </div>
      </Show>
    </>
  )
}
