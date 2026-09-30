import { type Component } from "solid-js";
import { Card } from "nsg-ui";
import { CodeBlock } from "../components/CodeBlock";
import { Section } from "../components/section";

export function SkillsIcon(props: { class?: string }) {
	return (
		<svg
			class={props.class}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
		>
			<path
				d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.2l5.9-.9L12 3z"
				stroke-linejoin="round"
			/>
		</svg>
	);
}

const skills = [
	{
		id: "nsg-ui-modern-brut-mockup",
		name: "nsg-ui-modern-brut-mockup",
		summary:
			"Static HTML mockups that mirror the Modern Brut foundation closely enough that a later rebuild with the real components is a mechanical port, not a redesign.",
	},
];

/** Where the site serves it, so the command and the link cannot disagree. */
const url = (id: string) => `https://nsg-ui.pages.dev/${id}/SKILL.md`;

export const SkillsSection: Component = () => {
	return (
		<Section
			id="skills"
			header={{
				title: "Skills",
				icon: SkillsIcon,
				description:
					"Agent skills that teach a model this design system. Point your agent at the file and it can write in the foundation without guessing at a token or a class.",
			}}
		>
			<div class="grid gap-6">
				{skills.map((skill) => (
					<Card class="p-0">
						<div class="px-6 py-4 border-b border-border-subtle">
							<div class="flex items-center justify-between gap-4">
								<h3 class="font-semibold text-text text-[15px] font-mono">
									{skill.name}
								</h3>
								<a href={`/${skill.id}/SKILL.md`} class="nsg-link text-sm whitespace-nowrap">
									/{skill.id}/SKILL.md
								</a>
							</div>
							<p class="text-text-muted text-sm mt-1">{skill.summary}</p>
						</div>
						<div class="p-6 grid gap-3">
							<CodeBlock
								language="bash"
								code={`mkdir -p .agents/skills/${skill.id}
curl -o .agents/skills/${skill.id}/SKILL.md ${url(skill.id)}`}
							/>
							<p class="text-text-muted text-sm">
								Drop it in{" "}
								<code class="text-text text-xs">.agents/skills/</code> or point your
								agent at the URL. It is self-sufficient — the token values, markup
								contract and utility whitelist are all inlined, so it needs no repo,
								no npm and no network.
							</p>
						</div>
					</Card>
				))}
			</div>
		</Section>
	);
};
