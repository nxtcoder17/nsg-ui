import { Toast as KobalteToast, toaster as kobalteToaster } from '@kobalte/core/toast'
import { type JSX, Show, onMount } from 'solid-js'
import { Portal, render } from 'solid-js/web'
import { cn } from '../../utils/cn'

// ============================================================================
// Types
// ============================================================================

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger'

export type ToastPayload = {
  title: string
  description?: string
  withCloseIcon?: boolean
  duration?: number
  persistent?: boolean
}

export type ToastRegionProps = {
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  duration?: number
  limit?: number
  swipeDirection?: 'up' | 'down' | 'left' | 'right'
  pauseOnHover?: boolean
  class?: string
}

type ToastData = ToastPayload & {
  variant: ToastVariant
}

// ============================================================================
// Icons
// ============================================================================

const XIcon = (props: { class?: string }): JSX.Element => (
  <svg
    class={cn('w-4 h-4', props.class)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const InfoIcon = (props: { class?: string }): JSX.Element => (
  <svg
    class={cn('w-5 h-5', props.class)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
)

const CheckCircleIcon = (props: { class?: string }): JSX.Element => (
  <svg
    class={cn('w-5 h-5', props.class)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

const AlertTriangleIcon = (props: { class?: string }): JSX.Element => (
  <svg
    class={cn('w-5 h-5', props.class)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

const AlertCircleIcon = (props: { class?: string }): JSX.Element => (
  <svg
    class={cn('w-5 h-5', props.class)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

// ============================================================================
// Variant Styles
// ============================================================================

const variantStyles: Record<ToastVariant, { container: string; icon: string }> = {
  info: {
    container: 'border-primary-200 bg-primary-50',
    icon: 'text-primary-500',
  },
  success: {
    container: 'border-success-200 bg-success-50',
    icon: 'text-success-500',
  },
  warning: {
    container: 'border-warning-200 bg-warning-50',
    icon: 'text-warning-500',
  },
  danger: {
    container: 'border-danger-200 bg-danger-50',
    icon: 'text-danger-500',
  },
}

const variantIcons: Record<ToastVariant, (props: { class?: string }) => JSX.Element> = {
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: AlertTriangleIcon,
  danger: AlertCircleIcon,
}

// ============================================================================
// Position Styles
// ============================================================================

const positionStyles: Record<NonNullable<ToastRegionProps['position']>, string> = {
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
}

// ============================================================================
// Toast Item Component
// ============================================================================

type ToastItemProps = {
  toastId: number
  data: ToastData
}

const ToastItem = (props: ToastItemProps) => {
  const Icon = variantIcons[props.data.variant]
  const styles = variantStyles[props.data.variant]
  const showCloseIcon = props.data.withCloseIcon !== false

  return (
    <KobalteToast
      toastId={props.toastId}
      class={cn(
        'flex items-start gap-3 p-4 rounded-lg border shadow-lg text-text',
        'animate-slide-in-right',
        'data-[closed]:animate-fade-out',
        styles.container
      )}
    >
      <Icon class={styles.icon} />
      <div class="flex-1 min-w-0">
        <KobalteToast.Title class="font-medium text-sm text-text">
          {props.data.title}
        </KobalteToast.Title>
        <Show when={props.data.description}>
          <KobalteToast.Description class="mt-1 text-sm text-text-secondary">
            {props.data.description}
          </KobalteToast.Description>
        </Show>
      </div>
      <Show when={showCloseIcon}>
        <KobalteToast.CloseButton class="shrink-0 p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <XIcon class="text-text-secondary" />
        </KobalteToast.CloseButton>
      </Show>
    </KobalteToast>
  )
}

// ============================================================================
// Toast Region Component
// ============================================================================

let regionMounted = false

export const ToastRegion = (props: ToastRegionProps) => {
  const position = () => props.position ?? 'bottom-right'
  const duration = () => props.duration ?? 2000
  const limit = () => props.limit ?? 5
  const swipeDirection = () => props.swipeDirection ?? 'right'
  const pauseOnHover = () => props.pauseOnHover !== false

  onMount(() => {
    regionMounted = true
  })

  return (
    <Portal>
      <KobalteToast.Region
        duration={duration()}
        limit={limit()}
        swipeDirection={swipeDirection()}
        pauseOnInteraction={pauseOnHover()}
        aria-label="Notifications"
      >
        <KobalteToast.List
          class={cn(
            'fixed z-50 flex flex-col gap-2 w-80 max-w-[calc(100vw-2rem)]',
            positionStyles[position()],
            props.class
          )}
        />
      </KobalteToast.Region>
    </Portal>
  )
}

// ============================================================================
// Auto-inject Region
// ============================================================================

let autoInjected = false

const ensureRegion = () => {
  if (regionMounted || autoInjected) return

  autoInjected = true

  // Create container and inject region
  const container = document.createElement('div')
  container.id = 'nsg-toast-region'
  document.body.appendChild(container)

  render(() => <ToastRegion />, container)
}

// ============================================================================
// Toast API
// ============================================================================

const showToast = (variant: ToastVariant, payload: ToastPayload): number => {
  ensureRegion()

  const data: ToastData = {
    ...payload,
    variant,
    withCloseIcon: payload.withCloseIcon !== false,
  }

  return kobalteToaster.show((props) => (
    <ToastItem toastId={props.toastId} data={data} />
  ), {
    duration: payload.persistent ? Infinity : (payload.duration ?? 2000),
  } as Parameters<typeof kobalteToaster.show>[1])
}

export const toast = {
  info: (payload: ToastPayload): number => showToast('info', payload),
  success: (payload: ToastPayload): number => showToast('success', payload),
  warning: (payload: ToastPayload): number => showToast('warning', payload),
  danger: (payload: ToastPayload): number => showToast('danger', payload),

  update: (id: number, payload: Partial<ToastPayload> & { variant?: ToastVariant }): void => {
    const variant = payload.variant ?? 'info'
    const data: ToastData = {
      title: payload.title ?? '',
      description: payload.description,
      withCloseIcon: payload.withCloseIcon !== false,
      variant,
    }

    kobalteToaster.update(id, (props) => (
      <ToastItem toastId={props.toastId} data={data} />
    ))
  },

  dismiss: (id: number): void => {
    kobalteToaster.dismiss(id)
  },

  clear: (): void => {
    kobalteToaster.clear()
  },
}
