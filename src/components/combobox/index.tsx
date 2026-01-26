import { Combobox as KobalteCombobox } from '@kobalte/core/combobox'
import { type JSX, splitProps, Show, For } from 'solid-js'
import { cn } from '../../utils/cn'
import { CheckIcon, ChevronDownIcon, XIcon } from '../../icons'

// ============================================================================
// Types
// ============================================================================

export type ComboBoxOption = string | { value: string; label: string; disabled?: boolean }

export type ComboBoxItemState = {
  selected: boolean
  highlighted: boolean
  disabled: boolean
}

export type ComboBoxProps<T extends ComboBoxOption = ComboBoxOption> = {
  options: T[]
  value: T extends string ? string : string
  onChange: (value: T extends string ? string : string) => void
  multiple?: boolean
  placeholder?: string
  disabled?: boolean
  name?: string
  errorMessage?: string
  containerClass?: string
  // For object options
  optionValue?: keyof T | ((option: T) => string)
  optionLabel?: keyof T | ((option: T) => string)
  optionDisabled?: keyof T | ((option: T) => boolean)
  /** Custom render function for dropdown items */
  itemComponent?: (item: T, state: ComboBoxItemState) => JSX.Element
}

export type ComboBoxMultipleProps<T extends ComboBoxOption = ComboBoxOption> = Omit<ComboBoxProps<T>, 'value' | 'onChange' | 'multiple'> & {
  multiple: true
  value: string[]
  onChange: (value: string[]) => void
}

// ============================================================================
// Helper Functions
// ============================================================================

const getOptionValue = <T extends ComboBoxOption>(option: T): string => {
  if (typeof option === 'string') return option
  return option.value
}

const getOptionLabel = <T extends ComboBoxOption>(option: T): string => {
  if (typeof option === 'string') return option
  return option.label
}

const getOptionDisabled = <T extends ComboBoxOption>(option: T): boolean => {
  if (typeof option === 'string') return false
  return option.disabled ?? false
}

// ============================================================================
// ComboBox Component (Single Select)
// ============================================================================

export function ComboBox<T extends ComboBoxOption>(props: ComboBoxProps<T>): JSX.Element
export function ComboBox<T extends ComboBoxOption>(props: ComboBoxMultipleProps<T>): JSX.Element
export function ComboBox<T extends ComboBoxOption>(props: ComboBoxProps<T> | ComboBoxMultipleProps<T>): JSX.Element {
  const [local, others] = splitProps(props as ComboBoxProps<T>, [
    'options',
    'value',
    'onChange',
    'multiple',
    'placeholder',
    'disabled',
    'name',
    'errorMessage',
    'containerClass',
    'optionValue',
    'optionLabel',
    'optionDisabled',
    'itemComponent',
  ])

  const isInvalid = () => !!local.errorMessage

  const isMultiple = () => (props as ComboBoxMultipleProps<T>).multiple === true

  // Single select version
  if (!isMultiple()) {
    return (
      <div class="flex flex-col gap-0.5">
        <KobalteCombobox<T>
          options={local.options}
          value={local.value as T | undefined}
          onChange={(val) => local.onChange(val ? getOptionValue(val) : '' as any)}
          optionValue={local.optionValue as any ?? getOptionValue}
          optionTextValue={getOptionLabel}
          optionLabel={local.optionLabel as any ?? getOptionLabel}
          optionDisabled={local.optionDisabled as any ?? getOptionDisabled}
          placeholder={local.placeholder}
          validationState={isInvalid() ? 'invalid' : 'valid'}
          disabled={local.disabled}
          name={local.name}
          itemComponent={(itemProps) => (
            <KobalteCombobox.Item
              item={itemProps.item}
              class={cn(
                'flex items-center justify-between gap-2 px-3 py-2 text-sm rounded-md cursor-pointer',
                'text-text',
                'data-[highlighted]:bg-primary-100 data-[highlighted]:text-primary-900',
                'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
                'outline-none'
              )}
            >
              {(state) => local.itemComponent ? (
                local.itemComponent(itemProps.item.rawValue, {
                  selected: state.selected(),
                  highlighted: state.highlighted(),
                  disabled: state.disabled(),
                })
              ) : (
                <>
                  <KobalteCombobox.ItemLabel>
                    {getOptionLabel(itemProps.item.rawValue)}
                  </KobalteCombobox.ItemLabel>
                  <KobalteCombobox.ItemIndicator>
                    <CheckIcon class="text-primary-500" />
                  </KobalteCombobox.ItemIndicator>
                </>
              )}
            </KobalteCombobox.Item>
          )}
          class={cn('relative', local.containerClass)}
          {...others as any}
        >
          <KobalteCombobox.Control class="flex items-center">
            <KobalteCombobox.Input
              class={cn(
                'w-full h-10 px-3 pr-10 text-sm rounded-md',
                'bg-surface-raised border',
                'text-text placeholder:text-text-muted',
                'focus:outline-none focus:ring-2 focus:border-transparent',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                isInvalid()
                  ? 'border-danger-500 focus:ring-danger-200'
                  : 'border-border focus:ring-ring'
              )}
            />
            <KobalteCombobox.Trigger class="absolute right-1 h-8 w-8 flex items-center justify-center rounded hover:bg-neutral-100">
              <KobalteCombobox.Icon>
                <ChevronDownIcon class="text-text-secondary" />
              </KobalteCombobox.Icon>
            </KobalteCombobox.Trigger>
          </KobalteCombobox.Control>
          <KobalteCombobox.Portal>
            <KobalteCombobox.Content
              class={cn(
                'z-50 min-w-[8rem] overflow-hidden rounded-lg',
                'bg-surface-raised border border-border shadow-lg',
                'animate-slide-down'
              )}
            >
              <KobalteCombobox.Listbox class="p-1 max-h-60 overflow-auto" />
            </KobalteCombobox.Content>
          </KobalteCombobox.Portal>
        </KobalteCombobox>
        <Show when={local.errorMessage}>
          <span class="text-xs text-danger-500">{local.errorMessage}</span>
        </Show>
      </div>
    )
  }

  // Multiple select version
  return (
    <div class="flex flex-col gap-0.5">
      <KobalteCombobox<T>
        multiple
        options={local.options}
        value={(local.value ?? []) as T[]}
        onChange={(vals) => (local.onChange as any)(vals.map(getOptionValue))}
        optionValue={local.optionValue as any ?? getOptionValue}
        optionTextValue={getOptionLabel}
        optionLabel={local.optionLabel as any ?? getOptionLabel}
        optionDisabled={local.optionDisabled as any ?? getOptionDisabled}
        placeholder={local.placeholder}
        validationState={isInvalid() ? 'invalid' : 'valid'}
        disabled={local.disabled}
        name={local.name}
        itemComponent={(itemProps) => (
          <KobalteCombobox.Item
            item={itemProps.item}
            class={cn(
              'flex items-center justify-between gap-2 px-3 py-2 text-sm rounded-md cursor-pointer',
              'text-text',
              'data-[highlighted]:bg-primary-100 data-[highlighted]:text-primary-900',
              'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
              'outline-none'
            )}
          >
            {(state) => local.itemComponent ? (
              local.itemComponent(itemProps.item.rawValue, {
                selected: state.selected(),
                highlighted: state.highlighted(),
                disabled: state.disabled(),
              })
            ) : (
              <>
                <KobalteCombobox.ItemLabel>
                  {getOptionLabel(itemProps.item.rawValue)}
                </KobalteCombobox.ItemLabel>
                <KobalteCombobox.ItemIndicator>
                  <CheckIcon class="text-primary-500" />
                </KobalteCombobox.ItemIndicator>
              </>
            )}
          </KobalteCombobox.Item>
        )}
        class={cn('relative', local.containerClass)}
        {...others as any}
      >
        <KobalteCombobox.Control<T>
          class={cn(
            'flex items-start gap-2 min-h-10 px-2 py-1.5 rounded-md',
            'bg-surface-raised border',
            'focus-within:ring-2 focus-within:border-transparent',
            isInvalid()
              ? 'border-danger-500 focus-within:ring-danger-200'
              : 'border-border focus-within:ring-ring'
          )}
        >
        {(state) => (
          <>
            {/* Tags + Input wrapper - this wraps, chevron doesn't */}
            <div class="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
              <For each={state.selectedOptions()}>
                {(option) => (
                  <span
                    class={cn(
                      'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium',
                      'bg-primary-100 text-primary-800'
                    )}
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    {getOptionLabel(option)}
                    <button
                      type="button"
                      onClick={() => state.remove(option)}
                      class="hover:bg-primary-200 rounded p-0.5"
                    >
                      <XIcon size="xs" />
                    </button>
                  </span>
                )}
              </For>
              <KobalteCombobox.Input
                placeholder={state.selectedOptions().length === 0 ? local.placeholder : undefined}
                class={cn(
                  'flex-1 min-w-20 h-6 px-1 text-sm bg-transparent',
                  'text-text placeholder:text-text-muted',
                  'focus:outline-none',
                  'disabled:cursor-not-allowed'
                )}
              />
            </div>
            {/* Chevron - always at right edge */}
            <KobalteCombobox.Trigger class="h-7 w-7 flex items-center justify-center rounded hover:bg-neutral-100 shrink-0 self-center">
              <KobalteCombobox.Icon>
                <ChevronDownIcon class="text-text-secondary" />
              </KobalteCombobox.Icon>
            </KobalteCombobox.Trigger>
          </>
        )}
      </KobalteCombobox.Control>
      <KobalteCombobox.Portal>
        <KobalteCombobox.Content
          class={cn(
            'z-50 min-w-[8rem] overflow-hidden rounded-lg',
            'bg-surface-raised border border-border shadow-lg',
            'animate-slide-down'
          )}
        >
          <KobalteCombobox.Listbox class="p-1 max-h-60 overflow-auto" />
        </KobalteCombobox.Content>
      </KobalteCombobox.Portal>
      </KobalteCombobox>
      <Show when={local.errorMessage}>
        <span class="text-xs text-danger-500">{local.errorMessage}</span>
      </Show>
    </div>
  )
}
