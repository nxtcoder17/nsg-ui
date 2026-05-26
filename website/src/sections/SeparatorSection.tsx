import type { Component } from "solid-js";
import { Separator } from "nsg-ui";
import { DemoCard } from "../components/DemoCard";
import { Section } from "../components/section";

export function SeparatorIcon(props: { class?: string }) {
	return (
		<svg
			class={props.class}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
		>
			<line x1="3" y1="12" x2="21" y2="12" />
		</svg>
	);
}

export const SeparatorSection: Component = () => {
	return (
		<Section
			id="separator"
			header={{
				title: "Separator",
				icon: SeparatorIcon,
				description: "Visually or semantically separates content.",
			}}
		>
			<div class="grid gap-6">
				<DemoCard
					title="Horizontal"
					description="Default separator orientation"
				>
					<div class="space-y-4 max-w-sm">
						<div class="text-sm text-text">Section One</div>
						<Separator />
						<div class="text-sm text-text">Section Two</div>
						<Separator />
						<div class="text-sm text-text">Section Three</div>
					</div>
				</DemoCard>

				<DemoCard title="Vertical" description="Use in horizontal layouts">
					<div class="flex items-center gap-4 h-6">
						<span class="text-sm text-text">Home</span>
						<Separator orientation="vertical" />
						<span class="text-sm text-text">Products</span>
						<Separator orientation="vertical" />
						<span class="text-sm text-text">About</span>
						<Separator orientation="vertical" />
						<span class="text-sm text-text">Contact</span>
					</div>
				</DemoCard>

				<DemoCard title="In Cards" description="Separating card content">
					<div class="max-w-sm rounded-lg border border-border bg-surface-raised p-4">
						<div class="font-medium text-text">Card Title</div>
						<div class="text-sm text-text-secondary mt-1">
							Card description goes here
						</div>
						<Separator class="my-4" />
						<div class="flex justify-between text-sm">
							<span class="text-text-secondary">Status</span>
							<span class="text-text">Active</span>
						</div>
						<Separator class="my-4" />
						<div class="flex gap-2">
							<button class="text-sm text-primary-500 hover:underline">
								Edit
							</button>
							<Separator orientation="vertical" class="h-5" />
							<button class="text-sm text-danger-500 hover:underline">
								Delete
							</button>
						</div>
					</div>
				</DemoCard>
			</div>
		</Section>
	);
};
