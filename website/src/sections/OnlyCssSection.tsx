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
 * The whole feature. The consumer is a model, not a reader, so the prompt is
 * the only thing here — the reference it points at carries the components, the
 * valid layout classes and the traps, and none of that needs restating in prose.
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

export const OnlyCssSection: Component = () => {
	return (
		<Section
			id="only-css"
			header={{
				title: "Only CSS",
				icon: OnlyCssIcon,
				description:
					"Every component is plain CSS, so it can be used in any HTML page — no build, no npm, no framework.",
			}}
		>
			<div class="grid gap-6">
				<Card class="p-0">
					<div class="px-6 py-4 border-b border-border-subtle">
						<h3 class="font-semibold text-text text-[15px]">Give this to your LLM</h3>
						<p class="text-text-muted text-sm mt-1">
							It points at{" "}
							<a href="/only-css.txt" class="nsg-link">
								/only-css.txt
							</a>
							, which carries the components, the valid layout classes and the traps.
						</p>
					</div>
					<div class="p-6">
						<CodeBlock code={promptCode} language="bash" />
					</div>
				</Card>
			</div>
		</Section>
	);
};
