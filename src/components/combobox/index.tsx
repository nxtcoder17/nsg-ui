import { Search as KobalteSearch } from '@kobalte/core/search'
import { type JSX, splitProps, Show, For, createSignal, createEffect, on } from 'solid-js'
import { cn } from '../../utils/cn'
import { CheckIcon, SearchIcon, SpinnerIcon, XIcon } from '../../icons'

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
  onInputChange?: (value: string) => void
  multiple?: boolean
  placeholder?: string
  loading?: boolean
  noResultsMessage?: string
  disabled?: boolean
  name?: string
  errorMessage?: string
  containerClass?: string
  /** Additional classes for the input element */
  inputClass?: string
  /** Additional classes for the control wrapper */
  triggerClass?: string
  debounce?: number
  /** When to open the dropdown: "focus" (click/focus) or "input" (typing only). Defaults to "focus". */
  triggerMode?: 'focus' | 'input'
  // For object options
  optionValue?: keyof T | ((option: T) => string)
  optionLabel?: keyof T | ((option: T) => string)
  optionDisabled?: keyof T | ((option: T) => boolean)
  /** Custom render function for dropdown items */
  itemComponent?: (item: T, state: ComboBoxItemState) => JSX.Element
  /** Prefix icon */
  prefix?: JSX.Element
  /** Custom content rendered below the listbox when there are no results */
  noResultComponent?: (inputValue: string) => JSX.Element
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
// ComboBox Component
// ============================================================================

export function ComboBox<T extends ComboBoxOption>(props: ComboBoxProps<T>): JSX.Element
export function ComboBox<T extends ComboBoxOption>(props: ComboBoxMultipleProps<T>): JSX.Element
export function ComboBox<T extends ComboBoxOption>(props: ComboBoxProps<T> | ComboBoxMultipleProps<T>): JSX.Element {
  const [local, others] = splitProps(props as ComboBoxProps<T>, [
    'options',
    'value',
    'onChange',
    'onInputChange',
    'multiple',
    'placeholder',
    'loading',
    'noResultsMessage',
    'disabled',
    'name',
    'errorMessage',
    'containerClass',
    'inputClass',
    'triggerClass',
    'debounce',
    'triggerMode',
    'optionValue',
    'optionLabel',
    'optionDisabled',
    'itemComponent',
    'prefix',
    'noResultComponent',
  ])

  const isInvalid = () => !!local.errorMessage
  const isMultiple = () => (props as ComboBoxMultipleProps<T>).multiple === true

  const [inputValue, setInputValue] = createSignal('')
  const [internalOptions, setInternalOptions] = createSignal<T[]>(local.options)

  // Sync internalOptions when external options change (e.g. async load)
  createEffect(on(() => local.options, (opts) => {
    if (!inputValue().trim()) {
      setInternalOptions(() => opts)
    }
  }))

  const hasExternalFilter = () => !!local.onInputChange
  const resolvedTriggerMode = () => local.triggerMode ?? 'focus'

  const handleInputChange = (value: string) => {
    setInputValue(value)
    if (local.onInputChange) {
      local.onInputChange(value)
    } else {
      // Built-in filtering when no external onInputChange
      const query = value.toLowerCase().trim()
      if (!query) {
        setInternalOptions(() => local.options)
      } else {
        setInternalOptions(() =>
          local.options.filter((opt) =>
            getOptionLabel(opt).toLowerCase().includes(query)
          )
        )
      }
    }
  }

  const resolvedOptions = () => {
    const opts = hasExternalFilter() ? local.options : internalOptions()
    if (!isMultiple()) return opts
    const selected = (props as ComboBoxMultipleProps<T>).value ?? []
    return opts.filter((opt) => !selected.includes(getOptionValue(opt)))
  }

  // Map string[] value back to T[] objects, preserving selection order
  const resolvedMultiValue = (): T[] => {
    const selected = (props as ComboBoxMultipleProps<T>).value ?? []
    const optionMap = new Map(local.options.map((opt) => [getOptionValue(opt), opt]))
    return selected.map((val) => optionMap.get(val)).filter(Boolean) as T[]
  }

  // Backspace removes last selected item when input is empty (multi-select)
  const handleBackspace = (e: KeyboardEvent) => {
    if (e.key !== 'Backspace') return
    if (!isMultiple()) return
    const input = e.target as HTMLInputElement
    if (input.value) return
    const current = (props as ComboBoxMultipleProps<T>).value ?? []
    if (current.length === 0) return
    ;(props as ComboBoxMultipleProps<T>).onChange(current.slice(0, -1))
  }

  // Select first non-disabled option on Enter when nothing is highlighted
  const handleKeyDown = (e: KeyboardEvent) => {
    handleBackspace(e)
    if (e.key !== 'Enter') return
    const input = e.target as HTMLInputElement
    const listboxId = input.getAttribute('aria-controls')
    const listbox = listboxId ? document.getElementById(listboxId) : null
    const highlighted = listbox?.querySelector('[data-highlighted]')
    if (highlighted) return // Kobalte handles it

    const opts = resolvedOptions()
    const firstEnabled = opts.find((opt) => !getOptionDisabled(opt))
    if (!firstEnabled) return
    e.preventDefault()

    if (isMultiple()) {
      const multiOnChange = (props as ComboBoxMultipleProps<T>).onChange
      const current = (props as ComboBoxMultipleProps<T>).value ?? []
      const val = getOptionValue(firstEnabled)
      if (!current.includes(val)) {
        multiOnChange([...current, val])
      }
      // Clear input text
      input.value = ''
      handleInputChange('')
    } else {
      // Single select: click the DOM item so Kobalte handles selection + close
      const firstItem = listbox?.querySelector('[role="option"]:not([data-disabled])') as HTMLElement | null
      firstItem?.click()
    }
  }

  const renderItemComponent = (itemProps: any) => (
    <KobalteSearch.Item
      item={itemProps.item}
      class={cn(
        'flex items-center justify-between gap-2 px-3 py-2 text-sm rounded-md cursor-pointer',
        'text-text',
        'data-[highlighted]:bg-primary-100 data-[highlighted]:text-primary-900',
        'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
        'outline-none'
      )}
    >
      {((state: { selected: () => boolean; highlighted: () => boolean; disabled: () => boolean } | undefined) => {
        if (!state) {
          return (
            <KobalteSearch.ItemLabel>
              {getOptionLabel(itemProps.item.rawValue)}
            </KobalteSearch.ItemLabel>
          )
        }
        return local.itemComponent ? (
          local.itemComponent(itemProps.item.rawValue, {
            selected: state.selected(),
            highlighted: state.highlighted(),
            disabled: state.disabled(),
          })
        ) : (
          <>
            <KobalteSearch.ItemLabel>
              {getOptionLabel(itemProps.item.rawValue)}
            </KobalteSearch.ItemLabel>
            <Show when={state.selected()}>
              <CheckIcon class="text-primary-500" />
            </Show>
          </>
        )
      }) as unknown as JSX.Element}
    </KobalteSearch.Item>
  )

  const renderContent = () => (
    <KobalteSearch.Portal>
      <KobalteSearch.Content
        class={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-lg',
          'bg-surface-raised text-text border border-border shadow-lg',
          'animate-slide-down'
        )}
      >
        <KobalteSearch.Listbox class="p-1 max-h-60 overflow-auto" />
        <Show when={local.noResultComponent && inputValue().trim()}>
          <KobalteSearch.NoResult class="px-3 py-6 text-sm text-text-secondary text-center">
            {local.noResultComponent!(inputValue().trim())}
          </KobalteSearch.NoResult>
        </Show>
      </KobalteSearch.Content>
    </KobalteSearch.Portal>
  )

  // Single select version
  if (!isMultiple()) {
    return (
      <div class="flex flex-col gap-0.5">
        <KobalteSearch<T>
          options={resolvedOptions()}
          onInputChange={handleInputChange}
          onChange={(val) => local.onChange(val ? getOptionValue(val) : '' as any)}
          optionValue={local.optionValue as any ?? getOptionValue}
          optionTextValue={getOptionLabel}
          optionLabel={local.optionLabel as any ?? getOptionLabel}
          optionDisabled={local.optionDisabled as any ?? getOptionDisabled}
          placeholder={local.placeholder}
          validationState={isInvalid() ? 'invalid' : 'valid'}
          disabled={local.disabled}
          name={local.name}
          debounceOptionsMillisecond={local.debounce}
          triggerMode={resolvedTriggerMode()}
          itemComponent={renderItemComponent}
          class={cn('relative', local.containerClass)}
          {...others as any}
        >
          <KobalteSearch.Control
            class={cn(
              'flex items-center gap-2 h-10 px-3 rounded-md',
              'bg-surface-raised border',
              'focus-within:ring-2 focus-within:border-transparent',
              isInvalid()
                ? 'border-danger-500 focus-within:ring-danger-200'
                : 'border-border focus-within:ring-ring',
              local.triggerClass
            )}
          >
            <KobalteSearch.Icon class="text-text-muted shrink-0">
              {local.prefix ?? <SearchIcon />}
            </KobalteSearch.Icon>
            <KobalteSearch.Input
              onKeyDown={handleKeyDown}
              class={cn(
                'flex-1 h-full text-sm bg-transparent',
                'text-text placeholder:text-text-muted',
                'focus:outline-none',
                'disabled:cursor-not-allowed',
                local.inputClass
              )}
            />
            <KobalteSearch.Indicator class="text-text-muted shrink-0">
              <Show when={local.loading}>
                <SpinnerIcon />
              </Show>
            </KobalteSearch.Indicator>
          </KobalteSearch.Control>
          {renderContent()}
        </KobalteSearch>
        <Show when={local.errorMessage}>
          <span class="text-xs text-danger-500">{local.errorMessage}</span>
        </Show>
      </div>
    )
  }

  // Multiple select version
  const multiProps = props as ComboBoxMultipleProps<T>
  return (
    <div class="flex flex-col gap-0.5">
      <KobalteSearch<T>
        multiple
        options={resolvedOptions()}
        onInputChange={handleInputChange}
        onChange={(vals: any) => {
          // Kobalte fires with its full internal selection — find the new item(s)
          const allVals: string[] = vals.map(getOptionValue)
          const current = multiProps.value ?? []
          const added = allVals.filter((v: string) => !current.includes(v))
          if (added.length > 0) {
            multiProps.onChange([...current, ...added])
          }
        }}
        optionValue={local.optionValue as any ?? getOptionValue}
        optionTextValue={getOptionLabel}
        optionLabel={local.optionLabel as any ?? getOptionLabel}
        optionDisabled={local.optionDisabled as any ?? getOptionDisabled}
        placeholder={local.placeholder}
        validationState={isInvalid() ? 'invalid' : 'valid'}
        disabled={local.disabled}
        name={local.name}
        debounceOptionsMillisecond={local.debounce}
        triggerMode={resolvedTriggerMode()}
        itemComponent={renderItemComponent}
        class={cn('relative', local.containerClass)}
        {...others as any}
      >
        <KobalteSearch.Control<T>
          class={cn(
            'flex items-start gap-2 min-h-10 px-2 py-1.5 rounded-md',
            'bg-surface-raised border',
            'focus-within:ring-2 focus-within:border-transparent',
            isInvalid()
              ? 'border-danger-500 focus-within:ring-danger-200'
              : 'border-border focus-within:ring-ring',
            local.triggerClass
          )}
        >
        {(_state) => (
          <>
            <div class="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
              <For each={resolvedMultiValue()}>
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
                      onClick={() => {
                        const val = getOptionValue(option)
                        const current = (props as ComboBoxMultipleProps<T>).value ?? []
                        ;(props as ComboBoxMultipleProps<T>).onChange(current.filter((v) => v !== val))
                      }}
                      class="hover:bg-primary-200 rounded p-0.5"
                    >
                      <XIcon size="xs" />
                    </button>
                  </span>
                )}
              </For>
              <KobalteSearch.Input
                onKeyDown={handleKeyDown}
                placeholder={resolvedMultiValue().length === 0 ? local.placeholder : undefined}
                class={cn(
                  'flex-1 min-w-20 h-6 px-1 text-sm bg-transparent',
                  'text-text placeholder:text-text-muted',
                  'focus:outline-none',
                  'disabled:cursor-not-allowed',
                  local.inputClass
                )}
              />
            </div>
            <KobalteSearch.Indicator class="text-text-muted shrink-0 self-center">
              <Show when={local.loading}>
                <SpinnerIcon />
              </Show>
            </KobalteSearch.Indicator>
          </>
        )}
      </KobalteSearch.Control>
      {renderContent()}
      </KobalteSearch>
      <Show when={local.errorMessage}>
        <span class="text-xs text-danger-500">{local.errorMessage}</span>
      </Show>
    </div>
  )
}
