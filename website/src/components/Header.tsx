import type { Component } from "solid-js";
import { Button } from "nsg-ui";
import { ThemeSwitcher } from "../../../src/components/theme-switcher";
import { ThemePicker } from "../../../src/components/theme-picker";
import { GitHubIcon } from "../icons";

export const Header: Component = () => {
	return (
		<header class="chrome-header sticky top-0 z-10 backdrop-blur-xl bg-surface/80 border-b border-border">
			<div class="max-w-5xl mx-auto px-8 py-4 flex items-center justify-between">
				<div>
					<h2 class="text-xl font-semibold text-text">Kitchen Sink</h2>
					<p class="text-text-muted text-sm">Explore all components</p>
				</div>
				<div class="flex items-center gap-3">
					{/* Which design language every component below is speaking. `size="sm"`
					    puts all three header controls on the same 28px step — the
					    picker defaults to `md` (32px), which is a step taller than
					    the switcher and the GitHub button beside it. */}
					<ThemePicker size="sm" />
					<ThemeSwitcher />

					{/* GitHub — a real Button, not a hand-rolled anchor. It used to carry
					    its own `bg-neutral-900 … rounded-lg` Tailwind, which the
					    foundation zeroed the radius of but left the fill, so it was the
					    one header control with a solid ink slab, no rule and no block
					    while both its neighbours had both. Its `chrome-action` class
					    only sets the type voice, which is why the mismatch was so easy
					    to miss. Now it is a secondary button like its siblings. */}
					<Button
						as="a"
						href="https://github.com/nxtcoder17/nsg-ui"
						target="_blank"
						rel="noopener noreferrer"
						kind="secondary"
						size="sm"
					>
						{/* The glyph carries its own margin, which is the library's icon
						    convention — `Button` sets no `gap`, so an unspaced icon
						    renders flush against its label. */}
						<GitHubIcon class="w-4 h-4 mr-1.5" />
						GitHub
					</Button>
				</div>
			</div>
		</header>
	);
};
