import { Component, createSignal, Show } from 'solid-js'
import { Card } from 'nsg-ui'

interface CodeBlockProps {
  code: string
  language?: string
}

export const CodeBlock: Component<CodeBlockProps> = (props) => {
  const [copied, setCopied] = createSignal(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(props.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div class="relative group">
      <pre class="bg-neutral-900 text-neutral-100 rounded-lg p-4 overflow-x-auto text-sm font-mono">
        <code>{props.code}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        class="absolute top-2 right-2 px-2 py-1 rounded text-xs bg-neutral-700 text-neutral-300 hover:bg-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied() ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}

interface DemoWithCodeProps {
  title: string
  description?: string
  code: string
  children: any
}

export const DemoWithCode: Component<DemoWithCodeProps> = (props) => {
  const [showCode, setShowCode] = createSignal(false)

  return (
    <Card class="group hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
      <div class="px-6 py-4 border-b border-border-subtle flex items-center justify-between">
        <div>
          <h3 class="font-semibold text-text text-[15px]">{props.title}</h3>
          {props.description && (
            <p class="text-text-muted text-sm mt-1">{props.description}</p>
          )}
        </div>
        <button
          onClick={() => setShowCode(!showCode())}
          class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border border-border hover:bg-neutral-100 text-text-secondary transition-colors"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          {showCode() ? 'Hide' : 'Code'}
        </button>
      </div>

      <div class="p-6 demo-pattern">
        {props.children}
      </div>

      <Show when={showCode()}>
        <div class="border-t border-border-subtle">
          <CodeBlock code={props.code} />
        </div>
      </Show>
    </Card>
  )
}
