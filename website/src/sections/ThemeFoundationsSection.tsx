import type { Component } from "solid-js";
import { createSignal, For } from "solid-js";
import {
	Badge,
	Button,
	Card,
	Progress,
	TextInput,
	THEME_FOUNDATIONS,
	ThemePicker,
	ToggleButton,
} from "nsg-ui";
import { DemoWithCode } from "../components/CodeBlock";
import { Section } from "../components/section";

export function ThemeFoundationsIcon(props: { class?: string }) {
	return (
		<svg
			class={props.class}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
		>
			<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
		</svg>
	);
}

const pickerCode = `import { ThemePicker } from 'nsg-ui'

<ThemePicker />                      // every shipped foundation, with its swatch
<ThemePicker withSwatches={false} /> // labels only`;

const subtreeCode = `// any element can carry its own foundation — scope it to compare designs
<div>
  <Button>Ship it</Button>        // the built-in default look
</div>

<div data-nsg-theme="modern-brut">
  <Button>Ship it</Button>
</div>`;

const importCode = `/* app.css */
@import 'tailwindcss';
@import 'nsg-ui/theme.css';

/* one stylesheet per foundation: ship only the ones you offer */
@import 'nsg-ui/themes/modern-brut.css';`;

const attributeCode = `<!-- light/dark is one axis, the foundation is another -->
<html data-nsg-theme="modern-brut" class="dark">`;

const programmaticCode = `import { applyThemeFoundation } from 'nsg-ui/themes'

applyThemeFoundation('modern-brut')  // attribute + localStorage`;

export const ThemeFoundationsSection: Component = () => {
	// One shared signal for the field inside every preview panel: the panels are
	// about how the same component is drawn, not about the value.
	const [workspace, setWorkspace] = createSignal("");

	return (
		<Section
			id="theme-foundations"
			header={{
				title: "Theme Foundations",
				icon: ThemeFoundationsIcon,
				description:
					"A whole design language — colour, type and geometry — for every component at once, switched with one attribute. Nothing in your markup changes; each foundation is a separate stylesheet, so you only ship the ones you offer.",
			}}
		>
			<DemoWithCode
				title="Switch the whole design"
				description="Applies data-nsg-theme to <html> and remembers the choice in localStorage."
				code={pickerCode}
			>
				<div class="flex flex-wrap items-center gap-4">
					<ThemePicker />
					<ThemePicker withSwatches={false} />
				</div>
			</DemoWithCode>

			<DemoWithCode
				title="One design per subtree"
				description="The attribute is not root-only: scope it to compare designs, or to keep one region on the default look."
				code={subtreeCode}
			>
				<div class="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
					<For each={THEME_FOUNDATIONS}>
						{(foundation) => (
							<div
								data-nsg-theme={
									foundation.id === "default" ? undefined : foundation.id
								}
								class="rounded-lg border border-border overflow-hidden"
							>
								<div class="px-4 py-2.5 border-b border-border-subtle bg-surface-sunken">
									<p class="text-text text-sm font-semibold">{foundation.label}</p>
									<p class="text-text-muted text-xs">{foundation.description}</p>
								</div>

								<div class="p-4 flex flex-col gap-3 bg-surface">
									<div class="flex flex-wrap items-center gap-2">
										<Button kind="primary" size="sm">
											Deploy
										</Button>
										<Button kind="secondary" size="sm">
											Apply
										</Button>
										<Button kind="ghost" size="sm">
											Cancel
										</Button>
									</div>

									<div class="flex flex-wrap items-center gap-2">
										<Badge kind="neutral">idle</Badge>
										<Badge kind="success">ok</Badge>
										<Badge kind="warning">queued</Badge>
										<Badge kind="danger">failed</Badge>
									</div>

									<Card kind="raised" class="flex flex-col gap-2">
										<p class="text-text text-sm font-medium">Sheet 41</p>
										<p class="text-text-secondary text-xs">
											A card, a field-below it, and a toggle — the same components, four designs.
										</p>
										{/* A bar with no name is an unnamed widget; the preview
										    has no visible caption, so it is named for what
										    it is showing. */}
										<Progress
											value={64}
											size="sm"
											aria-label={`${foundation.label} progress`}
										/>
									</Card>

									<div class="flex items-center gap-2">
										<TextInput
											value={workspace()}
											onChange={setWorkspace}
											placeholder="workspace"
											class="flex-1"
										/>
										<ToggleButton>auto</ToggleButton>
									</div>
								</div>
							</div>
						)}
					</For>
				</div>
			</DemoWithCode>

			<DemoWithCode
				title="Importing a foundation"
				description="Foundations are plain CSS: no Tailwind, no @apply, no build step. Import them after nsg-ui/theme.css, or link them directly."
				code={importCode}
			>
				<div class="flex flex-col gap-3">
					<p class="text-text-secondary text-sm">
						Each foundation lives in its own file —{" "}
						<code class="text-text text-xs">nsg-ui/themes/&lt;id&gt;.css</code> — so a project
						that offers two foundations ships two stylesheets and pays nothing for{" "}
						<code class="text-text text-xs">default</code>, which is the built-in look and has
						no file at all.
					</p>
					<div class="flex flex-wrap gap-2">
						<For each={THEME_FOUNDATIONS.filter((f) => f.stylesheet)}>
							{(foundation) => <Badge kind="neutral">{foundation.stylesheet}</Badge>}
						</For>
					</div>
				</div>
			</DemoWithCode>

			<DemoWithCode
				title="Selecting it"
				description="An attribute, so it composes with dark mode and needs no provider."
				code={`${attributeCode}\n\n${programmaticCode}`}
			>
				<p class="text-text-secondary text-sm">
					The foundation sets the token contract (ink, paper, the inks, five ramps), the type
					stack, and the geometry — radius, stroke weight, elevation — through nsg-ui's shape
					tokens. Dark mode is derived, not duplicated: flip the ink/paper axis and every ramp
					recomputes itself. The full contract, and how to port another board, is in{" "}
					<code class="text-text text-xs">docs/themes.md</code>.
				</p>
			</DemoWithCode>
		</Section>
	);
};