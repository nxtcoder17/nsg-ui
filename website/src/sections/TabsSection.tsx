import { Component, createSignal } from 'solid-js'
import { Tabs } from 'nsg-ui'
import { DemoCard } from '../components/DemoCard'
import { DemoWithCode } from '../components/CodeBlock'

export function TabsIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 3v6" />
    </svg>
  )
}

const basicCode = `const [activeTab, setActiveTab] = createSignal('account')

<Tabs value={activeTab()} onChange={setActiveTab}>
  <Tabs.Item value="account" trigger={<span>Account</span>}>
    Account content
  </Tabs.Item>
  <Tabs.Item value="password" trigger={<span>Password</span>}>
    Password content
  </Tabs.Item>
  <Tabs.Item value="notifications" trigger={<span>Notifications</span>}>
    Notifications content
  </Tabs.Item>
</Tabs>`

const verticalCode = `<Tabs defaultValue="profile" orientation="vertical">
  <Tabs.Item value="profile" trigger={<span>Profile</span>}>
    Profile content
  </Tabs.Item>
  <Tabs.Item value="settings" trigger={<span>Settings</span>}>
    Settings content
  </Tabs.Item>
  <Tabs.Item value="billing" trigger={<span>Billing</span>}>
    Billing content
  </Tabs.Item>
  <Tabs.Item value="team" trigger={<span>Team</span>}>
    Team content
  </Tabs.Item>
</Tabs>`

const disabledCode = `<Tabs defaultValue="active">
  <Tabs.Item value="active" trigger={<span>Active</span>}>
    Active content
  </Tabs.Item>
  <Tabs.Item value="disabled" trigger={<span>Disabled</span>} disabled>
    Disabled content
  </Tabs.Item>
  <Tabs.Item value="another" trigger={<span>Another</span>}>
    Another content
  </Tabs.Item>
</Tabs>`

export const TabsSection: Component = () => {
  const [activeTab, setActiveTab] = createSignal('account')

  return (
    <section id="tabs" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <TabsIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">Tabs</h2>
        </div>
        <p class="text-text-secondary ml-11">Organize content into separate views with tabbed navigation.</p>
      </div>

      <div class="grid gap-6">
        <DemoWithCode title="Basic" description="Horizontal tabs with content panels" code={basicCode}>
          <Tabs value={activeTab()} onChange={setActiveTab}>
            <Tabs.Item value="account" trigger={<span>Account</span>}>
              <div class="p-4 rounded-lg bg-neutral-50">
                <div class="space-y-2">
                  <h3 class="font-medium text-text">Account Settings</h3>
                  <p class="text-sm text-text-secondary">Manage your account details and preferences.</p>
                </div>
              </div>
            </Tabs.Item>
            <Tabs.Item value="password" trigger={<span>Password</span>}>
              <div class="p-4 rounded-lg bg-neutral-50">
                <div class="space-y-2">
                  <h3 class="font-medium text-text">Password Settings</h3>
                  <p class="text-sm text-text-secondary">Update your password and security options.</p>
                </div>
              </div>
            </Tabs.Item>
            <Tabs.Item value="notifications" trigger={<span>Notifications</span>}>
              <div class="p-4 rounded-lg bg-neutral-50">
                <div class="space-y-2">
                  <h3 class="font-medium text-text">Notification Preferences</h3>
                  <p class="text-sm text-text-secondary">Configure how you receive notifications.</p>
                </div>
              </div>
            </Tabs.Item>
          </Tabs>
          <div class="mt-4 text-sm text-text-secondary">
            Active: <span class="font-mono text-primary-500">{activeTab()}</span>
          </div>
        </DemoWithCode>

        <DemoWithCode title="Vertical" description="Side navigation style" code={verticalCode}>
          <Tabs defaultValue="profile" orientation="vertical">
            <Tabs.Item value="profile" trigger={<span>Profile</span>}>
              <div class="p-4 rounded-lg bg-neutral-50 min-h-[120px]">
                <h3 class="font-medium text-text capitalize">Profile</h3>
                <p class="text-sm text-text-secondary mt-1">Content for profile tab.</p>
              </div>
            </Tabs.Item>
            <Tabs.Item value="settings" trigger={<span>Settings</span>}>
              <div class="p-4 rounded-lg bg-neutral-50 min-h-[120px]">
                <h3 class="font-medium text-text capitalize">Settings</h3>
                <p class="text-sm text-text-secondary mt-1">Content for settings tab.</p>
              </div>
            </Tabs.Item>
            <Tabs.Item value="billing" trigger={<span>Billing</span>}>
              <div class="p-4 rounded-lg bg-neutral-50 min-h-[120px]">
                <h3 class="font-medium text-text capitalize">Billing</h3>
                <p class="text-sm text-text-secondary mt-1">Content for billing tab.</p>
              </div>
            </Tabs.Item>
            <Tabs.Item value="team" trigger={<span>Team</span>}>
              <div class="p-4 rounded-lg bg-neutral-50 min-h-[120px]">
                <h3 class="font-medium text-text capitalize">Team</h3>
                <p class="text-sm text-text-secondary mt-1">Content for team tab.</p>
              </div>
            </Tabs.Item>
          </Tabs>
        </DemoWithCode>

        <DemoWithCode title="Disabled Tab" description="Individual tabs can be disabled" code={disabledCode}>
          <Tabs defaultValue="active">
            <Tabs.Item value="active" trigger={<span>Active</span>}>
              <div class="p-4 rounded-lg bg-neutral-50">
                <p class="text-sm text-text">You selected: <strong>active</strong></p>
              </div>
            </Tabs.Item>
            <Tabs.Item value="disabled" trigger={<span>Disabled</span>} disabled>
              <div class="p-4 rounded-lg bg-neutral-50">
                <p class="text-sm text-text">You selected: <strong>disabled</strong></p>
              </div>
            </Tabs.Item>
            <Tabs.Item value="another" trigger={<span>Another</span>}>
              <div class="p-4 rounded-lg bg-neutral-50">
                <p class="text-sm text-text">You selected: <strong>another</strong></p>
              </div>
            </Tabs.Item>
          </Tabs>
        </DemoWithCode>
      </div>
    </section>
  )
}
