import { type Component, createSignal } from "solid-js";
import { Button } from "nsg-ui";
import { Dialog } from "nsg-ui";
import { DemoCard } from "../components/DemoCard";
import { DialogIcon } from "../icons";
import { Section } from "../components/section";

// Demo components
function DeleteItemDialog() {
	return (
		<Dialog
			header={{
				title: "Delete Item?",
				description: "This action cannot be undone.",
				withCloseIcon: true,
			}}
			trigger={<Dialog.TriggerButton kind="danger">Delete Item</Dialog.TriggerButton>}
		>
			<div class="flex justify-end gap-2 pt-2 border-t border-border">
				<Dialog.CloseButton>Cancel</Dialog.CloseButton>
				<Button kind="danger">Delete</Button>
			</div>
		</Dialog>
	);
}

function ConfirmationDialogDemo() {
	return (
		<Dialog
			trigger={<Dialog.TriggerButton>Save Changes</Dialog.TriggerButton>}
			header={{
				title: "Save changes?",
				description:
					"Your changes will be permanently saved. This action cannot be undone.",
			}}
		>
			<div class="flex justify-end gap-2 pt-2 border-t border-border">
				<Dialog.CloseButton kind="ghost">Cancel</Dialog.CloseButton>
				<Dialog.CloseButton>Save</Dialog.CloseButton>
			</div>
		</Dialog>
	);
}

function FormDialogDemo() {
	return (
		<Dialog
			trigger={
				<Dialog.TriggerButton kind="secondary" outline>
					Edit Profile
				</Dialog.TriggerButton>
			}
			header={{ title: "Edit Profile" }}
			closeOnClickOutside={false}
		>
			<div class="pt-0 space-y-4">
				<div>
					<label class="block text-sm font-medium text-text mb-1.5">Name</label>
					<input
						type="text"
						placeholder="John Doe"
						class="w-full px-3 py-2.5 border border-border rounded-lg bg-surface text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"
					/>
				</div>
				<div>
					<label class="block text-sm font-medium text-text mb-1.5">
						Email
					</label>
					<input
						type="email"
						placeholder="john@example.com"
						class="w-full px-3 py-2.5 border border-border rounded-lg bg-surface text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"
					/>
				</div>
			</div>

			<div class="flex justify-end gap-2 pt-2">
				<Dialog.CloseButton kind="ghost">Cancel</Dialog.CloseButton>
				<Dialog.CloseButton>Save Changes</Dialog.CloseButton>
			</div>
		</Dialog>
	);
}

function AsyncSaveDialogDemo() {
	const [saving, setSaving] = createSignal(false);
	return (
		<Dialog
			trigger={<Dialog.TriggerButton>Save with API</Dialog.TriggerButton>}
			header={{
				title: "Save changes?",
				description: "Closes only after API succeeds — no open prop needed.",
			}}
		>
			{({ close }) => (
				<div class="flex flex-col gap-4">
					<p class="text-sm text-text-secondary">
						Simulates an async save. Dialog stays open until success.
					</p>
					<div class="flex justify-end gap-2 pt-2 border-t border-border">
						<Dialog.CloseButton kind="ghost" disabled={saving()}>
							Cancel
						</Dialog.CloseButton>
						<Button
							disabled={saving()}
							onClick={async () => {
								setSaving(true);
								await new Promise((r) => setTimeout(r, 1200));
								setSaving(false);
								close();
							}}
						>
							{saving() ? "Saving..." : "Save"}
						</Button>
					</div>
				</div>
			)}
		</Dialog>
	);
}

export const DialogSection: Component = () => {
	return (
		<Section
			id="dialog"
			header={{
				title: "Dialog",
				icon: DialogIcon,
				description: "Modal dialog for focused interactions and confirmations.",
			}}
		>
			<DemoCard
				title="Delete Item Confirmation"
				description="Dialog for Delete Item Confirmation"
			>
				<DeleteItemDialog />
			</DemoCard>

			<DemoCard
				title="Confirmation Dialog"
				description="For destructive or important actions"
			>
				<ConfirmationDialogDemo />
			</DemoCard>

			<DemoCard
				title="Form Dialog"
				description="Dialog with form inputs and validation"
			>
				<FormDialogDemo />
			</DemoCard>

			<DemoCard
				title="Async Save (render-prop close)"
				description="Use children as function ({ close }) => ... to close after API succeeds — no open prop needed"
			>
				<AsyncSaveDialogDemo />
			</DemoCard>
		</Section>
	);
};
