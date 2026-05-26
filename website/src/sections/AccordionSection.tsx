import { type Component, createSignal } from "solid-js";
import { Accordion } from "nsg-ui";
import { DemoCard } from "../components/DemoCard";
import { Section } from "../components/section";

export function AccordionIcon(props: { class?: string }) {
	return (
		<svg
			class={props.class}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
		>
			<rect x="3" y="3" width="18" height="5" rx="1" />
			<rect x="3" y="10" width="18" height="5" rx="1" />
			<rect x="3" y="17" width="18" height="5" rx="1" />
		</svg>
	);
}

export const AccordionSection: Component = () => {
	const [expanded, setExpanded] = createSignal<string[]>([]);

	return (
		<Section
			id="accordion"
			header={{
				title: "Accordion",
				icon: AccordionIcon,
				description:
					"Vertically stacked sections that expand to reveal content.",
			}}
		>
			<DemoCard
				title="Basic"
				description="Single item open at a time (collapsible)"
			>
				<div class="max-w-lg">
					<Accordion collapsible>
						<Accordion.Item
							value="item-0"
							trigger={
								<div class="text-blue-700">I am written in blue color</div>
							}
						>
							Yes buddy, you are!
						</Accordion.Item>
						<Accordion.Item value="item-1" trigger="Is it accessible?">
							Yes! The accordion follows WAI-ARIA design patterns and supports
							full keyboard navigation.
						</Accordion.Item>
						<Accordion.Item value="item-2" trigger="Can I style it?">
							Absolutely. The component accepts class props and uses data
							attributes for state-based styling.
						</Accordion.Item>
						<Accordion.Item value="item-3" trigger="Is it animated?">
							Yes, it includes smooth expand/collapse animations using CSS
							keyframes.
						</Accordion.Item>
					</Accordion>
				</div>
			</DemoCard>

			<DemoCard
				title="Multiple"
				description="Allow multiple items open simultaneously"
			>
				<div class="max-w-lg">
					<Accordion multiple collapsible>
						<Accordion.Item value="item-1" trigger="Is it accessible?">
							Yes! The accordion follows WAI-ARIA design patterns and supports
							full keyboard navigation.
						</Accordion.Item>
						<Accordion.Item value="item-2" trigger="Can I style it?">
							Absolutely. The component accepts class props and uses data
							attributes for state-based styling.
						</Accordion.Item>
						<Accordion.Item value="item-3" trigger="Is it animated?">
							Yes, it includes smooth expand/collapse animations using CSS
							keyframes.
						</Accordion.Item>
					</Accordion>
				</div>
			</DemoCard>

			<DemoCard
				title="Controlled"
				description="Control expanded state externally"
			>
				<div class="max-w-lg space-y-4">
					<Accordion
						value={expanded()}
						onChange={setExpanded}
						multiple
						collapsible
					>
						<Accordion.Item value="item-1" trigger="Is it accessible?">
							Yes! The accordion follows WAI-ARIA design patterns and supports
							full keyboard navigation.
						</Accordion.Item>
						<Accordion.Item value="item-2" trigger="Can I style it?">
							Absolutely. The component accepts class props and uses data
							attributes for state-based styling.
						</Accordion.Item>
						<Accordion.Item value="item-3" trigger="Is it animated?">
							Yes, it includes smooth expand/collapse animations using CSS
							keyframes.
						</Accordion.Item>
					</Accordion>
					<div class="text-sm text-text-secondary">
						Expanded:{" "}
						<span class="font-mono text-primary-500">
							{expanded().length ? expanded().join(", ") : "none"}
						</span>
					</div>
					<div class="flex gap-2">
						<button
							onClick={() => setExpanded(["item-1", "item-2", "item-3"])}
							class="px-3 py-1 text-sm bg-neutral-100 rounded"
						>
							Expand All
						</button>
						<button
							onClick={() => setExpanded([])}
							class="px-3 py-1 text-sm bg-neutral-100 rounded"
						>
							Collapse All
						</button>
					</div>
				</div>
			</DemoCard>

			<DemoCard
				title="Rich Content & Disabled"
				description="Complex content with disabled state"
			>
				<div class="max-w-lg">
					<Accordion collapsible>
						<Accordion.Item value="installation" trigger="Installation">
							<div class="space-y-2">
								<p>Install the package using your preferred package manager:</p>
								<pre class="bg-neutral-100 p-2 rounded text-xs font-mono">
									bun add nsg-ui
								</pre>
							</div>
						</Accordion.Item>
						<Accordion.Item value="usage" trigger="Usage">
							<div class="space-y-2">
								<p>Import and use the component:</p>
								<pre class="bg-neutral-100 p-2 rounded text-xs font-mono overflow-x-auto">
									{`import { Accordion } from 'nsg-ui'

<Accordion collapsible>
  <Accordion.Item value="faq" trigger="Question?">
    Answer.
  </Accordion.Item>
</Accordion>`}
								</pre>
							</div>
						</Accordion.Item>
						<Accordion.Item value="disabled" trigger="Disabled Item" disabled>
							This item is disabled and cannot be expanded.
						</Accordion.Item>
					</Accordion>
				</div>
			</DemoCard>
		</Section>
	);
};
