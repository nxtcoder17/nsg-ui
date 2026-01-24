import { Component, For } from 'solid-js'

const colorScales = [
  {
    name: 'Neutral',
    prefix: 'neutral',
    description: 'Backgrounds, text, borders',
  },
  {
    name: 'Primary',
    prefix: 'primary',
    description: 'Actions, links, focus states',
  },
  {
    name: 'Danger',
    prefix: 'danger',
    description: 'Destructive actions, errors',
  },
  {
    name: 'Success',
    prefix: 'success',
    description: 'Positive states, confirmations',
  },
  {
    name: 'Warning',
    prefix: 'warning',
    description: 'Cautions, pending states',
  },
]

const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']

function PaletteIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 1 0 20" fill="currentColor" opacity="0.3" />
      <circle cx="12" cy="8" r="2" fill="currentColor" />
      <circle cx="8" cy="14" r="2" fill="currentColor" />
      <circle cx="16" cy="14" r="2" fill="currentColor" />
    </svg>
  )
}

export const ColorPaletteSection: Component = () => {
  return (
    <section id="colors" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <PaletteIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">Color Palette</h2>
        </div>
        <p class="text-text-secondary ml-11">
          Built following Refactoring UI principles. Each scale has 11 shades (50-950).
        </p>
      </div>

      <div class="space-y-8">
        <For each={colorScales}>
          {(scale) => (
            <div class="bg-surface-raised rounded-xl border border-border shadow-[var(--shadow-card)] overflow-hidden">
              <div class="px-6 py-4 border-b border-border-subtle">
                <h3 class="font-semibold text-text text-[15px]">{scale.name}</h3>
                <p class="text-text-muted text-sm mt-0.5">{scale.description}</p>
              </div>
              <div class="p-4">
                <div class="grid grid-cols-11 gap-1">
                  <For each={shades}>
                    {(shade) => (
                      <div class="flex flex-col items-center">
                        <div
                          class="w-full aspect-square rounded-lg border border-border-subtle"
                          style={{ "background-color": `var(--color-${scale.prefix}-${shade})` }}
                        />
                        <span class="text-[10px] text-text-muted mt-1.5 font-mono">{shade}</span>
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </div>
          )}
        </For>

        {/* Usage Guide */}
        <div class="bg-surface-raised rounded-xl border border-border shadow-[var(--shadow-card)] overflow-hidden">
          <div class="px-6 py-4 border-b border-border-subtle">
            <h3 class="font-semibold text-text text-[15px]">Usage Guide</h3>
            <p class="text-text-muted text-sm mt-0.5">How to use the color scales effectively</p>
          </div>
          <div class="p-6 space-y-4">
            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-4 rounded-lg bg-neutral-50 border border-neutral-200">
                <h4 class="font-medium text-text text-sm mb-2">Light shades (50-200)</h4>
                <p class="text-text-secondary text-sm">Backgrounds, subtle fills, hover states</p>
                <div class="flex gap-2 mt-3">
                  <div class="px-3 py-1.5 rounded bg-primary-100 text-primary-700 text-xs font-medium">Alert bg</div>
                  <div class="px-3 py-1.5 rounded bg-success-100 text-success-700 text-xs font-medium">Success bg</div>
                </div>
              </div>

              <div class="p-4 rounded-lg bg-neutral-50 border border-neutral-200">
                <h4 class="font-medium text-text text-sm mb-2">Mid shades (300-500)</h4>
                <p class="text-text-secondary text-sm">Borders, icons, secondary UI elements</p>
                <div class="flex gap-2 mt-3">
                  <div class="px-3 py-1.5 rounded border-2 border-primary-400 text-primary-600 text-xs font-medium">Border</div>
                  <div class="px-3 py-1.5 rounded text-neutral-500 text-xs font-medium flex items-center gap-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clip-rule="evenodd" />
                    </svg>
                    Icon
                  </div>
                </div>
              </div>

              <div class="p-4 rounded-lg bg-neutral-50 border border-neutral-200">
                <h4 class="font-medium text-text text-sm mb-2">Base shades (500-600)</h4>
                <p class="text-text-secondary text-sm">Primary buttons, active states</p>
                <div class="flex gap-2 mt-3">
                  <button class="px-3 py-1.5 rounded bg-primary-500 text-primary-50 text-xs font-medium">Button</button>
                  <button class="px-3 py-1.5 rounded bg-danger-500 text-danger-50 text-xs font-medium">Danger</button>
                </div>
              </div>

              <div class="p-4 rounded-lg bg-neutral-50 border border-neutral-200">
                <h4 class="font-medium text-text text-sm mb-2">Dark shades (700-950)</h4>
                <p class="text-text-secondary text-sm">Text, headings, high-contrast elements</p>
                <div class="flex flex-col gap-1 mt-3">
                  <span class="text-neutral-900 text-sm font-semibold">Primary text (900)</span>
                  <span class="text-neutral-600 text-sm">Secondary text (600)</span>
                  <span class="text-primary-700 text-sm font-medium">Link text (700)</span>
                </div>
              </div>
            </div>

            <div class="p-4 rounded-lg bg-primary-50 border border-primary-200">
              <h4 class="font-medium text-primary-900 text-sm mb-1">Pro tip: Tinted text</h4>
              <p class="text-primary-700 text-sm">
                Use lighter shades of the background color for text (e.g., <code class="bg-primary-100 px-1 rounded text-xs">text-primary-50</code> on <code class="bg-primary-100 px-1 rounded text-xs">bg-primary-500</code>) instead of pure white for better visual harmony.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
