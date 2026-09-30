---
name: nsg-ui-modern-brut-mockup
description: Create static HTML design mockups that faithfully mirror the nsg-ui "Modern Brut" foundation — neobrutalist, square-cornered, ink-ruled, warm and approachable. Use when the user asks for design mockups, design directions, wireframes, static HTML pages, or "designs" to review BEFORE building the real app, and especially when the words nsg-ui, Modern Brut, nsg-brut, brutalist, or "match our component library" appear. Also trigger when asked to explore several design directions as separate HTML pages, or to make a clickable prototype that should rebuild 1:1 with real components later. Do NOT draw these from memory — the exact tokens are in Appendix A.
---

# nsg-ui Modern Brut — static HTML mockups

Produce a set of standalone `.html` pages that mirror the `nsg-ui` **Modern Brut**
foundation closely enough that a later rebuild with the real components is a
mechanical port, not a redesign.

**This file is self-sufficient.** The token values, the markup contract and the
utility whitelist are all inlined below (Appendices A and B). No repo checkout, no
network, no npm install. Copy this one file to any machine and it works.

The failure mode this skill exists to prevent: an agent "does neobrutalism" from
memory, produces rounded corners, grey borders, ambient shadows and a violet-blue
ramp, and the mockup looks nothing like the library. **The tokens are the design.
Use Appendix A, don't recall.**

---

## Step 0 — Decide which path you're on

Two legitimate paths. **Pick deliberately and tell the user which.**

### Path A — Link the stylesheet, write real markup *(highest fidelity, least work)*

Use the published standalone stylesheet and write **real `.nsg-*` classes with real
data attributes** (Appendix B). Nothing is ported, so nothing can drift: the browser
applies the actual foundation.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nsg-ui@0.1.0/dist/standalone/modern-brut.min.css">
```

- **Pin the version explicitly.** Never `@latest` or a bare package name.
- **Vendor it when offline or sandboxed** — `curl` the file once into
  `design/vendor/` and link it relatively. This is how Path A works on a machine with
  no CDN access, and it is the recommended way to make a mockup portable.
- Best when the mockup should be indistinguishable from the library and the screen
  fits inside the library's class vocabulary.

### Path B — Port into a project stylesheet *(needed for tuning or new components)*

Take the token values from **Appendix A** and write your own `<project>.css` with your
own component classes (`.panel`, `.btn`, `.msg`, …). This is the common case.

Use Path B when you want **re-tuned neutrals** (Step 2) or when the product needs
components the library has no equivalent for (Step 4) — which is most real screens.

**You can mix:** link the stylesheet for the primitives, then add your own `<style>`
block for the product layer. That is usually the best of both.

> If an `nsg-ui` **source checkout** happens to be present, skimming its
> `src/styles/theme.css` and `docs/NEOBRUTALISM-design.md` is a nice-to-have — the
> latter is the *why* behind every rule. It is **optional**; this skill is complete
> without it. Don't comment on its absence.

---

## Step 1 — Extract the contract

Before designing, write these down from Appendix A:

- **The five anchors**: `--nsg-ink`, `--nsg-paper`, `--nsg-raised`, `--nsg-spot` (the
  one swappable value), `--nsg-ok`.
- **The tiered block**: `--nsg-block` (6px, the screen's primary action only),
  `--nsg-block-float` (4px, anything that hangs off a corner), and *nothing* for
  regions and centred sheets that aren't floating.
- **Geometry**: every radius is `0`. `--nsg-border-width: 1.5px`.
- **`--color-border` IS the ink.** Not a grey. This single choice is what makes panels
  read as *drawn* rather than *floated*.
- **The dark block**, which restates `--nsg-spot` and rebuilds the block from
  `--color-border` rather than the ink.

**The one rule that keeps the theme legible.** Quote it in your own port's header,
because breaking it is the most common way a port goes wrong:

> A vivid plate ink is a **FILL**, never an **ink**. Raw orange reads 2.9:1 and raw
> acid 2.4:1 on paper, so each has a `-deep` partner for the ramp positions that end
> up as text. Ramps keep the vivid ink in 50–400 (fills, tints, kind bars) and the
> deep one from 500 up (text, rules, a filled button's own label).

---

## Step 2 — Decide: verbatim or deliberately re-tuned

**A. Faithful port** — reproduce the anchors as-is.

**B. Tuned port** — take every *structural* value verbatim, then re-tune only the
neutral axis to change the emotional temperature. The existing `design/kitchen.css`
does this: `#111113` → `#131315` and `#f4f4f2` → `#f5f4f1` (warmer, "approachable
rather than severe"), while `--nsg-spot: #005bac`, the dark `#7fb3de`, the 6px/4px
block and radius-0 all survive untouched.

Rules for mode B:
- **Never** re-tune the accent or the block. Those are the identity.
- Retune only ink/paper/warmth, and **say so in the file header** — an undocumented
  deviation reads like a bug.
- Keep contrast ratios clearing AA. Recompute them; don't assume.

---

## Step 3 — Build the stylesheet

One shared `<project>.css` that every page links. Structure:

```
1. Header comment: what this is, that it's a static port of Modern Brut, and
   every deliberate deviation listed explicitly.
2. Fonts — @import Inter Tight + IBM Plex Mono (static mockups may use the
   Google Fonts @import; the library itself uses @font-face).
3. :root tokens — flatten --nsg-* and --color-* into ONE namespace, since there
   is no Tailwind layer here.  (e.g. --surface, --border, --text, --primary)
4. html.dark token block — a second, independent axis.
5. base reset, typography, scrollbars, ::selection
6. voice utilities (.label, .meta, .mono, .num)
7. surfaces (.panel, .sheet, .card)
8. controls (buttons, badges, pills, avatars, meters, inputs, segments, tabs)
9. app chrome (shell, topbar, rails, workspace switcher)
10. product components (invented here — see Step 4)
11. responsive breakpoints at the end
```

### Non-negotiables when porting

- **Radius 0 everywhere.** One documented exception: a radio stays round, because its
  circle is *meaning*, not geometry. A checkbox is square.
- **Rules are the ink.** `border: 1.5px solid var(--border)` where `--border` maps to
  the ink, not a grey.
- **The block is earned, never ambient.** Ask of every element: *is this a thing you
  press (6px), a thing that hangs off a corner (4px), or neither?* Regions, panels and
  content cards get **no** block. This restraint is why the page stays calm instead of
  shouting — the most common porting error is putting a block on everything.
- **Mono is for labels and actions only.** Buttons, badges, field labels, tickers and
  meta get IBM Plex Mono, uppercase, `letter-spacing: 0.1em`+. **Body copy stays big
  and sans.** If prose starts rendering in mono, the page reads like a terminal and
  the warmth is gone.
- **Hover = the block collapsing.** `box-shadow` shrinking to `2px 2px` with a
  matching `transform: translate(...)` makes the control press into its own shadow.
  That is the foundation's only press gesture; don't invent a colour-change hover.
- **Colour as function, never flavour.** Accent acts. Orange only ever conflicts.
  Moss is only ever ok. Acid is only ever live.

### Dark mode has two traps

1. `--nsg-spot` is restated in dark, not re-pointed, and it must be a **lighter**
   value — an override is a **PAIR** of declarations:
   ```css
   :root      { --nsg-spot: #005bac; }
   html.dark  { --nsg-spot: #7fb3de; }
   ```
   Reusing the light value in dark fails contrast (~2.8:1).
2. The block is rebuilt from `--color-border`, not the ink. On an ink field a
   near-white slab *under* a raised element makes depth read backwards — the control
   looks pressed onto a plate rather than lifted off the page.

### The utility whitelist — Appendix B

If you write inline utility classes at all, **only the compiled whitelist emits CSS.**
An arbitrary utility (`gap-10`, `mt-32`, a bracketed one-off) silently produces no rule
and does nothing. Either stay inside the whitelist or — preferable for a mockup —
write real component classes in your own `<style>` block.

Two things in there that bite every time:
- **Block components carry no default spacing between children.** A heading, a
  paragraph and a button written as siblings sit flush. Add spacing yourself.
- **Prefer flex row + `gap`** for a row of badges or buttons. Sibling margins are what
  cause uneven gaps.

---

## Step 4 — Invent the product layer in the same voice

The foundation covers primitives. A real product screen needs 20–30 components the
library has never heard of — a channel row, a composer, an org chart, a timeline.
**These are where the port either holds or falls apart.**

Do **not** style them neutrally and hope. Derive each one from the foundation's own
vocabulary, and prefer composing existing primitives:

| Need | Derived from |
|---|---|
| A row in a list | transparent, sunken hover, active = accent fill + paper label + inset ink outline |
| A "you vs them" message | `--color-primary-200` tint with a 6px accent left edge — **not** a solid accent slab, which stays reserved for actions |
| A selectable card grid | ink rule, and `[aria-pressed]` adds the float block |
| An empty/invite slot | dashed ink border, no fill, accent on hover |
| A "needs you" card | ink rule + a block in the *semantic* colour (accent / ok / conflict) |
| A tree (org chart, requirements) | 1.5px ink stems via `::before`/`::after`, with `:first-child`/`:last-child` clipping half the connector so it terminates cleanly |
| A timeline | ink spine, square nodes, spine `bottom`-offset so it stops before the last node |

Two standing rules for this layer:
- **List every invented class in the stylesheet header** as product-layer, so a future
  reader can tell it apart from the ported foundation.
- **Every invented component needs a light *and* dark story.** Copying a light rule
  without checking dark is how `color-mix` ramps produce a dark-on-dark label.

---

## Step 5 — Measurement discipline (this is the part that makes it look designed)

The foundation's own comments are full of **computed contrast ratios**, and that is not
decoration — it is the method. Every non-obvious colour decision gets a number:

```css
/* At #6d6d72 muted measured 4.67:1 on the paper field but 4.12:1 on the sunken
 * sheet, so a caption placed on any sunken surface failed AA. Stepping it down
 * toward the ink clears both: 4.9:1 on the field, 4.6:1 on the sunken sheet. */
--muted: #626269;
```

Before you settle a palette, **compute the ratios for every text/surface pair you
actually use** — including the ones on sunken and striped surfaces, not just the page
background. A token that clears on the field routinely fails on the tint you put it on.
State the numbers in the comment so the next reader doesn't have to re-derive them, and
so a reviewer can check the claim.

Reject a value that merely *looks* fine. `-50` and `-100` ramps sit at 0.96–0.99
lightness and read as white — a tint that faint is decoration, not a signal. Pick the
strongest wash whose text still clears AA.

---

## Step 6 — Assemble the deliverable

```
design/
  index.html        # gallery linking every direction
  01-<name>.html    # one file per direction, self-contained
  02-<name>.html
  <project>.css     # the shared ported foundation
  app.js            # theme toggle, channel switching, modal open/close
  README.md         # which direction was chosen, coverage vs the brief, open items
```

Per page:
- Link the shared stylesheet, then add **one `<style>` block of page-specific
  components** — keep page-local classes in the page, not in the shared file.
- Every page gets a **light/dark toggle** wired to `app.js` (`data-theme-toggle`), and
  the `--page-backdrop` grid.
- Make at least the primary direction **interactive** — real channel switching, a real
  modal that opens — so the direction can actually be judged. A deep-linkable modal
  (`?modal=new-company`) is cheap and demos well.
- **ASCII only in the mono voice.** IBM Plex Mono has no fullwidth forms and renders
  arrows/return symbols as tofu boxes. Use inline SVG for anything glyph-like.
- Inline SVG icons throughout, `stroke="currentColor"`, ~1.5–1.7 stroke width. Never
  emoji, never an icon font.

Write `README.md` as a real decision document: the chosen direction, a table of what
each page covers against the brief, and an explicit **open items** list.

**Flag it as a mockup, and say what it does not do.** These pages exist to be approved,
not shipped. State that the CSS is a port so a reviewer knows the rebuild with real
components is expected to be mechanical — and if a page takes a shortcut the real
component can't take, say so in the README rather than letting it pass as a promise.

---

## Step 7 — Verify in a real browser

**Never call a mockup done from reading the markup.** Render it.

Use the browser tooling available in the session (the `browser-testing-with-devtools`
skill / Chrome DevTools MCP) to:

1. **Screenshot every page in light *and* dark.** Dark is where the `color-mix` ramps
   and the block colour break; it cannot be verified by reasoning.
2. **Read the console** for errors — a mistyped class or a failed font is silent otherwise.
3. **Inspect computed styles** on the shadow/block to confirm it's actually resolving
   (`6px 6px 0` and not `none`) — a wrong custom-property name fails *silently*.
4. **Check the tofu rule** — look at any mono glyph and confirm it rendered.
5. **Resize** to the smallest breakpoint in the brief and screenshot that too.

Then fix what the screenshots show, and say what you checked.

---

## Anti-patterns — the specific ways this goes wrong

- ❌ Tokens from memory instead of from Appendix A. **The single biggest failure.**
- ❌ Any `border-radius` above 0 (except a radio).
- ❌ Grey borders instead of ink rules.
- ❌ A block shadow on panels, sections or content cards — the block is earned, not ambient.
- ❌ Prose in monospace. Mono is for labels and actions.
- ❌ Accent-coloured underlines and hairlines as "selection" cues — a chosen state is a
  **stamped block** (accent fill + paper label), not a tint or a coloured hairline.
- ❌ Soft or ambient `box-shadow` of any kind, and `backdrop-filter` blur. Brut does not blur.
- ❌ Rounded badges, pills or progress bars — while a radio stays round.
- ❌ Arbitrary inline utilities that emit no CSS because they're outside the whitelist.
- ❌ Browser-default scrollbars inside an otherwise fully themed sheet. The OS should
  never be visibly speaking on the page.
- ❌ Emoji as icons, and glyphs that render as tofu in the mono voice.
- ❌ Light-mode-only styling on a component that also appears in dark.
- ❌ Declaring it done without a screenshot in both modes.

---

# Appendix A — The token contract

Verbatim from `nsg-ui@0.1.0`, `src/styles/themes/modern-brut.css` (token blocks). If
the library has moved on, re-check these rather than trusting them blindly.

## A.1 Anchors (light)

```css
--nsg-ink:        #111113;  /* text, rules, and every block */
--nsg-ink-soft:   #39393d;
--nsg-ink-deep:   #0a0a0c;  /* beyond the ink, for the ends of the ramp */
--nsg-paper:      #f4f4f2;  /* the field */
--nsg-paper-2:    #e6e6e3;  /* sunken sheets, table stripes */
--nsg-paper-3:    #cbcbc6;  /* internal rules */
--nsg-paper-light:#fafaf8;  /* the sheet, one step off the field */
--nsg-raised:     #ffffff;  /* sheets that sit on the field */
--nsg-muted:      #626269;  /* a TEXT step — must clear on field AND sunken */

--nsg-spot:       #005bac;  /* THE ONE SWAPPABLE VALUE — acts */
--nsg-spot-2:     #ff5b23;  /* conflict — a FILL: 2.9:1 on paper, never an ink */
--nsg-spot-2-deep:#c2410c;  /* the same conflict at ink strength (5.2:1) */
--nsg-spot-3:     #c8a000;  /* acid, darkened until it reads on paper */
--nsg-spot-3-ink: color-mix(in oklab, var(--nsg-spot-3) 58%, var(--nsg-ink));
--nsg-ok:         #127a45;  /* ok, and nothing else */
```

`--nsg-spot` is the **single** value every accent surface derives from: the whole
`--color-primary-*` ramp, the ring, an active nav row, a checked checkbox, a marked
menu row, the primary and danger action inks. One declaration re-inks the language.

## A.2 Semantic tokens

```css
--color-surface:         var(--nsg-paper);
--color-surface-raised:  var(--nsg-raised);
--color-surface-sunken:  var(--nsg-paper-2);
--color-surface-hover:   var(--nsg-paper-2);
--color-border:          var(--nsg-ink);   /* IS the ink. This is what makes it drawn. */
--color-border-subtle:   var(--nsg-paper-3);
--color-ring:            var(--nsg-spot);
--color-text:            var(--nsg-ink);
--color-text-secondary:  var(--nsg-ink-soft);
--color-text-muted:      var(--nsg-muted);

--color-primary:         var(--nsg-spot);
--color-primary-hover:   color-mix(in oklab, var(--nsg-spot) 88%, var(--nsg-ink));
--color-danger:          var(--nsg-spot-2-deep);
--color-danger-hover:    color-mix(in oklab, var(--nsg-spot-2-deep) 88%, var(--nsg-ink));
--color-success:         var(--nsg-ok);
--color-warning:         var(--nsg-spot-3-ink);
--color-info:            var(--nsg-spot);  /* the board has one action ink; info borrows it */
```

## A.3 The ramp recipe

Every ramp is **derived**, never a literal list — which is why dark mode needs no ramp
of its own: flipping the sheet/ink anchors flips every ramp with them.

```
50  → color-mix(anchor          8%, --nsg-raised)
100 → color-mix(anchor         16%, --nsg-raised)
200 → color-mix(anchor         30%, --nsg-raised)
300 → color-mix(anchor         46%, --nsg-raised)
400 → color-mix(anchor         68%, --nsg-raised)
500 → the ANCHOR
600 → color-mix(anchorOrDeep   88%, --nsg-ink)
700 → color-mix(anchorOrDeep   74%, --nsg-ink)
800 → color-mix(anchorOrDeep   58%, --nsg-ink)
900 → color-mix(anchorOrDeep   44%, --nsg-ink)
950 → color-mix(anchorOrDeep   32%, --nsg-ink)
```

The `500` step is where each ramp changes the value it mixes from, and it is a
**deliberate lightness jump** for the vivid inks:

| Ramp | 50–400 mix | 500 | 600–950 mix |
|---|---|---|---|
| `primary` / `info` | `--nsg-spot` | `--nsg-spot` | `--nsg-spot` |
| `danger` | `--nsg-spot-2` (the bright plate) | **`--nsg-spot-2-deep`** | `--nsg-spot-2-deep` |
| `warning` | `--nsg-spot-3` (the raw acid) | **`--nsg-spot-3-ink`** | `--nsg-spot-3-ink` |
| `success` | `--nsg-ok` | `--nsg-ok` | `--nsg-ok` |

The neutral ramp is the paper/ink axis, so it inverts in dark on its own:

```css
--color-neutral-50:  var(--nsg-paper-light);
--color-neutral-100: var(--nsg-paper);
--color-neutral-200: var(--nsg-paper-2);
--color-neutral-300: var(--nsg-paper-3);
--color-neutral-400: color-mix(in oklab, var(--nsg-ink) 52%, var(--nsg-paper));
--color-neutral-500: var(--nsg-muted);
--color-neutral-600: var(--nsg-ink-soft);
--color-neutral-700: color-mix(in oklab, var(--nsg-ink) 88%, var(--nsg-paper-2));
--color-neutral-800: color-mix(in oklab, var(--nsg-ink) 96%, var(--nsg-paper-2));
--color-neutral-900: var(--nsg-ink);
--color-neutral-950: var(--nsg-ink-deep);
```

## A.4 Type, geometry, depth

```css
--font-sans:    'Inter Tight', system-ui, -apple-system, sans-serif;
--font-display: 'Inter Tight', system-ui, -apple-system, sans-serif;
--font-mono:    'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace;

--nsg-border-width: 1.5px;
/* radius 0 at EVERY step, including full — squares badges and progress bars.
   A radio stays round: its circle is MEANING, not geometry, and theme.css pins it. */
--nsg-radius-xs/sm/md/lg/xl/full: 0;

--nsg-block:       6px 6px 0 var(--nsg-ink);  /* the screen's action, and a card's hover */
--nsg-block-float: 4px 4px 0 var(--nsg-ink);  /* menus and the other floating sheets */

--nsg-shadow-sm:   none;                       /* no rest shadows in this system */
--nsg-shadow-lg:   var(--nsg-block-float);
--nsg-shadow-xl:   var(--nsg-block-float);
--nsg-shadow-menu: var(--nsg-block-float);
--shadow-card:       none;
--shadow-card-hover: var(--nsg-block);

/* the action voice reads on the button's own size scale */
--nsg-font-size-action-sm/md/lg: 10px / 11px / 12px;
--nsg-font-size-badge-sm/md/lg:  10px / 11px / 12px;
```

**The block is tiered on purpose.** "One hard shadow" is about how *often* it is earned,
not about every surface getting the same one: the action gets 6px, things that hang off
a corner get 4px, and a centred dialog gets none.

## A.5 The page backdrop (opt-in)

```css
--nsg-page-backdrop:
  linear-gradient(rgba(17, 17, 19, 0.055) 1px, transparent 1px),
  linear-gradient(90deg, rgba(17, 17, 19, 0.055) 1px, transparent 1px),
  linear-gradient(rgba(17, 17, 19, 0.028) 1px, transparent 1px),
  linear-gradient(90deg, rgba(17, 17, 19, 0.028) 1px, transparent 1px);
--nsg-page-backdrop-size: 64px 64px, 64px 64px, 16px 16px, 16px 16px;
```

## A.6 Dark — only the anchors are restated

Every ramp recomputes itself from these, which is why there is no ramp list here.

```css
--nsg-ink:        #f2f2ef;
--nsg-ink-soft:   #c9c9c5;
--nsg-ink-deep:   #ffffff;
--nsg-paper:      #111113;
--nsg-paper-2:    #1b1b1e;
--nsg-paper-3:    #34343a;
--nsg-paper-light:#0c0c0e;
--nsg-raised:     #1d1d20;
--nsg-muted:      #b9b9bb;

--nsg-spot:       #7fb3de;  /* LIFTED — its own label must clear text on it (8.5:1) */
--nsg-spot-2:     #ff7a4d;
--nsg-spot-2-deep:#ff9a75;
--nsg-spot-3:     #e0bf34;
--nsg-ok:         #34c98a;

--color-surface-sunken: #0c0c0e;
/* an inked rule on an ink field is invisible, so dark rules step back up — but
   they are still the INK, not a grey: 45% of it clears 3.5:1 */
--color-border:        color-mix(in oklab, var(--nsg-ink) 45%, var(--nsg-paper));
--color-border-subtle: #26262b;

/* the block is the ink as a SHAPE — so on an ink field it steps back too,
   exactly as the rules do */
--nsg-block:       6px 6px 0 var(--color-border);
--nsg-block-float: 4px 4px 0 var(--color-border);
```

Dark's backdrop uses `rgba(244, 244, 242, 0.055)` and `rgba(244, 244, 242, 0.028)`.

`--color-primary-hover`, `--color-danger-hover` and `--nsg-spot-3-ink` recompute from
the anchors above, so they are **not** restated in dark.

---

# Appendix B — The markup contract (Path A)

The markup contract, quoted from the compiled library's own selectors.

A stylesheet you link, and plain HTML you write by hand. No build step, no npm
install, no framework, no JavaScript. Every component is a CSS class plus data
attributes.

Link it once in `<head>`, then mark the foundation on any wrapping element
(usually `<html>`):

```html
<html lang="en" data-nsg-theme="modern-brut">
```

Dark mode is a **second, independent axis** — add the class to the same element:

```html
<html lang="en" data-nsg-theme="modern-brut" class="dark">
```

What that gets you: hard 0px corners, ink rules on every surface, a solid offset block
behind the primary action, uppercase monospace labels, a 64px grid page texture, deep
blue accent (`#005bac`), orange conflict plate, acid-yellow state, green ok.

**Every component is a class plus data attributes** — the exact same attributes the
Solid components render.

### CARD — `data-kind`: `raised | flat | sunken`

```html
<div class="nsg-card" data-kind="raised">
  <h1 class="text-xl font-bold">Title</h1>
  <p class="mt-2 text-sm opacity-80">Body copy.</p>
</div>
```

### BADGE — `data-kind`: `neutral | info | success | warning | danger`
Add `nsg-badge-outline` for the outlined form. `data-size`: `sm | md | lg`

```html
<span class="nsg-badge" data-kind="warning" data-size="md">risk</span>
<span class="nsg-badge nsg-badge-outline" data-kind="danger" data-size="md">blocked</span>
```

### BUTTON — `data-kind`: `primary | secondary | ghost | danger | link`
Add the `nsg-button-outline` class for the outlined form. `data-size`: `sm | md | lg | icon`

```html
<button type="button" class="nsg-button" data-kind="primary" data-size="md">Ship it</button>
<button type="button" class="nsg-button nsg-button-outline" data-kind="danger" data-size="md">Roll back</button>
```

### PROGRESS — the label lives in a `header` wrapper, not on the root

Set the fill width with an inline style, and keep the aria values.

```html
<div class="nsg-progress" data-size="md" role="progressbar"
     aria-label="Adoption" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100">
  <div data-nsg-progress="header">
    <span data-nsg-progress="label">Adoption</span>
    <span data-nsg-progress="value-label">62%</span>
  </div>
  <div data-nsg-progress="track">
    <div data-nsg-progress="fill" data-kind="primary" style="width: 62%"></div>
  </div>
</div>
```

### SEPARATOR

```html
<div class="nsg-separator mt-4 mb-4" role="separator"></div>
```

### ACCORDION — use native `<details>`/`<summary>`; no JavaScript needed

The parts are data attributes on the children, not classes on their own.

```html
<details class="nsg-accordion">
  <summary data-nsg-accordion="trigger">
    <span data-nsg-accordion="trigger-label">Phase 1 — discovery</span>
  </summary>
  <div data-nsg-accordion="content">
    <p>…</p>
  </div>
</details>
```

> **Note:** the chevron rotation is driven by a `[data-expanded]` attribute that only
> the Solid component sets. Native `<details>` will not rotate anything, so **omit a
> trigger icon** rather than shipping one that never moves.

## B.1 Layout: the fixed utility vocabulary

There is no Tailwind pipeline here, so **only the utilities below are compiled** into
the stylesheet. An `nsg-*` class always works. An arbitrary utility emits no rule and
silently does nothing — so stay inside this list, and use a real class or a small
`<style>` block for anything outside it.

```
max-w-2xs xs sm md lg xl 2xl 3xl 4xl 5xl 6xl 7xl none
mx-auto    w-full    w-fit
space-y-1 2 3 4 6 8 10 12 16
gap-1 2 3 4 6 8
flex    flex-col    flex-row    flex-wrap
items-center    items-start    items-end
justify-between    justify-center
text-left    text-center    text-right
text-xs sm base lg xl 2xl 3xl
font-medium    font-semibold    font-bold
uppercase    tracking-wide    tracking-widest
opacity-60 70 80
p-4 6 8 10    mt-2 4 6    mb-2 4 6
```

## B.2 Two things that bite

1. **Cards and other block components carry no default spacing between their
   children.** A heading, a paragraph and a button written as siblings sit flush
   against each other. Add `mt-*`/`mb-*` yourself.
2. **Prefer flex row with `gap`** for a row of badges or buttons; margins on siblings
   are what cause the uneven gaps.

## B.3 Out of scope for this path

Dialog, Popover, DropdownMenu, ContextMenu, Toast, Tabs, Checkbox, RadioGroup,
ComboBox, TextInput, NumberInput, SegmentedControl, ToggleButton, CommandBar,
ThemePicker. These are **behaviour rather than style** — they need SolidJS, which this
path deliberately does not load. Express the same idea with plain HTML: a `<details>`
for a disclosure, a bordered card for a callout, a list for a menu.

*(If a mockup needs one of these, that is exactly the case for **Path B** — port the
tokens and build it in your own stylesheet.)*

## B.4 Re-inking

The accent is one declaration. Override **after** the stylesheet, and remember it is a
**pair**:

```html
<style>
  [data-nsg-theme='modern-brut']      { --nsg-spot: #a61e63; }
  [data-nsg-theme='modern-brut'].dark { --nsg-spot: #fbcfe8; }
</style>
```

Dark needs its own, **lighter** value — reusing the light one fails contrast (~2.8:1).
Keep hue, change lightness.

## B.5 A complete starting point

```html
<!doctype html>
<html lang="en" data-nsg-theme="modern-brut">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Document title</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nsg-ui@0.1.0/dist/standalone/modern-brut.min.css">
  </head>
  <body class="p-10">
    <div class="mx-auto max-w-2xl space-y-6"> … </div>
  </body>
</html>
```

---

# Provenance

Inlined from **`nsg-ui@0.1.0`**:

| Section | Source |
|---|---|
| Appendix A | `src/styles/themes/modern-brut.css`, token blocks (source lines 480–741) |
| Appendix A.3 ramp recipe | the same file — stated as the formula the declarations follow rather than as 60 generated lines |
| Appendix B | the compiled selectors in `dist/standalone/modern-brut.css` |

Both are verbatim in substance. If the library has moved on, re-check the anchors in
A.1 and A.6 first — those are the ones that would silently change the whole look.

