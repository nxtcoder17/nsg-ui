import type { Component } from "solid-js";
import { Badge } from "nsg-ui";
import { DemoCard } from "../components/DemoCard";
import { Section } from "../components/section";

export function BadgeIcon(props: { class?: string }) {
	return (
		<svg
			class={props.class}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
		>
			<rect x="3" y="7" width="18" height="10" rx="5" />
		</svg>
	);
}

export const BadgeSection: Component = () => {
	return (
		<Section
			id="badge"
			header={{
				title: "Badge",
				icon: BadgeIcon,
				description: "Small labels for status, counts, or categories.",
			}}
		>
			<DemoCard
				title="Filled"
				description="Subtle filled colors for various contexts"
			>
				<div class="flex flex-wrap gap-3">
					<Badge kind="neutral">Neutral</Badge>
					<Badge kind="info">Info</Badge>
					<Badge kind="success">Success</Badge>
					<Badge kind="warning">Warning</Badge>
					<Badge kind="danger">Danger</Badge>
				</div>
			</DemoCard>

			<DemoCard
				title="Outline"
				description="Outlined variants for all semantic kinds"
			>
				<div class="flex flex-wrap gap-3">
					<Badge kind="neutral" outline>
						Neutral
					</Badge>
					<Badge kind="info" outline>
						Info
					</Badge>
					<Badge kind="success" outline>
						Success
					</Badge>
					<Badge kind="warning" outline>
						Warning
					</Badge>
					<Badge kind="danger" outline>
						Danger
					</Badge>
				</div>
			</DemoCard>

			<DemoCard title="Sizes" description="Small, medium, and large">
				<div class="flex flex-wrap items-center gap-3">
					<Badge size="sm">Small</Badge>
					<Badge size="md">Medium</Badge>
					<Badge size="lg">Large</Badge>
				</div>
			</DemoCard>

			<DemoCard title="With Icons" description="Combine with icons for context">
				<div class="flex flex-wrap gap-3">
					<Badge kind="success">
						<span class="flex items-center gap-1">
							<svg
								class="w-3 h-3"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
							>
								<polyline points="20 6 9 17 4 12" />
							</svg>
							Verified
						</span>
					</Badge>
					<Badge kind="danger">
						<span class="flex items-center gap-1">
							<svg
								class="w-3 h-3"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<circle cx="12" cy="12" r="10" />
								<line x1="12" y1="8" x2="12" y2="12" />
								<line x1="12" y1="16" x2="12.01" y2="16" />
							</svg>
							Error
						</span>
					</Badge>
					<Badge kind="warning">
						<span class="flex items-center gap-1">
							<svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
								<circle cx="12" cy="12" r="5" />
							</svg>
							Pending
						</span>
					</Badge>
				</div>
			</DemoCard>

			<DemoCard title="Use Cases" description="Common badge patterns">
				<div class="space-y-4">
					<div class="flex items-center gap-2">
						<span class="text-sm text-text">Notifications</span>
						<Badge kind="danger" size="sm">
							3
						</Badge>
					</div>
					<div class="flex items-center gap-2">
						<span class="text-sm text-text">Status</span>
						<Badge kind="success" size="sm">
							Active
						</Badge>
						<Badge kind="neutral" size="sm" outline>
							Inactive
						</Badge>
					</div>
					<div class="flex items-center gap-2">
						<span class="text-sm text-text">Tags</span>
						<Badge size="sm">React</Badge>
						<Badge size="sm">TypeScript</Badge>
						<Badge size="sm">Tailwind</Badge>
					</div>
				</div>
			</DemoCard>
		</Section>
	);
};
