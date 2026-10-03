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

const subtreeCode = `// the attribute is not root-only: scope a theme to one region
<div data-nsg-theme="modern-brut">
  <Button>Ship it</Button>
</div>`;

const importCode = `/* app.css — one import per theme: component layer + that design */
@import 'tailwindcss';
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
					"A whole design language — colour, type and geometry — for every component at once, switched with one attribute. Nothing in your markup changes; each theme is one self-contained import, so the choice reads the same for every design.",
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
				description="The attribute is not root-only: scope the theme to a region instead of the whole document."
				code={subtreeCode}
			>
				<div class="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
					<For each={THEME_FOUNDATIONS}>
						{(foundation) => (
							<div
								data-nsg-theme={foundation.id}
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
											A card, a field below it, and a toggle — the same components as everywhere else.
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
				title="Importing a theme"
				description="A theme owns its styling end to end: one import is the whole component layer plus that design. For a no-build page, link the compiled build instead."
				code={importCode}
			>
				<div class="flex flex-col gap-3">
					<p class="text-text-secondary text-sm">
						Each theme has its own entry —{" "}
						<code class="text-text text-xs">nsg-ui/themes/&lt;id&gt;.css</code> — carrying
						the whole component layer plus its design. Importing two repeats the shared
						component layer once per theme.
					</p>
					<div class="flex flex-wrap gap-2">
						<For each={THEME_FOUNDATIONS}>
							{(foundation) => (
								<Badge kind="neutral">{`nsg-ui/themes/${foundation.id}.css`}</Badge>
							)}
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