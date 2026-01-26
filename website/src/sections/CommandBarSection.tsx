import { Component, createSignal, createMemo } from 'solid-js'
import { CommandBar } from 'nsg-ui'
import { Button } from 'nsg-ui'
import { DemoCard } from '../components/DemoCard'
import { sections } from '../components/Sidebar'

function CommandBarIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 8l4 4-4 4" />
      <line x1="13" y1="16" x2="17" y2="16" />
    </svg>
  )
}

export const CommandBarSection: Component = () => {
  const [open, setOpen] = createSignal(false)

  // Build items lazily to avoid circular dependency at module init
  const sectionItems = createMemo(() =>
    sections.map(s => ({
      id: s.id,
      label: s.label,
      icon: s.icon,
      keywords: [s.id.replace(/-/g, ' ')],
    }))
  )

  const handleSelect = (item: ReturnType<typeof sectionItems>[number]) => {
    const el = document.getElementById(item.id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="command-bar" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <CommandBarIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">CommandBar</h2>
        </div>
        <p class="text-text-secondary ml-11">Spotlight-style command palette for quick navigation and actions.</p>
      </div>

      <div class="grid gap-6">
        <DemoCard title="Global Shortcut" description="Press Cmd+K (Mac) or Ctrl+K (Windows/Linux) anywhere on this page">
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <Button onClick={() => setOpen(true)}>
                Open CommandBar
              </Button>
              <span class="text-sm text-text-secondary">
                or press{' '}
                <kbd class="px-1.5 py-0.5 text-xs font-medium bg-surface-sunken border border-border rounded">
                  {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}
                </kbd>
                {' + '}
                <kbd class="px-1.5 py-0.5 text-xs font-medium bg-surface-sunken border border-border rounded">
                  K
                </kbd>
              </span>
            </div>
            <p class="text-xs text-text-muted">
              The CommandBar is already active globally on this page. Try the shortcut now!
            </p>
          </div>

          <CommandBar
            items={sectionItems()}
            open={open()}
            onOpenChange={setOpen}
            onSelect={handleSelect}
            placeholder="Search components..."
            noResultsMessage="No components found"
          />
        </DemoCard>

        <DemoCard title="Features" description="Built-in keyboard navigation and filtering">
          <div class="text-sm text-text-secondary space-y-2">
            <p><strong class="text-text">Keyboard Navigation:</strong> Arrow keys to move, Enter to select, Escape to close</p>
            <p><strong class="text-text">Smart Filtering:</strong> Matches against label and optional keywords</p>
            <p><strong class="text-text">Custom Icons:</strong> Each item can have its own icon</p>
            <p><strong class="text-text">Customizable:</strong> Custom item rendering, filter function, and styling</p>
          </div>
        </DemoCard>
      </div>
    </section>
  )
}
