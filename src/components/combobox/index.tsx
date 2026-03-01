import { Search as KobalteSearch } from '@kobalte/core/search'
import { type JSX, splitProps, Show, For, createSignal, createEffect, on } from 'solid-js'
import { cn } from '../../utils/cn'
import { CheckIcon, SearchIcon, SpinnerIcon, XIcon } from '../../icons'

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
  inputClass?: string
  triggerClass?: string
  debounce?: number
  triggerMode?: 'focus' | 'input'
  optionValue?: keyof T | ((option: T) => string)
  optionLabel?: keyof T | ((option: T) => string)
  optionDisabled?: keyof T | ((option: T) => boolean)
  itemComponent?: (item: T, state: ComboBoxItemState) => JSX.Element
  prefix?: JSX.Element
  noResultComponent?: (inputValue: string, clear: () => void) => JSX.Element
  unstyled?: boolean
}

export type ComboBoxMultipleProps<T extends ComboBoxOption = ComboBoxOption> = Omit<ComboBoxProps<T>, 'value' | 'onChange' | 'multiple'> & {
  multiple: true
  value: string[]
  onChange: (value: string[]) => void
}

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
    'unstyled',
  ])

  const isInvalid = () => !!local.errorMessage
  const isMultiple = () => (props as ComboBoxMultipleProps<T>).multiple === true

  let inputEl: HTMLInputElement | undefined

  const [inputValue, setInputValue] = createSignal('')
  const [internalOptions, setInternalOptions] = createSignal<T[]>(local.options)

  createEffect(on(() => local.options, (opts) => {
    if (!inputValue().trim()) {
      setInternalOptions(() => opts)
    }
  }))

  const clearInput = () => {
    if (inputEl) inputEl.value = ''
    handleInputChange('')
    inputEl?.focus()
  }

  const hasExternalFilter = () => !!local.onInputChange
  const resolvedTriggerMode = () => local.triggerMode ?? 'focus'

  const handleInputChange = (value: string) => {
    setInputValue(value)
    if (local.onInputChange) {
      local.onInputChange(value)
    } else {
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

  const resolvedMultiValue = (): T[] => {
    const selected = (props as ComboBoxMultipleProps<T>).value ?? []
    const optionMap = new Map(local.options.map((opt) => [getOptionValue(opt), opt]))
    return selected.map((val) => optionMap.get(val)).filter(Boolean) as T[]
  }

  const handleBackspace = (e: KeyboardEvent) => {
    if (e.key !== 'Backspace') return
    if (!isMultiple()) return
    const input = e.target as HTMLInputElement
    if (input.value) return
    const current = (props as ComboBoxMultipleProps<T>).value ?? []
    if (current.length === 0) return
    ;(props as ComboBoxMultipleProps<T>).onChange(current.slice(0, -1))
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    handleBackspace(e)
    if (e.key !== 'Enter') return
    const input = e.target as HTMLInputElement
    const listboxId = input.getAttribute('aria-controls')
    const listbox = listboxId ? document.getElementById(listboxId) : null
    const highlighted = listbox?.querySelector('[data-highlighted]')
    if (highlighted) return

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
      input.value = ''
      handleInputChange('')
    } else {
      const firstItem = listbox?.querySelector('[role="option"]:not([data-disabled])') as HTMLElement | null
      firstItem?.click()
    }
  }

  const renderItemComponent = (itemProps: any) => (
    <KobalteSearch.Item
      item={itemProps.item}
      {...(!local.unstyled && { 'data-nsg-combo-box': 'item' })}
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
        class={cn('z-50', !local.unstyled && 'nsg-combo-box')}
        {...(!local.unstyled && { 'data-nsg-combo-box': 'content' })}
      >
        <KobalteSearch.Listbox class="p-1 max-h-60 overflow-auto empty:hidden" />
        <Show when={local.noResultComponent && inputValue().trim()}>
          <KobalteSearch.NoResult class="px-3 py-2 text-sm text-text-secondary">
            {local.noResultComponent!(inputValue().trim(), clearInput)}
          </KobalteSearch.NoResult>
        </Show>
      </KobalteSearch.Content>
    </KobalteSearch.Portal>
  )

  // Single select
  if (!isMultiple()) {
    return (
      <div
        class={cn(!local.unstyled && 'nsg-combo-box')}
        {...(!local.unstyled && { 'data-nsg-combo-box': 'root' })}
      >
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
            class={cn(local.triggerClass)}
            {...(!local.unstyled && { 'data-nsg-combo-box': 'control' })}
            {...(isInvalid() && { 'data-invalid': true })}
          >
            <KobalteSearch.Icon class="text-text-muted shrink-0">
              {local.prefix ?? <SearchIcon />}
            </KobalteSearch.Icon>
            <KobalteSearch.Input
              ref={(el) => { inputEl = el }}
              onKeyDown={handleKeyDown}
              class={cn(local.inputClass)}
              {...(!local.unstyled && { 'data-nsg-combo-box': 'input' })}
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
          <span {...(!local.unstyled && { 'data-nsg-combo-box': 'error' })}>
            {local.errorMessage}
          </span>
        </Show>
      </div>
    )
  }

  // Multiple select
  const multiProps = props as ComboBoxMultipleProps<T>
  return (
    <div
      class={cn(!local.unstyled && 'nsg-combo-box')}
      {...(!local.unstyled && { 'data-nsg-combo-box': 'root' })}
    >
      <KobalteSearch<T>
        multiple
        options={resolvedOptions()}
        onInputChange={handleInputChange}
        onChange={(vals: any) => {
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
          class={cn(local.triggerClass)}
          {...(!local.unstyled && { 'data-nsg-combo-box': 'control' })}
          data-variant="multiple"
          {...(isInvalid() && { 'data-invalid': true })}
        >
          {(_state) => (
            <>
              <div class="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
                <For each={resolvedMultiValue()}>
                  {(option) => (
                    <span
                      {...(!local.unstyled && { 'data-nsg-combo-box': 'tag' })}
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
                  ref={(el) => { inputEl = el }}
                  onKeyDown={handleKeyDown}
                  placeholder={resolvedMultiValue().length === 0 ? local.placeholder : undefined}
                  class={cn(local.inputClass)}
                  {...(!local.unstyled && { 'data-nsg-combo-box': 'input' })}
                  data-variant="multiple"
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
        <span {...(!local.unstyled && { 'data-nsg-combo-box': 'error' })}>
          {local.errorMessage}
        </span>
      </Show>
    </div>
  )
}
