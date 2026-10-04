import { type Component, createSignal } from "solid-js";
import { Button, Dialog, TextInput } from "nsg-ui";
import { DemoCard } from "../components/DemoCard";
import { DialogIcon } from "../icons";
import { Section } from "../components/section";

// Demo components
function DeleteItemDialog() {
	return (
		<Dialog
			trigger={<Dialog.TriggerButton kind="danger">Delete Item</Dialog.TriggerButton>}
		>
			<Dialog.Header
				title="Delete Item?"
				description="This action cannot be undone."
				withCloseIcon
			/>
			<Dialog.Footer>
				<Dialog.CloseButton>Cancel</Dialog.CloseButton>
				<Button kind="danger">Delete</Button>
			</Dialog.Footer>
		</Dialog>
	);
}

function ConfirmationDialogDemo() {
	return (
		<Dialog
			trigger={<Dialog.TriggerButton>Save Changes</Dialog.TriggerButton>}
		>
			<Dialog.Header
				title="Save changes?"
				description="Your changes will be permanently saved. This action cannot be undone."
			/>
			<Dialog.Footer>
				<Dialog.CloseButton kind="ghost">Cancel</Dialog.CloseButton>
				<Dialog.CloseButton>Save</Dialog.CloseButton>
			</Dialog.Footer>
		</Dialog>
	);
}

function FormDialogDemo() {
	// The real component, not a hand-rolled <label>/<input>. The hand-rolled pair
	// this replaced carried a body-sans label, a transparent border and a focus
	// ring — the pre-foundation field idiom — so the fields inside the modal were
	// the only ones on the page not speaking the design's voice. Demos have to use
	// the library, or they review the wrong thing.
	const [name, setName] = createSignal("");
	const [email, setEmail] = createSignal("");

	return (
		<Dialog
			trigger={
				<Dialog.TriggerButton kind="secondary" outline>
					Edit Profile
				</Dialog.TriggerButton>
			}
			closeOnClickOutside={false}
		>
			<Dialog.Header title="Edit Profile" />
			<Dialog.Body>
				<div class="space-y-4">
					<TextInput
						label="Name"
						placeholder="John Doe"
						value={name()}
						onChange={setName}
					/>
					<TextInput
						label="Email"
						type="email"
						placeholder="john@example.com"
						value={email()}
						onChange={setEmail}
					/>
				</div>
			</Dialog.Body>

			<Dialog.Footer>
				<Dialog.CloseButton kind="ghost">Cancel</Dialog.CloseButton>
				<Dialog.CloseButton>Save Changes</Dialog.CloseButton>
			</Dialog.Footer>
		</Dialog>
	);
}

function AsyncSaveDialogDemo() {
	const [saving, setSaving] = createSignal(false);
	return (
		<Dialog
			trigger={<Dialog.TriggerButton>Save with API</Dialog.TriggerButton>}
		>
			{({ close }) => (
				<>
					<Dialog.Header
						title="Save changes?"
						description="Closes only after API succeeds — no open prop needed."
					/>
					<Dialog.Body>
						<p class="text-sm text-text-secondary">
							Simulates an async save. Dialog stays open until success.
						</p>
					</Dialog.Body>
					<Dialog.Footer>
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
					</Dialog.Footer>
				</>
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
