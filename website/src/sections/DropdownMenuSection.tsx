import { Component, createSignal } from 'solid-js'
import { DropdownMenu } from 'nsg-ui/components/dropdown-menu'
import { Button } from 'nsg-ui/components/button'
import { DemoCard } from '../components/DemoCard'
import { MenuIcon, SettingsIcon, UserIcon, LogoutIcon } from '../icons'
import { Section } from "../components/section"

function MultiSelectDemo() {
  const [showGrid, setShowGrid] = createSignal(true)
  const [showRulers, setShowRulers] = createSignal(false)

  return (
    <DropdownMenu trigger={<Button variant="outline">View Options</Button>}>
      <DropdownMenu.MultiSelect label="Display">
        <DropdownMenu.MultiSelectItem checked={showGrid()} onChange={setShowGrid}>Show Grid</DropdownMenu.MultiSelectItem>
        <DropdownMenu.MultiSelectItem checked={showRulers()} onChange={setShowRulers}>Show Rulers</DropdownMenu.MultiSelectItem>
      </DropdownMenu.MultiSelect>
    </DropdownMenu>
  )
}

function SingleSelectDemo() {
  const [theme, setTheme] = createSignal('system')

  return (
    <DropdownMenu trigger={<Button variant="outline">Theme: {theme()}</Button>}>
      <DropdownMenu.SingleSelect label="Theme" value={theme()} onChange={setTheme}>
        <DropdownMenu.SingleSelectItem value="light">Light</DropdownMenu.SingleSelectItem>
        <DropdownMenu.SingleSelectItem value="dark">Dark</DropdownMenu.SingleSelectItem>
        <DropdownMenu.SingleSelectItem value="system">System</DropdownMenu.SingleSelectItem>
      </DropdownMenu.SingleSelect>
    </DropdownMenu>
  )
}

export const DropdownMenuSection: Component = () => {
  return (
    <Section
      id="dropdown-menu"
      header={{
        title: "Dropdown Menu",
        icon: MenuIcon,
        description: "Versatile menu component with groups, checkboxes, and submenus.",
      }}
    >
      <DemoCard title="Basic" description="Simple menu with actions and danger variant">
        <DropdownMenu trigger={<Button variant="outline">Open Menu</Button>}>
          <DropdownMenu.Group label="Actions">
            <DropdownMenu.ActionItem onSelect={() => console.log('Edit')}>Edit</DropdownMenu.ActionItem>
            <DropdownMenu.ActionItem onSelect={() => console.log('Duplicate')}>Duplicate</DropdownMenu.ActionItem>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.ActionItem onSelect={() => console.log('Settings')}>Settings</DropdownMenu.ActionItem>
          <DropdownMenu.Separator />
          <DropdownMenu.ActionItem variant="danger" onSelect={() => console.log('Delete')}>Delete</DropdownMenu.ActionItem>
        </DropdownMenu>
      </DemoCard>

      <DemoCard title="With Icons" description="Enhanced visual hierarchy with icons">
        <DropdownMenu trigger={<Button variant="outline"><SettingsIcon class="w-4 h-4 mr-2" />Settings</Button>}>
          <DropdownMenu.ActionItem onSelect={() => console.log('Profile')}>
            <UserIcon class="w-4 h-4 mr-2" /> Profile
          </DropdownMenu.ActionItem>
          <DropdownMenu.ActionItem onSelect={() => console.log('Settings')}>
            <SettingsIcon class="w-4 h-4 mr-2" /> Settings
          </DropdownMenu.ActionItem>
          <DropdownMenu.Separator />
          <DropdownMenu.ActionItem variant="danger" onSelect={() => console.log('Logout')}>
            <LogoutIcon class="w-4 h-4 mr-2" /> Logout
          </DropdownMenu.ActionItem>
        </DropdownMenu>
      </DemoCard>

      <DemoCard title="Select (Multiple)" description="Toggle multiple options with checkmarks">
        <MultiSelectDemo />
      </DemoCard>

      <DemoCard title="Select (Single)" description="Single selection from options">
        <SingleSelectDemo />
      </DemoCard>

      <DemoCard title="Nested Menu" description="Nested menu structure">
        <DropdownMenu trigger={<Button>Share</Button>}>
          <DropdownMenu.ActionItem onSelect={() => console.log('Copy Link')}>Copy Link</DropdownMenu.ActionItem>
          <DropdownMenu.Menu label="Share to...">
            <DropdownMenu.ActionItem onSelect={() => console.log('Twitter')}>Twitter</DropdownMenu.ActionItem>
            <DropdownMenu.ActionItem onSelect={() => console.log('Facebook')}>Facebook</DropdownMenu.ActionItem>
            <DropdownMenu.ActionItem onSelect={() => console.log('LinkedIn')}>LinkedIn</DropdownMenu.ActionItem>
            <DropdownMenu.ActionItem onSelect={() => console.log('Email')}>Email</DropdownMenu.ActionItem>
          </DropdownMenu.Menu>
          <DropdownMenu.Separator />
          <DropdownMenu.ActionItem onSelect={() => console.log('Embed')}>Embed</DropdownMenu.ActionItem>
        </DropdownMenu>
      </DemoCard>
    </Section>
  )
}
