import {type Component, type JSX, splitProps} from 'solid-js';

export type SectionProps = {
  header: SectionHeaderProps
  children: JSX.Element
}

export type SectionHeaderProps = {
  icon: Component<{ class?: string }>
  title: string
  description: string
};

function SectionHeader(props: SectionHeaderProps) {
  return <div class="py-4 flex flex-row gap-3">
    <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
      <props.icon class="w-5 h-5 text-primary" />
    </div>
    <div class="flex flex-col">
      <h2 class="text-2xl font-bold text-text titlecase">{props.title}</h2>
      <p class="text-text-secondary">{props.description}</p>
    </div>
  </div>
}

export function Section(props: SectionProps) {
  const [local, others] = splitProps(props, ['header', 'children'])

  return <section class="scroll-mt-24 flex flex-col gap-4 mt-8" {...others}>
    <SectionHeader {...props.header} />
    {props.children}
  </section>;
}

