import { Component, createSignal, createEffect, onMount } from 'solid-js'
import { Theme, applyTheme, getSavedTheme, saveTheme, cycleTheme, onSystemThemeChange } from './theme'
import { Sidebar, SectionId } from './components/Sidebar'
import { Header } from './components/Header'
import { ButtonSection } from './sections/ButtonSection'
import { DialogSection } from './sections/DialogSection'
import { PopoverSection } from './sections/PopoverSection'
import { DropdownMenuSection } from './sections/DropdownMenuSection'

const App: Component = () => {
  const [activeSection, setActiveSection] = createSignal<SectionId>('button')
  const [theme, setTheme] = createSignal<Theme>('system')

  onMount(() => {
    const saved = getSavedTheme()
    if (saved) setTheme(saved)
    applyTheme(theme())

    onSystemThemeChange(() => {
      if (theme() === 'system') applyTheme('system')
    })
  })

  createEffect(() => {
    const currentTheme = theme()
    applyTheme(currentTheme)
    saveTheme(currentTheme)
  })

  const handleThemeToggle = () => setTheme(cycleTheme(theme()))

  const handleSectionClick = (id: SectionId) => {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div class="min-h-screen bg-surface font-[var(--font-display)]">
      <Sidebar activeSection={activeSection()} onSectionClick={handleSectionClick} />

      <main class="ml-64 min-h-screen gradient-mesh">
        <Header theme={theme()} onThemeToggle={handleThemeToggle} />

        <div class="max-w-5xl mx-auto px-8 py-12">
          <ButtonSection />
          <DialogSection />
          <PopoverSection />
          <DropdownMenuSection />

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

export default App
