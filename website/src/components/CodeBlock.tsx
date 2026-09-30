import { type Component, createSignal, Show } from 'solid-js'
import { Button, Card } from 'nsg-ui'
import { Editor } from 'solid-prism-editor'
import 'solid-prism-editor/prism/languages/tsx'
import 'solid-prism-editor/prism/languages/bash'
import 'solid-prism-editor/prism/languages/css'
import 'solid-prism-editor/layout.css'
import '../styles/prism-editor-theme.css'

interface CodeBlockProps {
  code: string
  language?: string
  /** The gutter costs ~28px of inset per line, so it is opt-in per block. */
  lineNumbers?: boolean
  /** Wrapping reflows indentation, so it is opt-in for the blocks whose lines
   * are a command to copy rather than code to read. */
  wrap?: boolean
}

export const CodeBlock: Component<CodeBlockProps> = (props) => {
  const [copied, setCopied] = createSignal(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(props.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div class="relative group min-w-0">
      <div
        class="overflow-hidden [&_.prism-code-editor]:!text-sm [&_.prism-code-editor]:!p-0 [&_.prism-code-editor]:!pt-1.5 [&_.prism-code-editor]:!pb-1.5"
        data-line-numbers={props.lineNumbers ? '' : undefined}
      >
        <Editor
          language={props.language ?? 'tsx'}
          value={props.code}
          readOnly
          lineNumbers={props.lineNumbers ?? false}
          wordWrap={props.wrap ?? false}
          tabSize={2}
          insertSpaces
          /* The editor renders a real (read-only) `<textarea>`, and a form control
           * with no accessible name fails the `label` audit. It is display code,
           * so it is named for what it shows. */
          onMount={(editor) =>
            editor.textarea.setAttribute(
              'aria-label',
              `${props.language ?? 'tsx'} code sample`,
            )
          }
        />
      </div>
      <Button
        onClick={copyToClipboard}
        kind="secondary"
        size="sm"
        class="absolute top-1.5 right-1.5 z-10 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
      >
        {copied() ? 'Copied!' : 'Copy'}
      </Button>
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
    <Card class="p-0 group hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
      <div class="px-6 py-4 border-b border-border-subtle flex items-center justify-between">
        <div>
          <h3 class="font-semibold text-text text-[15px]">{props.title}</h3>
          {props.description && (
            <p class="text-text-muted text-sm mt-1">{props.description}</p>
          )}
        </div>
        <Button
          onClick={() => setShowCode(!showCode())}
          kind="secondary"
          size="sm"
          class="gap-1.5"
          aria-expanded={showCode()}
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          {showCode() ? 'Hide' : 'Code'}
        </Button>
      </div>

      <div class="p-6 demo-pattern">
        {props.children}
      </div>

      <Show when={showCode()}>
        {/* Matches the card's own inset, so the revealed sample lines up with
            the demo above it rather than running into the border. */}
        <div class="border-t border-border-subtle px-6 py-4">
          <CodeBlock code={props.code} />
        </div>
      </Show>
    </Card>
  )
}
