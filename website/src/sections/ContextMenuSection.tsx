import { Component, createSignal } from 'solid-js'
import { ContextMenu } from 'nsg-ui/components/context-menu'
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
      content={
        <ContextMenu.Select label="Display" multiple>
          <ContextMenu.Option label="Show Grid" checked={showGrid()} onChange={setShowGrid} />
          <ContextMenu.Option label="Show Rulers" checked={showRulers()} onChange={setShowRulers} />
        </ContextMenu.Select>
      }
    >
      <div class="p-8 border border-dashed border-border rounded-lg text-center text-text-secondary cursor-context-menu">
        Right-click here for view options
      </div>
    </ContextMenu>
  )
}

// Demo: Single selection (radio)
function SingleSelectDemo() {
  const [theme, setTheme] = createSignal('system')

  return (
    <ContextMenu
      content={
        <ContextMenu.Select label="Theme" value={theme()} onChange={setTheme}>
          <ContextMenu.Option value="light" label="Light" />
          <ContextMenu.Option value="dark" label="Dark" />
          <ContextMenu.Option value="system" label="System" />
        </ContextMenu.Select>
      }
    >
      <div class="p-8 border border-dashed border-border rounded-lg text-center text-text-secondary cursor-context-menu">
        Right-click to select theme (current: {theme()})
      </div>
    </ContextMenu>
  )
}

export const ContextMenuSection: Component = () => {
  return (
    <section id="context-menu" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <ContextMenuIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">Context Menu</h2>
        </div>
        <p class="text-text-secondary ml-11">Right-click triggered menu with groups, checkboxes, and submenus.</p>
      </div>

      <div class="grid gap-6">
        <DemoCard title="Basic Actions" description="Simple action items with icons">
          <ContextMenu
            content={
              <>
                <ContextMenu.ActionItem label="Profile" icon={<UserIcon class="w-4 h-4" />} onSelect={() => console.log('Profile')} />
                <ContextMenu.ActionItem label="Settings" icon={<SettingsIcon class="w-4 h-4" />} onSelect={() => console.log('Settings')} />
                <ContextMenu.Separator />
                <ContextMenu.ActionItem label="Logout" variant="danger" icon={<LogoutIcon class="w-4 h-4" />} onSelect={() => console.log('Logout')} />
              </>
            }
          >
            <div class="p-8 border border-dashed border-border rounded-lg text-center text-text-secondary cursor-context-menu">
              Right-click for actions
            </div>
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
            content={
              <>
                <ContextMenu.ActionItem label="Copy" onSelect={() => console.log('Copy')} />
                <ContextMenu.ActionItem label="Paste" onSelect={() => console.log('Paste')} />
                <ContextMenu.Menu label="Share to...">
                  <ContextMenu.ActionItem label="Twitter" onSelect={() => console.log('Twitter')} />
                  <ContextMenu.ActionItem label="Facebook" onSelect={() => console.log('Facebook')} />
                  <ContextMenu.ActionItem label="Email" onSelect={() => console.log('Email')} />
                </ContextMenu.Menu>
                <ContextMenu.Separator />
                <ContextMenu.ActionItem label="Delete" variant="danger" onSelect={() => console.log('Delete')} />
              </>
            }
          >
            <div class="p-8 border border-dashed border-border rounded-lg text-center text-text-secondary cursor-context-menu">
              Right-click for nested menu
            </div>
          </ContextMenu>
        </DemoCard>
      </div>
    </section>
  )
}
