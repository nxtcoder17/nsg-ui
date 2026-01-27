import { Image as KobalteImage } from '@kobalte/core/image'
import { splitProps, JSX, Show } from 'solid-js'
import { cn } from '../../utils/cn'

export type ImageProps = {
  src: string
  alt: string
  fallback?: JSX.Element
  fallbackDelay?: number
  class?: string
  imgClass?: string
  onLoadingStatusChange?: (status: 'idle' | 'loading' | 'loaded' | 'error') => void
}

const DefaultFallback = () => (
  <div class="w-full h-full flex items-center justify-center bg-neutral-100">
    <svg class="w-8 h-8 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  </div>
)

export const Image = (props: ImageProps) => {
  const [local, others] = splitProps(props, [
    'src',
    'alt',
    'fallback',
    'fallbackDelay',
    'class',
    'imgClass',
    'onLoadingStatusChange',
  ])

  return (
    <KobalteImage
      fallbackDelay={local.fallbackDelay}
      onLoadingStatusChange={local.onLoadingStatusChange}
      class={cn('inline-block overflow-hidden', local.class)}
      {...others}
    >
      <KobalteImage.Img
        src={local.src}
        alt={local.alt}
        class={cn('w-full h-full object-cover', local.imgClass)}
      />
      <KobalteImage.Fallback>
        {local.fallback ?? <DefaultFallback />}
      </KobalteImage.Fallback>
    </KobalteImage>
  )
}
