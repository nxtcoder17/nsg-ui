import { Component, createSignal } from 'solid-js'
import { DropdownMenu, DropdownMenuExample } from 'nsg-ui/components/dropdown-menu'
import { DemoCard } from '../components/DemoCard'
import { MenuIcon, SettingsIcon, UserIcon, LogoutIcon, CheckIcon, DotIcon } from '../icons'

// Demo components
function CheckboxMenuDemo() {
  const [showGrid, setShowGrid] = createSignal(true)
  const [showRulers, setShowRulers] = createSignal(false)

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger variant="outline">View Options</DropdownMenu.Trigger>
      <DropdownMenu.Panel>
        <DropdownMenu.GroupLabel>Display</DropdownMenu.GroupLabel>
        <DropdownMenu.CheckboxItem checked={showGrid()} onChange={setShowGrid}>
          <DropdownMenu.ItemIndicator>
            <CheckIcon class="w-4 h-4" />
          </DropdownMenu.ItemIndicator>
          Show Grid
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.CheckboxItem checked={showRulers()} onChange={setShowRulers}>
          <DropdownMenu.ItemIndicator>
            <CheckIcon class="w-4 h-4" />
          </DropdownMenu.ItemIndicator>
          Show Rulers
        </DropdownMenu.CheckboxItem>
      </DropdownMenu.Panel>
    </DropdownMenu>
  )
}

function RadioMenuDemo() {
  const [theme, setTheme] = createSignal('system')

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger variant="outline">Theme: {theme()}</DropdownMenu.Trigger>
      <DropdownMenu.Panel>
        <DropdownMenu.RadioGroup value={theme()} onChange={setTheme}>
          <DropdownMenu.GroupLabel>Theme</DropdownMenu.GroupLabel>
          <DropdownMenu.RadioItem value="light">
            <DropdownMenu.ItemIndicator>
              <DotIcon class="w-4 h-4" />
            </DropdownMenu.ItemIndicator>
            Light
          </DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="dark">
            <DropdownMenu.ItemIndicator>
              <DotIcon class="w-4 h-4" />
            </DropdownMenu.ItemIndicator>
            Dark
          </DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="system">
            <DropdownMenu.ItemIndicator>
              <DotIcon class="w-4 h-4" />
            </DropdownMenu.ItemIndicator>
            System
          </DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Panel>
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
          <DropdownMenu>
            <DropdownMenu.Trigger variant="outline">
              <SettingsIcon class="w-4 h-4 mr-2" />
              Settings
            </DropdownMenu.Trigger>
            <DropdownMenu.Panel>
              <DropdownMenu.Item>
                <UserIcon class="w-4 h-4 mr-2" />
                Profile
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <SettingsIcon class="w-4 h-4 mr-2" />
                Settings
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item variant="danger">
                <LogoutIcon class="w-4 h-4 mr-2" />
                Logout
              </DropdownMenu.Item>
            </DropdownMenu.Panel>
          </DropdownMenu>
        </DemoCard>

        <DemoCard title="With Checkbox Items" description="Toggle multiple options">
          <CheckboxMenuDemo />
        </DemoCard>

        <DemoCard title="With Radio Items" description="Single selection from options">
          <RadioMenuDemo />
        </DemoCard>

        <DemoCard title="With Submenu" description="Nested menu structure">
          <DropdownMenu>
            <DropdownMenu.Trigger>Share</DropdownMenu.Trigger>
            <DropdownMenu.Panel>
              <DropdownMenu.Item>Copy Link</DropdownMenu.Item>
              <DropdownMenu.Submenu>
                <DropdownMenu.SubmenuTrigger>Share to...</DropdownMenu.SubmenuTrigger>
                <DropdownMenu.SubmenuPanel>
                  <DropdownMenu.Item>Twitter</DropdownMenu.Item>
                  <DropdownMenu.Item>Facebook</DropdownMenu.Item>
                  <DropdownMenu.Item>LinkedIn</DropdownMenu.Item>
                  <DropdownMenu.Item>Email</DropdownMenu.Item>
                </DropdownMenu.SubmenuPanel>
              </DropdownMenu.Submenu>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>Embed</DropdownMenu.Item>
            </DropdownMenu.Panel>
          </DropdownMenu>
        </DemoCard>
      </div>
    </section>
  )
}
