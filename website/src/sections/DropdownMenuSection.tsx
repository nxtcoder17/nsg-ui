import { Component, createSignal } from 'solid-js'
import { DropdownMenu, DropdownMenuExample } from 'nsg-ui/components/dropdown-menu'
import { Button } from 'nsg-ui/components/button'
import { DemoCard } from '../components/DemoCard'
import { MenuIcon, SettingsIcon, UserIcon, LogoutIcon } from '../icons'

// Demo: Multiple selection (checkboxes)
function MultiSelectDemo() {
  const [showGrid, setShowGrid] = createSignal(true)
  const [showRulers, setShowRulers] = createSignal(false)

  return (
    <DropdownMenu trigger={<Button variant="outline">View Options</Button>}>
      <DropdownMenu.Select label="Display" multiple>
        <DropdownMenu.Option label="Show Grid" checked={showGrid()} onChange={setShowGrid} />
        <DropdownMenu.Option label="Show Rulers" checked={showRulers()} onChange={setShowRulers} />
      </DropdownMenu.Select>
    </DropdownMenu>
  )
}

// Demo: Single selection (radio)
function SingleSelectDemo() {
  const [theme, setTheme] = createSignal('system')

  return (
    <DropdownMenu trigger={<Button variant="outline">Theme: {theme()}</Button>}>
      <DropdownMenu.Select label="Theme" value={theme()} onChange={setTheme}>
        <DropdownMenu.Option value="light" label="Light" />
        <DropdownMenu.Option value="dark" label="Dark" />
        <DropdownMenu.Option value="system" label="System" />
      </DropdownMenu.Select>
    </DropdownMenu>
  )
}

export const DropdownMenuSection: Component = () => {
  return (
    <section id="dropdown-menu" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <MenuIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">Dropdown Menu</h2>
        </div>
        <p class="text-text-secondary ml-11">Versatile menu component with groups, checkboxes, and submenus.</p>
      </div>

      <div class="grid gap-6">
        <DemoCard title="Library Example" description="Built-in example from the component">
          <DropdownMenuExample />
        </DemoCard>

        <DemoCard title="With Icons" description="Enhanced visual hierarchy with icons">
          <DropdownMenu trigger={<Button variant="outline"><SettingsIcon class="w-4 h-4 mr-2" />Settings</Button>}>
            <DropdownMenu.ActionItem label="Profile" icon={<UserIcon class="w-4 h-4" />} onSelect={() => console.log('Profile')} />
            <DropdownMenu.ActionItem label="Settings" icon={<SettingsIcon class="w-4 h-4" />} onSelect={() => console.log('Settings')} />
            <DropdownMenu.Separator />
            <DropdownMenu.ActionItem label="Logout" variant="danger" icon={<LogoutIcon class="w-4 h-4" />} onSelect={() => console.log('Logout')} />
          </DropdownMenu>
        </DemoCard>

        <DemoCard title="MultiSelect (Checkboxes)" description="Toggle multiple options independently">
          <MultiSelectDemo />
        </DemoCard>

        <DemoCard title="SingleSelect (Radio)" description="Single selection from options">
          <SingleSelectDemo />
        </DemoCard>

        <DemoCard title="Nested Menu" description="Nested menu structure">
          <DropdownMenu trigger={<Button>Share</Button>}>
            <DropdownMenu.ActionItem label="Copy Link" onSelect={() => console.log('Copy Link')} />
            <DropdownMenu.Menu label="Share to...">
              <DropdownMenu.ActionItem label="Twitter" onSelect={() => console.log('Twitter')} />
              <DropdownMenu.ActionItem label="Facebook" onSelect={() => console.log('Facebook')} />
              <DropdownMenu.ActionItem label="LinkedIn" onSelect={() => console.log('LinkedIn')} />
              <DropdownMenu.ActionItem label="Email" onSelect={() => console.log('Email')} />
            </DropdownMenu.Menu>
            <DropdownMenu.Separator />
            <DropdownMenu.ActionItem label="Embed" onSelect={() => console.log('Embed')} />
          </DropdownMenu>
        </DemoCard>
      </div>
    </section>
  )
}
