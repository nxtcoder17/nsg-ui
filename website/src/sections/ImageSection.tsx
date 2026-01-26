import { Component, createSignal } from 'solid-js'
import { Image } from 'nsg-ui'
import { DemoCard } from '../components/DemoCard'

export function ImageIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  )
}

export const ImageSection: Component = () => {
  const [status, setStatus] = createSignal<string>('idle')

  return (
    <section id="image" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <ImageIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">Image</h2>
        </div>
        <p class="text-text-secondary ml-11">Image with fallback for loading and error states.</p>
      </div>

      <div class="grid gap-6">
        <DemoCard title="Basic" description="Image with automatic fallback">
          <div class="flex gap-6">
            <Image
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop"
              alt="Portrait"
              class="w-24 h-24 rounded-lg"
            />
            <Image
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop"
              alt="Portrait 2"
              class="w-24 h-24 rounded-full"
            />
          </div>
        </DemoCard>

        <DemoCard title="Fallback" description="Shows fallback while loading or on error">
          <div class="flex gap-6 items-end">
            <div>
              <p class="text-xs text-text-secondary mb-2">Default fallback</p>
              <Image
                src="https://invalid-url-that-will-fail.com/image.jpg"
                alt="Will fail"
                class="w-24 h-24 rounded-lg"
              />
            </div>
            <div>
              <p class="text-xs text-text-secondary mb-2">Custom fallback</p>
              <Image
                src="https://another-invalid-url.com/nope.jpg"
                alt="Custom fallback"
                class="w-24 h-24 rounded-lg"
                fallback={
                  <div class="w-full h-full flex items-center justify-center bg-primary-100 dark:bg-primary-900 text-primary-500 font-medium">
                    AB
                  </div>
                }
              />
            </div>
            <div>
              <p class="text-xs text-text-secondary mb-2">Loading state</p>
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
                alt="With status"
                class="w-24 h-24 rounded-lg"
                onLoadingStatusChange={setStatus}
              />
              <p class="text-xs text-text-secondary mt-1">
                Status: <span class="font-mono text-primary-500">{status()}</span>
              </p>
            </div>
          </div>
        </DemoCard>

        <DemoCard title="Avatar Sizes" description="Common avatar use cases">
          <div class="flex items-end gap-4">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              alt="Avatar XS"
              class="w-8 h-8 rounded-full"
            />
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              alt="Avatar SM"
              class="w-10 h-10 rounded-full"
            />
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              alt="Avatar MD"
              class="w-12 h-12 rounded-full"
            />
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              alt="Avatar LG"
              class="w-16 h-16 rounded-full"
            />
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              alt="Avatar XL"
              class="w-24 h-24 rounded-full"
            />
          </div>
        </DemoCard>
      </div>
    </section>
  )
}
