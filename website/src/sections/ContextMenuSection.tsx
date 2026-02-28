import { Component, createSignal } from 'solid-js'
import { ContextMenu } from 'nsg-ui/components/context-menu'
import { Section } from '../components/section'
import { DemoCard } from '../components/DemoCard'
import { SettingsIcon, UserIcon, LogoutIcon } from '../icons'

export function ContextMenuIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <circle cx="8" cy="9" r="1" fill="currentColor" stroke="none" />
      <line x1="11" y1="9" x2="16" y2="9" />
      <circle cx="8" cy="12" r="1" fill="currentColor" stroke="none" />
      <line x1="11" y1="12" x2="16" y2="12" />
      <circle cx="8" cy="15" r="1" fill="currentColor" stroke="none" />
      <line x1="11" y1="15" x2="16" y2="15" />
    </svg>
  )
}

// Demo: Multiple selection (checkboxes)
function MultiSelectDemo() {
  const [showGrid, setShowGrid] = createSignal(true)
  const [showRulers, setShowRulers] = createSignal(false)

  return (
    <ContextMenu
      trigger={
        <div class="p-8 border border-dashed border-border rounded-lg text-center text-text-secondary cursor-context-menu">
          Right-click here for view options
        </div>
      }
    >
      <ContextMenu.MultiSelect label="Display">
        <ContextMenu.MultiSelectItem checked={showGrid()} onChange={setShowGrid}>Show Grid</ContextMenu.MultiSelectItem>
        <ContextMenu.MultiSelectItem checked={showRulers()} onChange={setShowRulers}>Show Rulers</ContextMenu.MultiSelectItem>
      </ContextMenu.MultiSelect>
    </ContextMenu>
  )
}

// Demo: Single selection (radio)
function SingleSelectDemo() {
  const [theme, setTheme] = createSignal('system')

  return (
    <ContextMenu
      trigger={
        <div class="p-8 border border-dashed border-border rounded-lg text-center text-text-secondary cursor-context-menu">
          Right-click to select theme (current: {theme()})
        </div>
      }
    >
      <ContextMenu.SingleSelect label="Theme" value={theme()} onChange={setTheme}>
        <ContextMenu.SingleSelectItem value="light">Light</ContextMenu.SingleSelectItem>
        <ContextMenu.SingleSelectItem value="dark">Dark</ContextMenu.SingleSelectItem>
        <ContextMenu.SingleSelectItem value="system">System</ContextMenu.SingleSelectItem>
      </ContextMenu.SingleSelect>
    </ContextMenu>
  )
}

export const ContextMenuSection: Component = () => {
  return (
    <Section id="context-menu"
      header={{
        title: "Context Menu",
        icon: ContextMenuIcon,
        description: "Right-click triggered menu with groups, checkboxes, and submenus."
      }}
    >
      <DemoCard title="Basic Actions" description="Simple action items with icons">
        <ContextMenu
          trigger={
            <div class="p-8 border border-dashed border-border rounded-lg text-center text-text-secondary cursor-context-menu">
              Right-click for actions
            </div>
          }
        >
          <ContextMenu.ActionItem onSelect={() => console.log('Profile')}>
            <UserIcon class="w-4 h-4 mr-2" /> Profile
          </ContextMenu.ActionItem>
          <ContextMenu.ActionItem onSelect={() => console.log('Settings')}>
            <SettingsIcon class="w-4 h-4 mr-2" /> Settings
          </ContextMenu.ActionItem>
          <ContextMenu.Separator />
          <ContextMenu.ActionItem variant="danger" onSelect={() => console.log('Logout')}>
            <LogoutIcon class="w-4 h-4 mr-2" /> Logout
          </ContextMenu.ActionItem>
        </ContextMenu>
      </DemoCard>

      <DemoCard title="Select (Multiple)" description="Toggle multiple options with checkmarks">
        <MultiSelectDemo />
      </DemoCard>

      <DemoCard title="Select (Single)" description="Single selection from options">
        <SingleSelectDemo />
      </DemoCard>

      <DemoCard title="Nested Menu" description="Submenus for organized options">
        <ContextMenu
          trigger={
            <div class="p-8 border border-dashed border-border rounded-lg text-center text-text-secondary cursor-context-menu">
              Right-click for nested menu
            </div>
          }
        >
          <ContextMenu.ActionItem onSelect={() => console.log('Copy')}>Copy</ContextMenu.ActionItem>
          <ContextMenu.ActionItem onSelect={() => console.log('Paste')}>Paste</ContextMenu.ActionItem>
          <ContextMenu.Menu label="Share to...">
            <ContextMenu.ActionItem onSelect={() => console.log('Twitter')}>Twitter</ContextMenu.ActionItem>
            <ContextMenu.ActionItem onSelect={() => console.log('Facebook')}>Facebook</ContextMenu.ActionItem>
            <ContextMenu.ActionItem onSelect={() => console.log('Email')}>Email</ContextMenu.ActionItem>
          </ContextMenu.Menu>
          <ContextMenu.Separator />
          <ContextMenu.ActionItem variant="danger" onSelect={() => console.log('Delete')}>Delete</ContextMenu.ActionItem>
        </ContextMenu>
      </DemoCard>
    </Section>
  )
}
