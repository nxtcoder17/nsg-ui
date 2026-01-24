import { Component, createSignal, createEffect, onMount, onCleanup } from 'solid-js'
import { Theme, applyTheme, getSavedTheme, saveTheme, cycleTheme, onSystemThemeChange } from './theme'
import { Sidebar, SectionId, sections } from './components/Sidebar'
import { Header } from './components/Header'
import { ColorPaletteSection } from './sections/ColorPaletteSection'
import { ButtonSection } from './sections/ButtonSection'
import { DialogSection } from './sections/DialogSection'
import { PopoverSection } from './sections/PopoverSection'
import { DropdownMenuSection } from './sections/DropdownMenuSection'

const App: Component = () => {
  const [activeSection, setActiveSection] = createSignal<SectionId>('colors')
  const [theme, setTheme] = createSignal<Theme>('system')
  let isScrolling = false

  onMount(() => {
    // Theme initialization
    const saved = getSavedTheme()
    if (saved) setTheme(saved)
    applyTheme(theme())

    onSystemThemeChange(() => {
      if (theme() === 'system') applyTheme('system')
    })

    // Intersection observer for active section highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling) return

        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId
            if (sections.some(s => s.id === id)) {
              setActiveSection(id)
            }
          }
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px', // Trigger when section is in top 20-40% of viewport
        threshold: 0
      }
    )

    // Observe all sections
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    onCleanup(() => observer.disconnect())
  })

  createEffect(() => {
    const currentTheme = theme()
    applyTheme(currentTheme)
    saveTheme(currentTheme)
  })

  const handleThemeToggle = () => setTheme(cycleTheme(theme()))

  const handleSectionClick = (id: SectionId) => {
    isScrolling = true
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    // Reset scrolling flag after animation
    setTimeout(() => { isScrolling = false }, 1000)
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
          <ColorPaletteSection />

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
