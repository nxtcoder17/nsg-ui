# nsg-ui

A SolidJS component library built on [Kobalte](https://kobalte.dev) primitives with Tailwind CSS styling.

## Installation

```bash
bun add nsg-ui @kobalte/core solid-js
```

## Setup

### Tailwind CSS 4

In your main CSS file:

```css
@import 'tailwindcss';
@import 'nsg-ui/theme.css';
```

That's it. The theme's own `@source` directives register the library's compiled components and icons (in `dist/`) as Tailwind sources, so all utility classes used internally — like `w-3.5 h-3.5` for the `sm` icon size — are generated for you. The theme includes:
- All color scales (neutral, primary, danger, success, warning)
- Light mode colors in `@theme`
- Dark mode overrides in `.dark`
- Semantic tokens (surface, border, text, etc.)
- Animations and utilities

> **Note:** If you're on an older Tailwind v4 version that doesn't honor the theme's `@source` directives, add this to your CSS instead:
> ```css
> @source "node_modules/nsg-ui/dist/**/*.{js,jsx}";
> ```

### Custom Colors

Override colors after importing the theme:

```css
@import 'tailwindcss';
@import 'nsg-ui/theme.css';

:root {
  --color-primary-500: oklch(55% 0.25 200);
}

.dark {
  --color-primary-500: oklch(65% 0.20 200);
}
```

## Usage

```tsx
import { Button, Dialog, Toast, toast } from 'nsg-ui';

function App() {
  return (
    <>
      <Button variant="default" onClick={() => toast.success({ title: 'Saved!' })}>
        Save
      </Button>

      <Dialog
        trigger={<Button variant="outline">Open Dialog</Button>}
        title="Confirm"
        description="Are you sure?"
      >
        <Button variant="danger">Delete</Button>
      </Dialog>
    </>
  );
}
```

## Theme Foundations

Whole design languages for every component at once, switched with one attribute:

```css
@import 'tailwindcss';
@import 'nsg-ui/theme.css';

/* only the foundations you offer get shipped */
@import 'nsg-ui/themes/modern-brut.css';
```

```tsx
import { ThemePicker } from 'nsg-ui'

<ThemePicker />
```

```html
<html data-nsg-theme="modern-brut">   <!-- or applyThemeFoundation('modern-brut') -->
```

Shipped: `default` (the built-in look) and `modern-brut`. Each is a separate
stylesheet, so a project pays for the foundations it imports and nothing else.
Full contract, dark-mode rules and an authoring guide:
[docs/themes.md](./docs/themes.md). The reasoning behind
`modern-brut`'s rules — what the style is, and what the reference
implementations actually do — is in
[docs/NEOBRUTALISM-design.md](./docs/NEOBRUTALISM-design.md).

### Agent skills

[`skills/nsg-ui-modern-brut-mockup/`](./skills/nsg-ui-modern-brut-mockup)
teaches an agent this design system so it can produce static mockups that
rebuild 1:1 with the real components. The token values, the markup contract and
the utility whitelist are inlined, so it needs no repo, no npm and no network —
drop it in `.agents/skills/` or point your agent at
`/nsg-ui-modern-brut-mockup/SKILL.md` on the docs site.

### Plain HTML, no build step

The components are CSS keyed on classes and data attributes, so a foundation can
be used in a plain HTML page — no npm, no build, no framework. `dist/theme.css`
is a Tailwind *input* file and cannot be linked, so the build also emits a
compiled stylesheet per foundation: the component layer plus that one foundation.

```html
<!doctype html>
<!-- Put the attribute on <html>: the base font rule resolves --font-sans here,
     so scoping it to a <div> leaves the fonts on the system stack. -->
<html lang="en" data-nsg-theme="modern-brut">
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nsg-ui@0.1.0/dist/standalone/modern-brut.min.css">
    <style>
      /* The stylesheet defines tokens and components but paints no page. */
      body {
        background-color: var(--color-surface);
        color: var(--color-text);
        background-image: var(--nsg-page-backdrop);
        background-size: var(--nsg-page-backdrop-size);
      }
    </style>
  </head>
  <body>
    <div class="nsg-card" data-kind="raised">
      <h1 class="text-xl font-bold">Auth rewrite</h1>
      <span class="nsg-badge" data-kind="warning" data-size="md">risk</span>
    </div>
  </body>
</html>
```

Card, Badge, Button, Progress, Separator, Text, Link and Row/Column need no
JavaScript; Accordion works as hand-written `<details>`/`<summary>`. The rest
are behaviour rather than style and stay in the Solid components.

Because there is no Tailwind pipeline, only a small fixed set of layout
utilities ships — width, spacing, flow, alignment and type scale. `nsg-*`
classes always work; an arbitrary utility emits no rule and silently does
nothing. See [docs/themes.md](./docs/themes.md#plain-html-no-build-step).

### Re-inking Modern Brut

`modern-brut` ships in a deep blue, but the hue is not part of its identity —
it is one declaration. The whole `--color-primary-*` ramp, the ring, the active
nav row, the checked checkbox and radio, the marked menu rows, the combo tags and
the primary and danger action inks are all derived from `--nsg-spot`, so a single
value re-inks the entire language with nothing structural to touch.

Dark mode needs its own value, because on an ink field the action ink has to be
*lighter* rather than the same hue — the sheet is now the dark end, so the action
is lifted until its own label clears text on it. An override is therefore a
**pair**:

```css
/* after importing the foundation */
[data-nsg-theme='modern-brut']      { --nsg-spot: #a61e63; }  /* light, 6.4:1 */
[data-nsg-theme='modern-brut'].dark { --nsg-spot: #fbcfe8; }  /* dark, 13.6:1 */
```

These are the recommended hues. Each was measured in the browser: the light
figure is the accent against the paper field, the dark figure is the lifted
accent against the ink field, and both clear WCAG AA (4.5:1) for text.

| Accent | Light | Dark | On the field (light → dark) |
|---|---|---|---|
| **Blue** *(default)* | `#005bac` | `#7fb3de` | 6.2:1 → 8.4:1 |
| Violet | `#6d28d9` | `#a78bfa` | 6.5:1 → 6.9:1 |
| Indigo | `#4338ca` | `#a5b4fc` | 7.2:1 → 9.5:1 |
| Sky | `#0369a1` | `#7dd3fc` | 5.4:1 → 11.3:1 |
| Cyan | `#0e7490` | `#67e8f9` | 4.9:1 → 13.0:1 |
| Teal | `#0f766e` | `#5eead4` | 5.0:1 → 12.7:1 |
| Magenta | `#a21caf` | `#e879f9` | 5.7:1 → 7.7:1 |
| Pink | `#be185d` | `#f9a8d4` | 5.5:1 → 10.4:1 |
| Rose | `#be123c` | `#fda4af` | 5.7:1 → 10.0:1 |

Notes for choosing your own:

- **The light value is the one that will fail.** Cyan and teal are the closest to
  the limit at 4.9–5.0:1; a darker, more saturated version of either will drop
  below AA, and a lighter one is fine.
- **The dark value is the one people get wrong**, and it is the common mistake:
  reusing the light value scores **2.8:1** for the shipped blue, because the sheet
  is now the dark end. Pick a genuinely lighter tint of the same hue and check it
  against the field — `#005bac` needs `#7fb3de` to clear, which is a 45% lift
  toward white, not a different hue.
- **A hue is safe, a lightness is not.** These pairs are all mid-to-deep in light
  and pale in dark. That is the constraint, not the specific hex values.
- The conflict orange, the state acid and the ok green are independent anchors —
  they do not move with the accent, so an accent swap never disturbs them.

## Components

| Component | Description |
|-----------|-------------|
| Accordion | Expandable content sections |
| Badge | Status indicators |
| Button | Actions with variants: default, outline, ghost, danger, link |
| Card | Content container |
| Checkbox | Boolean input with indeterminate state |
| ComboBox | Searchable select with single/multiple selection |
| CommandBar | Command palette with keyboard navigation |
| ContextMenu | Right-click menu |
| Dialog | Modal dialogs |
| DropdownMenu | Menus with submenus, checkboxes, radios |
| Image | Image with fallback |
| Link | Navigation links |
| NumberInput | Numeric input field |
| Popover | Floating content |
| Progress | Progress indicators |
| RadioGroup | Single selection from options |
| SegmentedControl | Toggle between options |
| Separator | Visual divider |
| Tabs | Tabbed content |
| Text | Themed text with color variants |
| TextInput | Text input field |
| Toast | Notifications (info, success, warning, danger) |
| ToggleButton | On/off toggle |

### Icons

```tsx
import { CheckIcon, ChevronRightIcon } from 'nsg-ui/icons';
```

## API Examples

### Button

```tsx
<Button variant="default" size="md" disabled={false}>
  Click me
</Button>
```

Variants: `default` | `outline` | `ghost` | `danger` | `link`
Sizes: `sm` | `md` | `lg` | `icon`

### Toast

```tsx
// Auto-injects toast region on first call
toast.info({ title: 'Message received' });
toast.success({ title: 'Saved!', description: 'Changes applied' });
toast.warning({ title: 'Session expiring' });
toast.danger({ title: 'Error', description: 'Failed to save' });

// Options
toast.success({
  title: 'Uploading...',
  description: 'Optional details',
  withCloseIcon: true,
  duration: 2000,
  persistent: false,
});
```

### ComboBox

```tsx
<ComboBox
  options={['Apple', 'Banana', 'Cherry']}
  value={fruit()}
  onChange={setFruit}
  placeholder="Select a fruit..."
/>

// Multiple selection
<ComboBox
  multiple
  options={frameworks}
  value={selected()}
  onChange={setSelected}
/>
```

### DropdownMenu

```tsx
<DropdownMenu trigger={<Button>Open</Button>}>
  <DropdownMenu.Group label="Actions">
    <DropdownMenu.ActionItem label="Edit" onSelect={() => {}} />
    <DropdownMenu.ActionItem label="Delete" variant="danger" onSelect={() => {}} />
  </DropdownMenu.Group>

  <DropdownMenu.Separator />

  <DropdownMenu.SingleSelect label="Theme" value={theme()} onChange={setTheme}>
    <DropdownMenu.Option value="light" label="Light" />
    <DropdownMenu.Option value="dark" label="Dark" />
  </DropdownMenu.SingleSelect>
</DropdownMenu>
```

## Development

```bash
# Build library
bun run build

# Watch mode
bun run dev

# Run demo website
cd website && bun dev
```

## License

MIT
