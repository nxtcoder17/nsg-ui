import type { Component } from "solid-js";
import { Button, Card } from "nsg-ui";
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

const installCode = `bun add nsg-ui @kobalte/core solid-js
# npm install nsg-ui @kobalte/core solid-js
# pnpm add nsg-ui @kobalte/core solid-js`;

const stylesCode = `/* app.css */
@import 'tailwindcss';
@import 'nsg-ui/theme.css';

/* optional: a whole design language, switched with one attribute */
@import 'nsg-ui/themes/modern-brut.css';`;

const usageCode = `import { Button } from 'nsg-ui'

export function App() {
  return <Button kind="primary">Ship it</Button>
}`;

/** A numbered step whose body is a single code block. */
const Step: Component<{
	title: string;
	description: string;
	code: string;
	language?: string;
}> = (props) => (
	<Card class="p-0">
		<div class="px-6 py-4 border-b border-border-subtle">
			<h3 class="font-semibold text-text text-[15px]">{props.title}</h3>
			<p class="text-text-muted text-sm mt-1">{props.description}</p>
		</div>
		<div class="p-6">
			<CodeBlock code={props.code} language={props.language} />
		</div>
	</Card>
);

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
				<Step
					title="1 · Install the package"
					description="SolidJS and Kobalte are peer dependencies, so they are installed alongside it."
					code={installCode}
					language="bash"
				/>

				<Step
					title="2 · Import the styles"
					description="The theme registers the library's own components as Tailwind sources, so this one line is the whole setup. Theme foundations are separate stylesheets you only ship if you offer them."
					code={stylesCode}
					language="css"
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
