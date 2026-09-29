/**
 * Theme foundations
 *
 * A *foundation* is a whole design language — colour, type and geometry — for
 * every nsg-ui component at once. Choosing one is a single attribute on the
 * document element, so a project can offer a selector for it (see
 * `ThemePicker`) without touching component markup or rebuilding.
 *
 *   <link rel="stylesheet" href="node_modules/nsg-ui/dist/themes/modern-brut.css" />
 *   document.documentElement.dataset.nsgTheme = 'modern-brut'
 *
 * or, in a Tailwind CSS entry file:
 *
 *   @import 'nsg-ui/theme.css';
 *   @import 'nsg-ui/themes/modern-brut.css';
 *
 * Foundations are plain CSS (no Tailwind, no `@apply`) so they can be imported
 * into a build or linked at runtime. Writing one is a token list — the contract
 * is documented in `docs/themes.md`.
 */

/** Attribute a foundation is selected with, on any element that wraps the UI. */
export const THEME_FOUNDATION_ATTRIBUTE = 'data-nsg-theme'

/** localStorage key the helpers persist the choice under. */
export const THEME_FOUNDATION_STORAGE_KEY = 'nsg-ui-foundation'

/** The unthemed nsg-ui look: no stylesheet, nothing to switch to. */
export const DEFAULT_THEME_FOUNDATION_ID = 'default'

export interface ThemeFoundation {
  /** Value written to `data-nsg-theme`, and persisted in localStorage. */
  id: string
  label: string
  description: string
  /**
   * Stylesheet that defines the foundation, or `null` for the built-in look.
   * Resolvable as `nsg-ui/themes/<stylesheet>`.
   */
  stylesheet: string | null
  /** Pickers and docs show these four: [ink, paper, action ink, second ink]. */
  swatch: [string, string, string, string]
}

export const THEME_FOUNDATIONS: ThemeFoundation[] = [
  {
    id: DEFAULT_THEME_FOUNDATION_ID,
    label: 'Default',
    description: 'The shipped nsg-ui look: soft geometry, neutral surfaces, one accent.',
    stylesheet: null,
    swatch: ['#0f0e0c', '#ffffff', '#333333', '#1a1a1a'],
  },
  {
    id: 'modern-brut',
    label: 'Modern Brut',
    description:
      'Exposed 64px structure, square corners, a hard ink block that is earned rather than ambient, and one action ink you can swap with a single declaration.',
    stylesheet: 'modern-brut.css',
    /* [ink, paper, action ink, second ink] — the second ink is the conflict
     * orange the plate actually uses. The acid is a fill (and #c8ff00, which
     * used to be listed here, appears nowhere in the palette). */
    swatch: ['#111113', '#f4f4f2', '#005bac', '#ff5b23'],
  },
  {
    id: 'riso-aqua',
    label: 'Riso Press · Aqua',
    description:
      'Press sheets with a halftone dot, two spot inks, 2px corners and a misregistered block shadow.',
    stylesheet: 'riso-aqua.css',
    swatch: ['#17161b', '#fbfbfc', '#1c37c4', '#5ec8e5'],
  },
  {
    id: 'riso-press',
    label: 'Riso Press · Federal',
    description:
      'The same press as Aqua with the pink plate on press: federal blue acts, fluorescent pink marks.',
    stylesheet: 'riso-press.css',
    swatch: ['#17161b', '#fbfbfc', '#1c37c4', '#ff3d8b'],
  },
]

export type ThemeFoundationId = (typeof THEME_FOUNDATIONS)[number]['id']

/**
 * Stylesheets that exist only to be `@import`-ed by a foundation above (a shared
 * family language, e.g. the press). They are copied to `dist/themes/` but are
 * not selectable foundations, and nothing outside this package should import
 * them directly — import a plate instead.
 */
export const THEME_STYLESHEET_PARTIALS: string[] = ['riso-base.css']

/** Every stylesheet that ships in `dist/themes/` — the foundations, then the partials. */
export function themeStylesheets(): string[] {
  return [
    ...THEME_FOUNDATIONS.map((foundation) => foundation.stylesheet).filter(
      (file): file is string => file !== null,
    ),
    ...THEME_STYLESHEET_PARTIALS,
  ]
}

export function resolveThemeFoundation(id: string | null | undefined): ThemeFoundation | undefined {
  if (!id) return undefined
  return THEME_FOUNDATIONS.find((foundation) => foundation.id === id)
}

/** Id currently applied to the document, falling back to the default look. */
export function getThemeFoundation(): string {
  if (typeof document === 'undefined') return DEFAULT_THEME_FOUNDATION_ID
  return document.documentElement.getAttribute(THEME_FOUNDATION_ATTRIBUTE) ?? DEFAULT_THEME_FOUNDATION_ID
}

/**
 * Applies a foundation to the document and remembers it. The default
 * foundation clears the attribute rather than writing `default`, so unthemed
 * projects stay byte-identical in the DOM.
 */
export function applyThemeFoundation(id: string, storageKey = THEME_FOUNDATION_STORAGE_KEY): void {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  if (id === DEFAULT_THEME_FOUNDATION_ID) root.removeAttribute(THEME_FOUNDATION_ATTRIBUTE)
  else root.setAttribute(THEME_FOUNDATION_ATTRIBUTE, id)

  try {
    localStorage.setItem(storageKey, id)
  } catch {
    /* private mode, or no storage: the attribute above still applied */
  }
}

/** The foundation a fresh page load should start with, from storage. */
export function getStoredThemeFoundation(storageKey = THEME_FOUNDATION_STORAGE_KEY): string {
  if (typeof localStorage === 'undefined') return DEFAULT_THEME_FOUNDATION_ID
  try {
    return migrateFoundationId(localStorage.getItem(storageKey) ?? DEFAULT_THEME_FOUNDATION_ID)
  } catch {
    return DEFAULT_THEME_FOUNDATION_ID
  }
}

/**
 * Ids that were renamed, so a returning visitor is not silently dropped back to
 * the default look by a stale `localStorage` value.
 *
 * `modern-brut-violet` became `modern-brut` when the foundation stopped shipping
 * a fixed palette: its action ink is now a one-line override, so the hue is no
 * longer part of the foundation's identity.
 */
const RENAMED_FOUNDATION_IDS: Record<string, string> = {
  'modern-brut-violet': 'modern-brut',
}

/** Map a possibly-stored id onto the current one. */
export function migrateFoundationId(id: string | null | undefined): string {
  if (!id) return DEFAULT_THEME_FOUNDATION_ID
  return RENAMED_FOUNDATION_IDS[id] ?? id
}
