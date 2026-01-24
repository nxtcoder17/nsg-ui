import { Component, createSignal, createEffect, onMount, For, JSX } from 'solid-js'
import { Button } from 'nsg-ui'
import { Dialog } from 'nsg-ui'
import { Popover, PopoverExample } from 'nsg-ui/components/popover'
import { DropdownMenu, DropdownMenuExample } from 'nsg-ui/components/dropdown-menu'

// Theme management
type Theme = 'light' | 'dark' | 'system'

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  const isDark = theme === 'dark' || (theme === 'system' && getSystemTheme() === 'dark')
  document.documentElement.classList.toggle('dark', isDark)
}

const sections = [
  { id: 'button', label: 'Button', icon: ButtonIcon },
  { id: 'dialog', label: 'Dialog', icon: DialogIcon },
  { id: 'popover', label: 'Popover', icon: PopoverIcon },
  { id: 'dropdown-menu', label: 'Dropdown Menu', icon: MenuIcon },
] as const

function ButtonIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="8" width="18" height="8" rx="4" />
    </svg>
  )
}

function DialogIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M6 9h12M6 13h8" />
    </svg>
  )
}

function PopoverIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="4" y="2" width="16" height="12" rx="2" />
      <path d="M12 14v4M9 18h6" />
    </svg>
  )
}

function MenuIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7 8h10M7 12h10M7 16h6" />
    </svg>
  )
}

// Demo card wrapper component
function DemoCard(props: { title: string; description?: string; children: JSX.Element }) {
  return (
    <div class="group relative bg-surface-raised rounded-xl border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
      <div class="px-6 py-4 border-b border-border-subtle">
        <h3 class="font-semibold text-text text-[15px]">{props.title}</h3>
        {props.description && (
          <p class="text-text-muted text-sm mt-1">{props.description}</p>
        )}
      </div>
      <div class="p-6 demo-pattern">
        {props.children}
      </div>
    </div>
  )
}

// Theme icons
function SunIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

function MoonIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function MonitorIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  )
}

const App: Component = () => {
  const [activeSection, setActiveSection] = createSignal('button')
  const [theme, setTheme] = createSignal<Theme>('system')

  // Initialize theme from localStorage
  onMount(() => {
    const saved = localStorage.getItem('nsg-ui-theme') as Theme | null
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      setTheme(saved)
    }
    applyTheme(theme())

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme() === 'system') {
        applyTheme('system')
      }
    }
    mediaQuery.addEventListener('change', handleChange)
  })

  // Apply theme when it changes
  createEffect(() => {
    const currentTheme = theme()
    applyTheme(currentTheme)
    localStorage.setItem('nsg-ui-theme', currentTheme)
  })

  const cycleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme())
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div class="min-h-screen bg-surface font-[var(--font-display)]">
      {/* Sidebar */}
      <aside class="fixed left-0 top-0 h-full w-64 bg-sidebar flex flex-col">
        {/* Logo area */}
        <div class="px-6 py-8">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h1 class="text-white font-semibold text-lg tracking-tight">nsg-ui</h1>
              <p class="text-white/50 text-xs">Component Library</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav class="flex-1 px-3 sidebar-scroll overflow-y-auto">
          <div class="text-white/40 text-[11px] font-medium uppercase tracking-wider px-3 mb-2">
            Components
          </div>
          <div class="space-y-1">
            <For each={sections}>
              {(section) => (
                <button
                  onClick={() => scrollToSection(section.id)}
                  class={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection() === section.id
                      ? 'bg-white/10 text-white shadow-lg shadow-black/20'
                      : 'text-white/60 hover:bg-white/5 hover:text-white/90'
                  }`}
                >
                  <section.icon class="w-[18px] h-[18px]" />
                  {section.label}
                  {activeSection() === section.id && (
                    <div class="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
                  )}
                </button>
              )}
            </For>
          </div>
        </nav>

        {/* Footer */}
        <div class="px-6 py-6 border-t border-white/10">
          <div class="flex items-center gap-2 text-white/40 text-xs">
            <span>Built with</span>
            <span class="text-white/60 font-medium">SolidJS</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main class="ml-64 min-h-screen gradient-mesh">
        {/* Header */}
        <header class="sticky top-0 z-10 backdrop-blur-xl bg-surface/80 border-b border-border">
          <div class="max-w-5xl mx-auto px-8 py-4 flex items-center justify-between">
            <div>
              <h2 class="text-xl font-semibold text-text">Kitchen Sink</h2>
              <p class="text-text-muted text-sm">Explore all components</p>
            </div>
            <div class="flex items-center gap-3">
              {/* Theme Switcher */}
              <button
                onClick={cycleTheme}
                class="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-surface-raised hover:bg-surface-sunken text-text text-sm font-medium transition-colors"
                title={`Theme: ${theme()}`}
              >
                {theme() === 'light' && <SunIcon class="w-4 h-4" />}
                {theme() === 'dark' && <MoonIcon class="w-4 h-4" />}
                {theme() === 'system' && <MonitorIcon class="w-4 h-4" />}
                <span class="capitalize">{theme()}</span>
              </button>

              {/* GitHub Link */}
              <a
                href="https://github.com/nxtcoder17/nsg-ui"
                target="_blank"
                class="flex items-center gap-2 px-4 py-2 rounded-lg bg-sidebar text-white text-sm font-medium hover:bg-sidebar-hover transition-colors"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </header>

        <div class="max-w-5xl mx-auto px-8 py-12">
          {/* Button Section */}
          <section id="button" class="scroll-mt-24 mb-20">
            <div class="mb-8">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ButtonIcon class="w-4 h-4 text-primary" />
                </div>
                <h2 class="text-2xl font-bold text-text">Button</h2>
              </div>
              <p class="text-text-secondary ml-11">Interactive button component with multiple variants and sizes.</p>
            </div>

            <div class="grid gap-6">
              <DemoCard title="Variants" description="Different visual styles for different contexts">
                <div class="flex flex-wrap gap-3">
                  <Button variant="default">Default</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="link">Link</Button>
                </div>
              </DemoCard>

              <DemoCard title="Sizes" description="Small, medium, large, and icon sizes">
                <div class="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </Button>
                </div>
              </DemoCard>

              <DemoCard title="States" description="Disabled state reduces opacity and prevents interaction">
                <div class="flex flex-wrap gap-3">
                  <Button disabled>Disabled Default</Button>
                  <Button variant="outline" disabled>Disabled Outline</Button>
                  <Button variant="danger" disabled>Disabled Danger</Button>
                </div>
              </DemoCard>

              <DemoCard title="All Combinations" description="Complete matrix of variants and sizes">
                <div class="space-y-4">
                  <For each={['default', 'outline', 'ghost', 'danger', 'link'] as const}>
                    {(variant) => (
                      <div class="flex items-center gap-4">
                        <span class="w-20 text-sm text-text-muted capitalize font-mono">{variant}</span>
                        <Button variant={variant} size="sm">Small</Button>
                        <Button variant={variant} size="md">Medium</Button>
                        <Button variant={variant} size="lg">Large</Button>
                      </div>
                    )}
                  </For>
                </div>
              </DemoCard>
            </div>
          </section>

          {/* Dialog Section */}
          <section id="dialog" class="scroll-mt-24 mb-20">
            <div class="mb-8">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DialogIcon class="w-4 h-4 text-primary" />
                </div>
                <h2 class="text-2xl font-bold text-text">Dialog</h2>
              </div>
              <p class="text-text-secondary ml-11">Modal dialog for focused interactions and confirmations.</p>
            </div>

            <div class="grid gap-6">
              <DemoCard title="Library Example" description="Built-in example from the component">
                <Dialog.ExampleUsage />
              </DemoCard>

              <DemoCard title="Basic Dialog" description="Simple dialog with title and content">
                <BasicDialogDemo />
              </DemoCard>

              <DemoCard title="Confirmation Dialog" description="For destructive or important actions">
                <ConfirmationDialogDemo />
              </DemoCard>

              <DemoCard title="Form Dialog" description="Dialog with form inputs and validation">
                <FormDialogDemo />
              </DemoCard>
            </div>
          </section>

          {/* Popover Section */}
          <section id="popover" class="scroll-mt-24 mb-20">
            <div class="mb-8">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <PopoverIcon class="w-4 h-4 text-primary" />
                </div>
                <h2 class="text-2xl font-bold text-text">Popover</h2>
              </div>
              <p class="text-text-secondary ml-11">Floating content panel anchored to a trigger element.</p>
            </div>

            <div class="grid gap-6">
              <DemoCard title="Library Example" description="Built-in example from the component">
                <PopoverExample />
              </DemoCard>

              <DemoCard title="Placements" description="Position the popover relative to the trigger">
                <div class="flex flex-wrap gap-3">
                  <Popover trigger={<Button variant="outline" size="sm">Top</Button>} placement="top" arrow>
                    <p class="text-sm text-text">Popover on top</p>
                  </Popover>
                  <Popover trigger={<Button variant="outline" size="sm">Bottom</Button>} placement="bottom" arrow>
                    <p class="text-sm text-text">Popover on bottom</p>
                  </Popover>
                  <Popover trigger={<Button variant="outline" size="sm">Left</Button>} placement="left" arrow>
                    <p class="text-sm text-text">Popover on left</p>
                  </Popover>
                  <Popover trigger={<Button variant="outline" size="sm">Right</Button>} placement="right" arrow>
                    <p class="text-sm text-text">Popover on right</p>
                  </Popover>
                </div>
              </DemoCard>

              <DemoCard title="Info Popover" description="Contextual help and information">
                <Popover
                  trigger={
                    <Button variant="ghost" size="icon">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </Button>
                  }
                  title="Helpful Information"
                  description="This is additional context that helps users understand a feature or action."
                  arrow
                >
                  <a href="#" class="text-sm text-primary hover:underline">Learn more</a>
                </Popover>
              </DemoCard>

              <DemoCard title="User Card Popover" description="Rich content like user profiles">
                <Popover
                  trigger={
                    <button class="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-surface-raised hover:bg-surface-sunken transition-colors">
                      <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-medium">
                        JD
                      </div>
                      <span class="text-sm text-text font-medium">John Doe</span>
                    </button>
                  }
                  placement="bottom-start"
                >
                  <div class="space-y-3">
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-medium text-lg">
                        JD
                      </div>
                      <div>
                        <p class="font-medium text-text">John Doe</p>
                        <p class="text-sm text-text-muted">john@example.com</p>
                      </div>
                    </div>
                    <div class="flex gap-2">
                      <Button size="sm" variant="outline">View Profile</Button>
                      <Button size="sm">Message</Button>
                    </div>
                  </div>
                </Popover>
              </DemoCard>
            </div>
          </section>

          {/* Dropdown Menu Section */}
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
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Panel>
                    <DropdownMenu.Item>
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item variant="danger">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
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

          {/* Footer */}
          <footer class="border-t border-border pt-8 pb-16">
            <div class="flex items-center justify-between text-sm text-text-muted">
              <p>Built with care for the SolidJS community</p>
              <p class="font-mono">v0.1.0</p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}

// Demo components with state

function BasicDialogDemo() {
  const [show, setShow] = createSignal(false)
  return (
    <Dialog
      show={show()}
      onChange={setShow}
      trigger={<Button>Open Dialog</Button>}
      title="Welcome to nsg-ui"
      description="A minimal, accessible component library for SolidJS."
    >
      <div class="p-6 pt-0">
        <p class="text-text-secondary mb-4">
          This dialog demonstrates the basic usage with a title, description, and custom content.
        </p>
        <div class="flex justify-end">
          <Button onClick={() => setShow(false)}>Close</Button>
        </div>
      </div>
    </Dialog>
  )
}

function ConfirmationDialogDemo() {
  const [show, setShow] = createSignal(false)
  return (
    <Dialog
      show={show()}
      onChange={setShow}
      trigger={<Button>Save Changes</Button>}
      title="Save changes?"
      description="Your changes will be permanently saved. This action cannot be undone."
    >
      <div class="flex justify-end gap-2 p-4 border-t border-border">
        <Button variant="ghost" onClick={() => setShow(false)}>Cancel</Button>
        <Button onClick={() => setShow(false)}>Save</Button>
      </div>
    </Dialog>
  )
}

function FormDialogDemo() {
  const [show, setShow] = createSignal(false)
  return (
    <Dialog
      show={show()}
      onChange={setShow}
      trigger={<Button variant="outline">Edit Profile</Button>}
      title="Edit Profile"
      closeOnClickOutside={false}
    >
      <div class="p-6 pt-0 space-y-4">
        <div>
          <label class="block text-sm font-medium text-text mb-1.5">Name</label>
          <input
            type="text"
            placeholder="John Doe"
            class="w-full px-3 py-2.5 border border-border rounded-lg bg-surface text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-text mb-1.5">Email</label>
          <input
            type="email"
            placeholder="john@example.com"
            class="w-full px-3 py-2.5 border border-border rounded-lg bg-surface text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"
          />
        </div>
      </div>
      <div class="flex justify-end gap-2 p-4 border-t border-border">
        <Button variant="ghost" onClick={() => setShow(false)}>Cancel</Button>
        <Button onClick={() => setShow(false)}>Save Changes</Button>
      </div>
    </Dialog>
  )
}

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
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </DropdownMenu.ItemIndicator>
          Show Grid
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.CheckboxItem checked={showRulers()} onChange={setShowRulers}>
          <DropdownMenu.ItemIndicator>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
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
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="4" />
              </svg>
            </DropdownMenu.ItemIndicator>
            Light
          </DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="dark">
            <DropdownMenu.ItemIndicator>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="4" />
              </svg>
            </DropdownMenu.ItemIndicator>
            Dark
          </DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="system">
            <DropdownMenu.ItemIndicator>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="4" />
              </svg>
            </DropdownMenu.ItemIndicator>
            System
          </DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Panel>
    </DropdownMenu>
  )
}

export default App
