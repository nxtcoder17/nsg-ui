import type { Component } from 'solid-js'
import { ThemeSwitcher } from 'nsg-ui'
import { DemoWithCode } from '../components/CodeBlock'
import { Section } from '../components/section'

export function ThemeSwitcherIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M6.34 17.66l-1.41 1.41" />
      <path d="M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

const defaultCode = `import { ThemeSwitcher } from 'nsg-ui'

<ThemeSwitcher />`

const withLabelsCode = `<ThemeSwitcher withLabels />`

const storageKeyCode = `<ThemeSwitcher storageKey="my-app-theme" />`

const onChangeCode = `<ThemeSwitcher
  onChange={(theme) => console.log('Theme:', theme)}
/>`

export const ThemeSwitcherSection: Component = () => {
  return (
    <Section
      id="theme-switcher"
      header={{
        title: "Theme Switcher",
        icon: ThemeSwitcherIcon,
        description: "A ready-made component to toggle between light, dark, and system themes.",
      }}
    >
      <DemoWithCode title="Default" description="Compact icon-only theme switcher" code={defaultCode}>
        <ThemeSwitcher />
      </DemoWithCode>

      <DemoWithCode title="With Labels" description="Show text labels alongside icons" code={withLabelsCode}>
        <ThemeSwitcher withLabels />
      </DemoWithCode>

      <DemoWithCode title="Custom Storage Key" description="Use a custom localStorage key to avoid conflicts" code={storageKeyCode}>
        <ThemeSwitcher storageKey="my-app-theme" />
      </DemoWithCode>

      <DemoWithCode title="onChange Callback" description="React to theme changes programmatically" code={onChangeCode}>
        <ThemeSwitcher onChange={(theme) => console.log('Theme changed:', theme)} />
      </DemoWithCode>
    </Section>
  )
}
