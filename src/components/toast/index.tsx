import { Toast as KobalteToast, toaster as kobalteToaster } from '@kobalte/core/toast'
import { type JSX, Show, onMount } from 'solid-js'
import { Portal, render } from 'solid-js/web'
import { cn } from '../../utils/cn'
import { XIcon, InfoIcon, CheckCircleIcon, AlertTriangleIcon, AlertCircleIcon } from '../../icons'

export type ToastKind = 'info' | 'success' | 'warning' | 'danger'

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
  kind: ToastKind
}

const kindIcons: Record<ToastKind, (props: any) => JSX.Element> = {
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: AlertTriangleIcon,
  danger: AlertCircleIcon,
}

type ToastItemProps = {
  toastId: number
  data: ToastData
}

const ToastItem = (props: ToastItemProps) => {
  const Icon = kindIcons[props.data.kind]
  const showCloseIcon = props.data.withCloseIcon !== false

  return (
    <KobalteToast
      toastId={props.toastId}
      class="nsg-toast"
      data-kind={props.data.kind}
    >
      <Icon data-nsg-toast="icon" />
      <div data-nsg-toast="content">
        <KobalteToast.Title data-nsg-toast="title">
          {props.data.title}
        </KobalteToast.Title>
        <Show when={props.data.description}>
          <KobalteToast.Description data-nsg-toast="description">
            {props.data.description}
          </KobalteToast.Description>
        </Show>
      </div>
      <Show when={showCloseIcon}>
        <KobalteToast.CloseButton data-nsg-toast="close-button">
          <XIcon data-nsg-toast="close-icon" />
        </KobalteToast.CloseButton>
      </Show>
    </KobalteToast>
  )
}

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
          class={cn('nsg-toast-list', props.class)}
          data-position={position()}
        />
      </KobalteToast.Region>
    </Portal>
  )
}

// Auto-inject ToastRegion if not explicitly mounted
let autoInjected = false

const ensureRegion = () => {
  if (regionMounted || autoInjected) return

  autoInjected = true

  const container = document.createElement('div')
  container.id = 'nsg-toast-region'
  document.body.appendChild(container)

  render(() => <ToastRegion />, container)
}

const showToast = (kind: ToastKind, payload: ToastPayload): number => {
  ensureRegion()

  const data: ToastData = {
    ...payload,
    kind,
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

  update: (id: number, payload: Partial<ToastPayload> & { kind?: ToastKind }): void => {
    const kind = payload.kind ?? 'info'
    const data: ToastData = {
      title: payload.title ?? '',
      description: payload.description,
      withCloseIcon: payload.withCloseIcon !== false,
      kind,
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
