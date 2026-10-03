import { type Component, createSignal, For, Show } from "solid-js";
import { Button, Card, SegmentedControl } from "nsg-ui";
import { CodeBlock, DemoWithCode } from "../components/CodeBlock";
import { Section } from "../components/section";

export function InstallationIcon(props: { class?: string }) {
	return (
		<svg
			class={props.class}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
		>
			<rect x="2.5" y="4" width="19" height="16" rx="2" />
			<path d="M6.5 9l3 3-3 3" />
			<path d="M12.5 15h5" />
		</svg>
	);
}

const packageManagers = [
	{ id: "bun", build: "add" },
	{ id: "npm", build: "install" },
	{ id: "pnpm", build: "add" },
] as const;

const stylesCode = `/* app.css */
@import 'tailwindcss';
@import 'nsg-ui/theme.css';

/* optional: a whole design language — importing the stylesheet ships the
   rules, but they are scoped to data-nsg-theme and match nothing until
   you select it on <html> (see step 2's note) */
@import 'nsg-ui/themes/modern-brut.css';`;

const foundationCode = `<!-- the import alone is inert: select the foundation -->
<html lang="en" data-nsg-theme="modern-brut">`;

const usageCode = `import { Button } from 'nsg-ui'

export function App() {
  return <Button kind="primary">Ship it</Button>
}`;

/** A numbered step whose body is one or two code blocks. The second is for the
 *  other half of a step that spans two files (a stylesheet and the markup that
 *  selects it), so the pair reads as one instruction. */
const Step: Component<{
	title: string;
	description: string;
	code: string;
	language?: string;
	secondaryCode?: string;
	secondaryLanguage?: string;
}> = (props) => (
	<Card class="p-0">
		<div class="px-6 py-4 border-b border-border-subtle">
			<h3 class="font-semibold text-text text-[15px]">{props.title}</h3>
			<p class="text-text-muted text-sm mt-1">{props.description}</p>
		</div>
		<div class="px-6 pb-5 space-y-3">
			<CodeBlock code={props.code} language={props.language} />
			<Show when={props.secondaryCode}>
				<CodeBlock code={props.secondaryCode!} language={props.secondaryLanguage} />
			</Show>
		</div>
	</Card>
);

const InstallStep: Component = () => {
	const [pm, setPm] = createSignal(packageManagers[0].id);
	const verb = () => packageManagers.find((m) => m.id === pm())!.build;

	return (
		<Card class="p-0">
			<div class="px-6 py-4 border-b border-border-subtle">
				<h3 class="font-semibold text-text text-[15px]">1 · Install the package</h3>
				<p class="text-text-muted text-sm mt-1">
					SolidJS and Kobalte are peer dependencies, so they are installed alongside it.
				</p>
				<div class="mt-3">
					<SegmentedControl
						aria-label="Package manager"
						value={pm()}
						onChange={setPm}
					>
						<For each={packageManagers}>
							{(option) => (
								<SegmentedControl.Item value={option.id}>
									{option.id}
								</SegmentedControl.Item>
							)}
						</For>
					</SegmentedControl>
				</div>
			</div>
			<div class="px-6 pb-5">
				<CodeBlock code={`${pm()} ${verb()} nsg-ui @kobalte/core solid-js`} language="bash" />
			</div>
		</Card>
	);
};

export const InstallationSection: Component = () => {
	return (
		<Section
			id="installation"
			header={{
				title: "Installation",
				icon: InstallationIcon,
				description:
					"nsg-ui is a SolidJS component library styled with Tailwind CSS 4. Add it to a project in three steps.",
			}}
		>
			<div class="grid gap-6">
				<InstallStep />

				<Step
					title="2 · Import the styles"
					description="The theme registers the library's own components as Tailwind sources, so this one line is the whole setup. Theme foundations are separate stylesheets you only ship if you offer them — but a foundation is scoped to data-nsg-theme, so the import alone matches nothing. Select it on <html>, where the base font rule resolves."
					code={stylesCode}
					language="css"
					secondaryCode={foundationCode}
					secondaryLanguage="markup"
				/>

				<DemoWithCode
					title="3 · Use it"
					description="Everything is a plain import — no provider, no config, no wrapper."
					code={usageCode}
				>
					<div class="flex flex-wrap items-center gap-3">
						<Button kind="primary">Ship it</Button>
						<Button kind="secondary" outline>
							Secondary
						</Button>
						<Button kind="ghost">Ghost</Button>
					</div>
				</DemoWithCode>

				<Card class="p-0">
					<div class="px-6 py-4 border-b border-border-subtle">
						<h3 class="font-semibold text-text text-[15px]">Requirements</h3>
					</div>
					<div class="p-6">
						<ul class="space-y-2 text-sm text-text-secondary">
							<li>
								SolidJS <code class="text-text text-xs">1.9+</code> and Kobalte{" "}
								<code class="text-text text-xs">0.13+</code> as peers.
							</li>
							<li>
								Tailwind CSS <code class="text-text text-xs">4</code>. The
								library ships compiled CSS tokens, not a Tailwind config.
							</li>
							<li>
								Dark mode follows the <code class="text-text text-xs">.dark</code>{" "}
								class on <code class="text-text text-xs">&lt;html&gt;</code>;
								design foundations switch with{" "}
								<code class="text-text text-xs">data-nsg-theme</code> — see{" "}
								<a href="#theme-foundations" class="nsg-link">
									Theme Foundations
								</a>
								.
							</li>
						</ul>
					</div>
				</Card>
			</div>
		</Section>
	);
};
