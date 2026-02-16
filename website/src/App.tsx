import { Component, createSignal, createEffect, onMount, onCleanup } from 'solid-js'
import { Theme, applyTheme, getSavedTheme, saveTheme, cycleTheme, onSystemThemeChange } from './theme'
import { Sidebar, SectionId, sections } from './components/Sidebar'
import { Header } from './components/Header'
import { ColorPaletteSection } from './sections/ColorPaletteSection'
import { ButtonSection } from './sections/ButtonSection'
import { DialogSection } from './sections/DialogSection'
import { PopoverSection } from './sections/PopoverSection'
import { DropdownMenuSection } from './sections/DropdownMenuSection'
import { ContextMenuSection } from './sections/ContextMenuSection'
import { ToastSection } from './sections/ToastSection'
import { RadioGroupSection } from './sections/RadioGroupSection'
import { CheckboxSection } from './sections/CheckboxSection'
import { ComboBoxSection } from './sections/ComboBoxSection'
import { TextInputSection } from './sections/TextInputSection'
import { NumberInputSection } from './sections/NumberInputSection'
import { TabsSection } from './sections/TabsSection'
import { SegmentedControlSection } from './sections/SegmentedControlSection'
import { BadgeSection } from './sections/BadgeSection'
import { LinkSection } from './sections/LinkSection'
import { SeparatorSection } from './sections/SeparatorSection'
import { ImageSection } from './sections/ImageSection'
import { ProgressSection } from './sections/ProgressSection'
import { AccordionSection } from './sections/AccordionSection'
import { ToggleButtonSection } from './sections/ToggleButtonSection'
import { CommandBarSection } from './sections/CommandBarSection'
import { IconsSection } from './sections/IconsSection'
import { TextSection } from './sections/TextSection'

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
    <div class="min-h-screen bg-surface">
      <Sidebar activeSection={activeSection()} onSectionClick={handleSectionClick} />

      <main class="ml-64 min-h-screen gradient-mesh">
        <Header theme={theme()} onThemeToggle={handleThemeToggle} />

        <div class="max-w-5xl mx-auto px-8 py-12">
          <TextSection />
          <ButtonSection />
          <DialogSection />
          <PopoverSection />
          <DropdownMenuSection />
          <ContextMenuSection />
          <ToastSection />
          <RadioGroupSection />
          <CheckboxSection />
          <ComboBoxSection />
          <TextInputSection />
          <NumberInputSection />
          <TabsSection />
          <SegmentedControlSection />
          <BadgeSection />
          <LinkSection />
          <SeparatorSection />
          <ImageSection />
          <ProgressSection />
          <AccordionSection />
          <ToggleButtonSection />
          <CommandBarSection />
          <IconsSection />
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
