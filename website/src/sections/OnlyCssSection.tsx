import { type Component } from "solid-js";
import { Card } from "nsg-ui";
import { CodeBlock } from "../components/CodeBlock";
import { Section } from "../components/section";

export function OnlyCssIcon(props: { class?: string }) {
	return (
		<svg
			class={props.class}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
		>
			<path d="M9 8L5 12l4 4M15 8l4 4-4 4" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	);
}

/**
 * One link, not two. `standalone/<id>.min.css` is the compiled component layer with
 * that one foundation appended, so it is the only request a page needs — the
 * same "pay for one foundation and nothing else" rule the bundler path follows.
 * Minified: 13.9 KB over the wire, against 29.3 KB readable.
 *
 * Pinned rather than `@latest` on purpose — see the note in the section body.
 */
const linkCode = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nsg-ui@0.1.0/dist/standalone/modern-brut.min.css">`;

const attrCode = `<!-- the foundation is one attribute; light/dark is a second, independent one -->
<html data-nsg-theme="modern-brut">
<!-- add class="dark" for the dark axis -->`;

const cardCode = `<div class="nsg-card" data-kind="raised">
  <p class="text-xs uppercase tracking-widest opacity-60">Phase 2</p>
  <h1 class="text-xl font-bold">Auth rewrite</h1>
  <p class="mt-2 text-sm opacity-80">Migrate session handling off the legacy cookie jar.</p>
</div>`;

const badgeCode = `<span class="nsg-badge" data-kind="warning" data-size="md">risk</span>
<span class="nsg-badge" data-kind="success" data-size="md">on track</span>
<span class="nsg-badge nsg-badge-outline" data-kind="danger" data-size="md">blocked</span>`;

const progressCode = `<div class="nsg-progress" data-size="md" role="progressbar"
     aria-label="Adoption" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100">
  <div data-nsg-progress="header">
    <span data-nsg-progress="label">Adoption</span>
    <span data-nsg-progress="value-label">62%</span>
  </div>
  <div data-nsg-progress="track">
    <div data-nsg-progress="fill" data-kind="primary" style="width: 62%"></div>
  </div>
</div>`;

/**
 * The prompt to hand an LLM. Deliberately a paste, not a link to read first:
 * the whole point is that the model can be given this text and start writing.
 */
const promptCode = `Read this before you write any HTML.

I need a self-contained HTML document that uses the nsg-ui "Only CSS"
design system. The full reference is here — read it first:

  https://nsg-ui.pages.dev/only-css.txt

Rules:
- Link https://cdn.jsdelivr.net/npm/nsg-ui@0.1.0/dist/standalone/modern-brut.min.css
  and mark <html data-nsg-theme="modern-brut">.
  Do not install anything, and do not write a build step.
- Only use the components and layout classes listed in that reference file.
  Anything outside that list renders as nothing, so if you need something it
  does not cover, write a small <style> block rather than inventing a class.
- Prefer plain HTML over a component that needs JavaScript. Use <details>
  for disclosure, a bordered card for a callout.
- Keep the markup accessible: real headings in order, labelled controls,
  alt text on images.

Ask me nothing about styling. Just write the document.`;

/**
 * The full page, so an LLM can be handed this verbatim and have a working
 * document. Deliberately complete: two tags of CSS and no build step.
 */
const pageCode = `<!doctype html>
<html lang="en" data-nsg-theme="modern-brut">
  <head>
    <meta charset="utf-8" />
    <title>Migration plan</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nsg-ui@0.1.0/dist/standalone/modern-brut.min.css">
  </head>
  <body class="p-10">
    <div class="mx-auto max-w-2xl space-y-6">…</div>
  </body>
</html>`;

export const OnlyCssSection: Component = () => {
	return (
		<Section
			id="only-css"
			header={{
				title: "Only CSS",
				icon: OnlyCssIcon,
				description:
					"The components are CSS, not just JSX. Link one stylesheet and hand-write the markup — no build, no npm, no framework. Made for documents an LLM is asked to produce.",
			}}
		>
			<div class="grid gap-6">
				<Card class="p-0">
					<div class="px-6 py-4 border-b border-border-subtle">
						<h3 class="font-semibold text-text text-[15px]">
							Let an LLM write in this system
						</h3>
						<p class="text-text-muted text-sm mt-1">
							Give a model the prompt below and it can write this design system on its
							own. It points at{" "}
							<a href="/only-css.txt" class="nsg-link">
								/only-css.txt
							</a>
							, a plain-text reference of every component, every valid layout class and
							the traps — so it never has to guess at a class that would render as
							nothing.
						</p>
					</div>
					<div class="p-6">
						<CodeBlock code={promptCode} language="bash" />
					</div>
				</Card>

				<Card class="p-0">
					<div class="px-6 py-4 border-b border-border-subtle">
						<h3 class="font-semibold text-text text-[15px]">
							1 · Link the stylesheet
						</h3>
						<p class="text-text-muted text-sm mt-1">
							One file holds the components and one foundation, already compiled. It is
							plain CSS with no build step of its own.
						</p>
					</div>
					<div class="p-6">
						<CodeBlock code={linkCode} language="html" />
					</div>
					<div class="px-6 pb-6">
						<p class="text-text-muted text-sm">
							Two notes. The file is minified — 13.9 KB over the wire against 29.3 KB
							readable — and it is pinned to a version rather than{" "}
							<code class="text-text text-xs">@latest</code>, because a bare latest will
							quietly stop resolving after a release that moves the file. Until a
							version carrying these files is published you can link the package on
							disk instead:{" "}
							<code class="text-text text-xs">
								./node_modules/nsg-ui/dist/standalone/modern-brut.min.css
							</code>
						</p>
					</div>
				</Card>

				<Card class="p-0">
					<div class="px-6 py-4 border-b border-border-subtle">
						<h3 class="font-semibold text-text text-[15px]">2 · Set the foundation</h3>
						<p class="text-text-muted text-sm mt-1">
							Light and dark are two independent axes. Add <code class="text-text text-xs">class="dark"</code>{" "}
							for the dark one.
						</p>
					</div>
					<div class="p-6">
						<CodeBlock code={attrCode} language="html" />
					</div>
				</Card>

				<Card class="p-0">
					<div class="px-6 py-4 border-b border-border-subtle">
						<h3 class="font-semibold text-text text-[15px]">3 · Write the markup</h3>
						<p class="text-text-muted text-sm mt-1">
							Every component is a class plus data attributes — the same ones the Solid
							components render. Card, Badge, Button, Progress, Separator, Text, Link
							and Row/Column need no JavaScript at all.
						</p>
					</div>
					<div class="p-6 grid gap-4">
						<CodeBlock code={cardCode} language="html" />
						<CodeBlock code={badgeCode} language="html" />
						<CodeBlock code={progressCode} language="html" />
					</div>
				</Card>

				<Card class="p-0">
					<div class="px-6 py-4 border-b border-border-subtle">
						<h3 class="font-semibold text-text text-[15px]">
							A whole page
						</h3>
						<p class="text-text-muted text-sm mt-1">
							This is the complete starting point — paste it into a file and it renders.
						</p>
					</div>
					<div class="p-6">
						<CodeBlock code={pageCode} language="html" />
					</div>
				</Card>

				<Card class="p-0">
					<div class="px-6 py-4 border-b border-border-subtle">
						<h3 class="font-semibold text-text text-[15px]">
							What works without JavaScript
						</h3>
					</div>
					<div class="p-6">
						<ul class="space-y-2 text-sm text-text-secondary">
							<li>
								<strong class="text-text">Static:</strong> Card, Badge, Button, Progress,
								Separator, Text, Link, Row, Column, and every colour token.
							</li>
							<li>
								<strong class="text-text">Native, still no JS:</strong> Accordion works if you
								hand-write <code class="text-text text-xs">&lt;details&gt;</code> and{" "}
								<code class="text-text text-xs">&lt;summary&gt;</code>.
							</li>
							<li>
								<strong class="text-text">Needs Solid:</strong> Dialog, Popover, menus, Toast,
								Tabs, ComboBox and the rest — these are behaviour, not style, so they stay in
								the component library. This path styles them but does not run them.
							</li>
						</ul>
					</div>
				</Card>

				<Card class="p-0">
					<div class="px-6 py-4 border-b border-border-subtle">
						<h3 class="font-semibold text-text text-[15px]">
							Layout is a fixed vocabulary
						</h3>
						<p class="text-text-muted text-sm mt-1">
							There is no Tailwind pipeline here, so only a small, deliberate set of layout
							utilities ships: width, spacing, flow, alignment and type scale. An{" "}
							<code class="text-text text-xs">nsg-*</code> class always works; an arbitrary
							utility silently does nothing. Keep layout to the vocabulary below.
						</p>
					</div>
					<div class="p-6">
						<CodeBlock
							language="css"
							code={`max-w-2xl  mx-auto  w-full
space-y-2 4 6 8 10 12 16      gap-1 2 3 4 6 8
flex  flex-col  flex-wrap  items-center  justify-between
text-xs sm base lg xl 2xl 3xl   font-medium semibold bold
uppercase  tracking-wide  tracking-widest
p-4 6 8 10   mt-2 4 6   mb-2 4 6   opacity-60 70 80`}
						/>
					</div>
				</Card>
			</div>
		</Section>
	);
};
