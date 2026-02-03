import { Component } from 'solid-js'
import { Text } from 'nsg-ui'
import { DemoWithCode } from '../components/CodeBlock'

export function TextIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M4 7V4h16v3" />
      <path d="M9 20h6" />
      <path d="M12 4v16" />
    </svg>
  )
}

const colorVariantsCode = `<Text>Default text</Text>
<Text color="secondary">Secondary text</Text>
<Text color="muted">Muted text</Text>
<Text color="primary">Primary text</Text>
<Text color="success">Success text</Text>
<Text color="warning">Warning text</Text>
<Text color="danger">Danger text</Text>`

const sizesCode = `<Text class="text-xs">Extra small</Text>
<Text class="text-sm">Small</Text>
<Text class="text-base">Base</Text>
<Text class="text-lg">Large</Text>
<Text class="text-xl">Extra large</Text>`

const weightsCode = `<Text>Normal weight</Text>
<Text class="font-medium">Medium weight</Text>
<Text class="font-semibold">Semibold weight</Text>
<Text class="font-bold">Bold weight</Text>`

const semanticCode = `<Text as="h1" class="text-2xl font-bold">Heading 1</Text>
<Text as="h2" class="text-xl font-semibold">Heading 2</Text>
<Text as="h3" class="text-lg font-medium">Heading 3</Text>
<Text as="p" color="secondary">Paragraph text</Text>
<Text as="label" class="text-sm font-medium">Form label</Text>`

const patternsCode = `{/* Form field with helper text */}
<Text as="label" class="text-sm font-medium">Email</Text>
<input type="email" />
<Text color="secondary" class="text-xs">We'll never share your email.</Text>

{/* Error state */}
<Text as="label" class="text-sm font-medium">Password</Text>
<input type="password" class="border-danger-500" />
<Text color="danger" class="text-xs">Password must be at least 8 characters.</Text>

{/* Success message */}
<Text color="success" class="text-sm">Your changes have been saved.</Text>`

export const TextSection: Component = () => {
  return (
    <section id="text" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <TextIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">Text</h2>
        </div>
        <p class="text-text-secondary ml-11">Theme-aware text component with semantic color variants.</p>
      </div>

      <div class="grid gap-6">
        <DemoWithCode title="Color Variants" description="Semantic colors that respect the current theme" code={colorVariantsCode}>
          <div class="space-y-3">
            <Text as="p">Default text - primary content color</Text>
            <Text as="p" color="secondary">Secondary text - supporting content</Text>
            <Text as="p" color="muted">Muted text - de-emphasized content</Text>
            <Text as="p" color="primary">Primary text - branded accent</Text>
            <Text as="p" color="success">Success text - positive states</Text>
            <Text as="p" color="warning">Warning text - caution states</Text>
            <Text as="p" color="danger">Danger text - error states</Text>
          </div>
        </DemoWithCode>

        <DemoWithCode title="With Sizes" description="Combine with Tailwind text sizes" code={sizesCode}>
          <div class="space-y-3">
            <Text as="p" class="text-xs">Extra small text (text-xs)</Text>
            <Text as="p" class="text-sm">Small text (text-sm)</Text>
            <Text as="p" class="text-base">Base text (text-base)</Text>
            <Text as="p" class="text-lg">Large text (text-lg)</Text>
            <Text as="p" class="text-xl">Extra large text (text-xl)</Text>
          </div>
        </DemoWithCode>

        <DemoWithCode title="With Weights" description="Combine with Tailwind font weights" code={weightsCode}>
          <div class="space-y-3">
            <Text as="p">Normal weight (default)</Text>
            <Text as="p" class="font-medium">Medium weight</Text>
            <Text as="p" class="font-semibold">Semibold weight</Text>
            <Text as="p" class="font-bold">Bold weight</Text>
          </div>
        </DemoWithCode>

        <DemoWithCode title="Semantic Elements" description="Render as different HTML elements" code={semanticCode}>
          <div class="space-y-4">
            <Text as="h1" class="text-2xl font-bold">Heading 1 (as h1)</Text>
            <Text as="h2" class="text-xl font-semibold">Heading 2 (as h2)</Text>
            <Text as="h3" class="text-lg font-medium">Heading 3 (as h3)</Text>
            <Text as="p" color="secondary">
              This is a paragraph element. It can contain longer content and will flow naturally.
            </Text>
            <Text as="label" class="text-sm font-medium">Form label (as label)</Text>
          </div>
        </DemoWithCode>

        <DemoWithCode title="Common Patterns" description="Real-world usage examples" code={patternsCode}>
          <div class="space-y-6">
            {/* Form field pattern */}
            <div class="space-y-1">
              <Text as="label" class="text-sm font-medium">Email address</Text>
              <div class="h-10 px-3 border border-border rounded-md bg-surface flex items-center">
                <Text color="muted">user@example.com</Text>
              </div>
              <Text color="secondary" class="text-xs">We'll never share your email.</Text>
            </div>

            {/* Error state */}
            <div class="space-y-1">
              <Text as="label" class="text-sm font-medium">Password</Text>
              <div class="h-10 px-3 border border-danger-500 rounded-md bg-surface flex items-center">
                <Text color="muted">••••••</Text>
              </div>
              <Text color="danger" class="text-xs">Password must be at least 8 characters.</Text>
            </div>

            {/* Success message */}
            <div class="flex items-center gap-2 p-3 rounded-md bg-success-50 border border-success-200">
              <svg class="w-4 h-4 text-success-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <Text color="success" class="text-sm">Your changes have been saved.</Text>
            </div>
          </div>
        </DemoWithCode>
      </div>
    </section>
  )
}
