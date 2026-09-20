import { createSignal, createEffect, onMount, For, Show } from 'solid-js'
import { DropdownMenu } from '../dropdown-menu'
import { Button } from '../button'
import { ChevronDownIcon } from '../../icons'
import { cn } from '../../utils/cn'
import {
  THEME_FOUNDATIONS,
  THEME_FOUNDATION_STORAGE_KEY,
  DEFAULT_THEME_FOUNDATION_ID,
  applyThemeFoundation,
  getThemeFoundation,
  getStoredThemeFoundation,
  resolveThemeFoundation,
  type ThemeFoundation,
} from '../../themes'

export type ThemePickerProps = {
  /** Foundations to offer (default: every foundation nsg-ui ships). */
  foundations?: ThemeFoundation[]
  /** Applied on a first visit, before anything is stored. */
  defaultValue?: string
  /** Called with the chosen foundation id. */
  onChange?: (id: string) => void
  /** localStorage key (default: 'nsg-ui-foundation'). */
  storageKey?: string
  /** Render the four-colour swatch of each foundation in the menu. */
  withSwatches?: boolean
  /** Accessible label for the trigger. */
  label?: string
  class?: string
}

/**
 * Switches the whole design language of the components around it, at runtime.
 *
 * The choice is written to `data-nsg-theme` on `<html>` and remembered in
 * localStorage, so a page can restore it before the first paint — see
 * `docs/themes.md` for the two-line inline script.
 *
 * The foundations themselves are separate stylesheets; this component only
 * flips the attribute, so it adds no CSS to your bundle. Import the ones you
 * offer:
 *
 *   @import 'nsg-ui/themes/modern-brut-violet.css';
 *   @import 'nsg-ui/themes/riso-aqua.css';
 *
 *   <ThemePicker />
 */
export const ThemePicker = (props: ThemePickerProps) => {
  const foundations = () => props.foundations ?? THEME_FOUNDATIONS
  const storageKey = () => props.storageKey ?? THEME_FOUNDATION_STORAGE_KEY

  const fallback = () =>
    props.defaultValue ?? getStoredThemeFoundation(storageKey()) ?? DEFAULT_THEME_FOUNDATION_ID

  const [current, setCurrent] = createSignal(fallback())

  onMount(() => {
    // A foundation may already be on the element from the pre-paint script.
    const applied = getThemeFoundation()
    if (applied !== DEFAULT_THEME_FOUNDATION_ID) setCurrent(applied)
  })

  createEffect(() => {
    applyThemeFoundation(current(), storageKey())
    props.onChange?.(current())
  })

  const currentFoundation = () => resolveThemeFoundation(current())

  return (
    <DropdownMenu
      triggerLabel={props.label ?? 'Design foundation'}
      trigger={
        <Button kind="secondary" outline size="md" class={cn('gap-2', props.class)}>
          <Show when={props.withSwatches !== false && currentFoundation()}>
            <Swatch colors={currentFoundation()!.swatch} />
          </Show>
          {currentFoundation()?.label ?? current()}
          <ChevronDownIcon size="sm" />
        </Button>
      }
    >
      <DropdownMenu.SingleSelect
        label={props.label ?? 'Design foundation'}
        value={current()}
        onChange={setCurrent}
      >
        <For each={foundations()}>
          {(foundation) => (
            <DropdownMenu.SingleSelectItem value={foundation.id}>
              <span class="flex items-center gap-2.5">
                <Show when={props.withSwatches !== false}>
                  <Swatch colors={foundation.swatch} />
                </Show>
                {foundation.label}
              </span>
            </DropdownMenu.SingleSelectItem>
          )}
        </For>
      </DropdownMenu.SingleSelect>
    </DropdownMenu>
  )
}

/**
 * Four inks, because a foundation is four decisions: what text is, what the
 * sheet is, what acts, and what marks.
 */
function Swatch(props: { colors: [string, string, string, string] }) {
  return (
    <span class="flex items-center -space-x-0.5 shrink-0" aria-hidden="true">
      <For each={props.colors}>
        {(color) => (
          <span
            class="w-2.5 h-2.5 rounded-full border border-black/15"
            style={{ background: color }}
          />
        )}
      </For>
    </span>
  )
}
