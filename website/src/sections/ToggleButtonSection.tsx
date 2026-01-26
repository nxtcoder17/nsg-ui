import { Component, createSignal } from 'solid-js'
import { ToggleButton } from 'nsg-ui'
import { DemoCard } from '../components/DemoCard'

export function ToggleButtonIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="6" width="18" height="12" rx="6" />
      <circle cx="16" cy="12" r="3" fill="currentColor" />
    </svg>
  )
}

const BoldIcon = () => (
  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
  </svg>
)

const ItalicIcon = () => (
  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <line x1="19" y1="4" x2="10" y2="4" />
    <line x1="14" y1="20" x2="5" y2="20" />
    <line x1="15" y1="4" x2="9" y2="20" />
  </svg>
)

const UnderlineIcon = () => (
  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
    <line x1="4" y1="21" x2="20" y2="21" />
  </svg>
)

const StarIcon = (props: { filled?: boolean }) => (
  <svg class="w-5 h-5" viewBox="0 0 24 24" fill={props.filled ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const HeartIcon = (props: { filled?: boolean }) => (
  <svg class="w-5 h-5" viewBox="0 0 24 24" fill={props.filled ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

export const ToggleButtonSection: Component = () => {
  const [bold, setBold] = createSignal(false)
  const [italic, setItalic] = createSignal(false)
  const [underline, setUnderline] = createSignal(false)
  const [starred, setStarred] = createSignal(false)
  const [liked, setLiked] = createSignal(false)

  return (
    <section id="toggle-button" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <ToggleButtonIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">Toggle Button</h2>
        </div>
        <p class="text-text-secondary ml-11">Two-state button that can be on (pressed) or off.</p>
      </div>

      <div class="grid gap-6">
        <DemoCard title="Basic" description="Simple toggle with text">
          <div class="flex gap-3">
            <ToggleButton pressed={bold()} onChange={setBold}>
              {bold() ? 'On' : 'Off'}
            </ToggleButton>
            <div class="text-sm text-text-secondary self-center">
              State: <span class="font-mono text-primary-500">{bold() ? 'pressed' : 'not pressed'}</span>
            </div>
          </div>
        </DemoCard>

        <DemoCard title="Variants" description="Different visual styles">
          <div class="flex gap-3">
            <ToggleButton variant="default">Default</ToggleButton>
            <ToggleButton variant="outline">Outline</ToggleButton>
            <ToggleButton variant="ghost">Ghost</ToggleButton>
          </div>
        </DemoCard>

        <DemoCard title="Sizes" description="Different button sizes">
          <div class="flex items-center gap-3">
            <ToggleButton size="sm">Small</ToggleButton>
            <ToggleButton size="md">Medium</ToggleButton>
            <ToggleButton size="lg">Large</ToggleButton>
          </div>
        </DemoCard>

        <DemoCard title="Icon Toggles" description="Common UI patterns">
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <span class="text-sm text-text-secondary w-20">Toolbar:</span>
              <div class="flex">
                <ToggleButton
                  pressed={bold()}
                  onChange={setBold}
                  variant="ghost"
                  size="icon"
                  class="rounded-r-none"
                >
                  <BoldIcon />
                </ToggleButton>
                <ToggleButton
                  pressed={italic()}
                  onChange={setItalic}
                  variant="ghost"
                  size="icon"
                  class="rounded-none border-x border-border"
                >
                  <ItalicIcon />
                </ToggleButton>
                <ToggleButton
                  pressed={underline()}
                  onChange={setUnderline}
                  variant="ghost"
                  size="icon"
                  class="rounded-l-none"
                >
                  <UnderlineIcon />
                </ToggleButton>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-sm text-text-secondary w-20">Favorite:</span>
              <ToggleButton
                pressed={starred()}
                onChange={setStarred}
                variant="ghost"
                size="icon"
                class="text-warning-500"
              >
                <StarIcon filled={starred()} />
              </ToggleButton>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-sm text-text-secondary w-20">Like:</span>
              <ToggleButton
                pressed={liked()}
                onChange={setLiked}
                variant="ghost"
                size="icon"
                class="text-danger-500"
              >
                <HeartIcon filled={liked()} />
              </ToggleButton>
            </div>
          </div>
        </DemoCard>

        <DemoCard title="Disabled" description="Non-interactive state">
          <div class="flex gap-3">
            <ToggleButton disabled>Disabled Off</ToggleButton>
            <ToggleButton disabled defaultPressed>Disabled On</ToggleButton>
          </div>
        </DemoCard>
      </div>
    </section>
  )
}
