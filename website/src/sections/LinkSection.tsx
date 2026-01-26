import { Component } from 'solid-js'
import { Link } from 'nsg-ui'
import { DemoCard } from '../components/DemoCard'

export function LinkIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

export const LinkSection: Component = () => {
  return (
    <section id="link" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <LinkIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">Link</h2>
        </div>
        <p class="text-text-secondary ml-11">Styled anchor for navigation with accessibility support.</p>
      </div>

      <div class="grid gap-6">
        <DemoCard title="Variants" description="Different visual styles">
          <div class="flex flex-wrap gap-6">
            <Link href="#">Default link</Link>
            <Link href="#" variant="muted">Muted link</Link>
            <Link href="#" variant="danger">Danger link</Link>
          </div>
        </DemoCard>

        <DemoCard title="External Links" description="Opens in new tab with proper rel attributes">
          <div class="flex flex-wrap gap-6">
            <Link href="https://solidjs.com" external>
              SolidJS
            </Link>
            <Link href="https://kobalte.dev" external>
              Kobalte
            </Link>
            <Link href="https://tailwindcss.com" external>
              Tailwind CSS
            </Link>
          </div>
        </DemoCard>

        <DemoCard title="Inline Usage" description="Links within text content">
          <p class="text-sm text-text leading-relaxed max-w-lg">
            This component library is built with{' '}
            <Link href="https://solidjs.com" external>SolidJS</Link>
            {' '}and{' '}
            <Link href="https://kobalte.dev" external>Kobalte</Link>
            {' '}for accessibility. Styling is done with{' '}
            <Link href="https://tailwindcss.com" external>Tailwind CSS</Link>.
            Check out the{' '}
            <Link href="#">documentation</Link>
            {' '}for more details.
          </p>
        </DemoCard>

        <DemoCard title="Disabled" description="Non-interactive link state">
          <div class="flex flex-wrap gap-6">
            <Link href="#" disabled>Disabled link</Link>
            <Link href="#" variant="muted" disabled>Disabled muted</Link>
          </div>
        </DemoCard>
      </div>
    </section>
  )
}
