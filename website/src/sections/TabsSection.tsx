import { Component, createSignal } from 'solid-js'
import { Tabs } from 'nsg-ui'
import { DemoCard } from '../components/DemoCard'

export function TabsIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 3v6" />
    </svg>
  )
}

export const TabsSection: Component = () => {
  const [activeTab, setActiveTab] = createSignal('account')

  const basicTabs = [
    { value: 'account', label: 'Account' },
    { value: 'password', label: 'Password' },
    { value: 'notifications', label: 'Notifications' },
  ]

  const verticalTabs = [
    { value: 'profile', label: 'Profile' },
    { value: 'settings', label: 'Settings' },
    { value: 'billing', label: 'Billing' },
    { value: 'team', label: 'Team' },
  ]

  const disabledTabs = [
    { value: 'active', label: 'Active' },
    { value: 'disabled', label: 'Disabled', disabled: true },
    { value: 'another', label: 'Another' },
  ]

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
        <DemoCard title="Basic" description="Horizontal tabs with content panels">
          <Tabs
            value={activeTab()}
            onChange={setActiveTab}
            tabs={basicTabs}
          >
            {(value) => (
              <div class="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900">
                {value === 'account' && (
                  <div class="space-y-2">
                    <h3 class="font-medium text-text">Account Settings</h3>
                    <p class="text-sm text-text-secondary">Manage your account details and preferences.</p>
                  </div>
                )}
                {value === 'password' && (
                  <div class="space-y-2">
                    <h3 class="font-medium text-text">Password Settings</h3>
                    <p class="text-sm text-text-secondary">Update your password and security options.</p>
                  </div>
                )}
                {value === 'notifications' && (
                  <div class="space-y-2">
                    <h3 class="font-medium text-text">Notification Preferences</h3>
                    <p class="text-sm text-text-secondary">Configure how you receive notifications.</p>
                  </div>
                )}
              </div>
            )}
          </Tabs>
          <div class="mt-4 text-sm text-text-secondary">
            Active: <span class="font-mono text-primary-500">{activeTab()}</span>
          </div>
        </DemoCard>

        <DemoCard title="Vertical" description="Side navigation style">
          <Tabs
            tabs={verticalTabs}
            defaultValue="profile"
            orientation="vertical"
          >
            {(value) => (
              <div class="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 min-h-[120px]">
                <h3 class="font-medium text-text capitalize">{value}</h3>
                <p class="text-sm text-text-secondary mt-1">Content for {value} tab.</p>
              </div>
            )}
          </Tabs>
        </DemoCard>

        <DemoCard title="Disabled Tab" description="Individual tabs can be disabled">
          <Tabs tabs={disabledTabs} defaultValue="active">
            {(value) => (
              <div class="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900">
                <p class="text-sm text-text">You selected: <strong>{value}</strong></p>
              </div>
            )}
          </Tabs>
        </DemoCard>
      </div>
    </section>
  )
}
