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

export type ComboBoxBaseProps<T extends ComboBoxOption = ComboBoxOption> = {
  options: T[]
  placeholder?: string
  loading?: boolean
  noResultsFallback?: JSX.Element
  disabled?: boolean
  name?: string
  errorMessage?: string
  class?: string
  debounce?: number
  triggerMode?: 'focus' | 'input'
  itemComponent?: (item: T, state: ComboBoxItemState) => JSX.Element
  prefix?: JSX.Element
  noResultComponent?: (inputValue: string, clear: () => void) => JSX.Element
  onSearch?: (query: string) => void
}

export type ComboBoxSingleProps<T extends ComboBoxOption = ComboBoxOption> = ComboBoxBaseProps<T> & {
  multiple?: false
  value?: string
  onChange: (value: string | undefined) => void
}

export type ComboBoxMultipleProps<T extends ComboBoxOption = ComboBoxOption> = ComboBoxBaseProps<T> & {
  multiple: true
  value?: string[]
  onChange: (value: string[]) => void
}

export type ComboBoxProps<T extends ComboBoxOption = ComboBoxOption> =
  | ComboBoxSingleProps<T>
  | ComboBoxMultipleProps<T>

export const ComboBoxSearchFilters = {
  contains: <T extends ComboBoxOption>(options: T[], query: string): T[] => {
    const q = query.toLowerCase().trim()
    if (!q) return options
    return options.filter((opt) => {
      const label = typeof opt === 'string' ? opt : opt.label
      return label.toLowerCase().includes(q)
    })
  },

  startsWith: <T extends ComboBoxOption>(options: T[], query: string): T[] => {
    const q = query.toLowerCase().trim()
    if (!q) return options
    return options.filter((opt) => {
      const label = typeof opt === 'string' ? opt : opt.label
      return label.toLowerCase().startsWith(q)
    })
  },

  fuzzy: <T extends ComboBoxOption>(options: T[], query: string): T[] => {
    const q = query.toLowerCase().trim()
    if (!q) return options
    return options.filter((opt) => {
      const label = (typeof opt === 'string' ? opt : opt.label).toLowerCase()
      let searchIdx = 0
      for (let i = 0; i < label.length; i++) {
        if (label[i] === q[searchIdx]) {
          searchIdx++
          if (searchIdx === q.length) return true
        }
      }
      return q.length === 0
    })
  },
}

const getOptionValue = (option: ComboBoxOption): string => {
  if (typeof option === 'string') return option
  return option.value
}

const getOptionLabel = (option: ComboBoxOption): string => {
  if (typeof option === 'string') return option
  return option.label
}

const getOptionDisabled = (option: ComboBoxOption): boolean => {
  if (typeof option === 'string') return false
  return option.disabled ?? false
}

export function ComboBox<T extends ComboBoxOption>(props: ComboBoxSingleProps<T>): JSX.Element
export function ComboBox<T extends ComboBoxOption>(props: ComboBoxMultipleProps<T>): JSX.Element
export function ComboBox<T extends ComboBoxOption>(props: ComboBoxProps<T>): JSX.Element {
  const [local, others] = splitProps(props as ComboBoxSingleProps<T>, [
    'options',
    'value',
    'onChange',
    'placeholder',
    'loading',
    'noResultsFallback',
    'disabled',
    'name',
    'errorMessage',
    'class',
    'debounce',
    'triggerMode',
    'itemComponent',
    'prefix',
    'noResultComponent',
    'onSearch',
  ])

  const isInvalid = () => !!local.errorMessage
  const isMultiple = () => (props as ComboBoxMultipleProps<T>).multiple === true

  let inputEl: HTMLInputElement | undefined
  let noResultEl: HTMLElement | undefined

  const [inputValue, setInputValue] = createSignal('')
  const [internalOptions, setInternalOptions] = createSignal<T[]>(local.options)

  createEffect(on([() => local.options, inputValue], ([opts, query]) => {
    if (local.onSearch) return

    const q = query.toLowerCase().trim()
    if (!q) {
      setInternalOptions(() => opts)
    } else {
      setInternalOptions(() =>
        opts.filter((opt) =>
          getOptionLabel(opt).toLowerCase().includes(q)
        )
      )
    }
  }))

  const clearInput = () => {
    handleSearchChange('')
    if (inputEl) {
      inputEl.value = ''
      inputEl.dispatchEvent(new InputEvent('input', { bubbles: true }))
      inputEl.focus()
    }
  }

  const hasExternalFilter = () => !!local.onSearch
  const resolvedTriggerMode = () => local.triggerMode ?? 'focus'

  const handleSearchChange = (value: string) => {
    setInputValue(value)
    if (local.onSearch) {
      local.onSearch(value)
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
    if (!firstEnabled) {
      if (local.noResultComponent && inputValue().trim() && noResultEl) {
        e.preventDefault()
        const btn = noResultEl.querySelector<HTMLElement>('button, [role="button"]')
        btn?.click()
      }
      return
    }
    e.preventDefault()

    if (isMultiple()) {
      const multiOnChange = (props as ComboBoxMultipleProps<T>).onChange
      const current = (props as ComboBoxMultipleProps<T>).value ?? []
      const val = getOptionValue(firstEnabled)
      if (!current.includes(val)) {
        multiOnChange([...current, val])
      }
      input.value = ''
      handleSearchChange('')
    } else {
      const firstItem = listbox?.querySelector('[role="option"]:not([data-disabled])') as HTMLElement | null
      firstItem?.click()
    }
  }

  const renderItemComponent = (itemProps: any) => (
    <KobalteSearch.Item
      item={itemProps.item}
      data-nsg-combobox="item"
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
        class="z-50 nsg-combobox"
        data-nsg-combobox="content"
      >
        <KobalteSearch.Listbox class="p-1 max-h-60 overflow-auto empty:hidden" />
        <Show when={local.noResultComponent && inputValue().trim()}>
          <KobalteSearch.NoResult
            ref={(el) => { noResultEl = el }}
            class="px-3 py-2 text-sm text-text-secondary"
          >
            {local.noResultComponent!(inputValue().trim(), clearInput)}
          </KobalteSearch.NoResult>
        </Show>
        <Show when={!local.noResultComponent && local.noResultsFallback && resolvedOptions().length === 0}>
          <KobalteSearch.NoResult
            class="px-3 py-2 text-sm text-text-secondary"
          >
            {local.noResultsFallback}
          </KobalteSearch.NoResult>
        </Show>
      </KobalteSearch.Content>
    </KobalteSearch.Portal>
  )

  if (!isMultiple()) {
    const singleProps = props as ComboBoxSingleProps<T>
    return (
      <div
        class={cn('nsg-combobox', local.class)}
        data-nsg-combobox="root"
      >
        <KobalteSearch<T>
          options={resolvedOptions()}
          onInputChange={handleSearchChange}
          onChange={(val) => singleProps.onChange(val ? getOptionValue(val) : undefined)}
          optionValue={getOptionValue}
          optionTextValue={getOptionLabel}
          optionLabel={getOptionLabel}
          optionDisabled={getOptionDisabled}
          placeholder={local.placeholder}
          validationState={isInvalid() ? 'invalid' : 'valid'}
          disabled={local.disabled}
          name={local.name}
          debounceOptionsMillisecond={local.debounce}
          triggerMode={resolvedTriggerMode()}
          itemComponent={renderItemComponent}
          class="relative"
          {...others as any}
        >
          <KobalteSearch.Control
            data-nsg-combobox="control"
            {...(isInvalid() && { 'data-invalid': true })}
          >
            <KobalteSearch.Icon class="text-text-muted shrink-0">
              {local.prefix ?? <SearchIcon />}
            </KobalteSearch.Icon>
            <KobalteSearch.Input
              ref={(el) => { inputEl = el }}
              onKeyDown={handleKeyDown}
              data-nsg-combobox="input"
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
          <span data-nsg-combobox="error">
            {local.errorMessage}
          </span>
        </Show>
      </div>
    )
  }

  const multiProps = props as ComboBoxMultipleProps<T>
  return (
    <div
      class={cn('nsg-combobox', local.class)}
      data-nsg-combobox="root"
    >
      <KobalteSearch<T>
        multiple
        options={resolvedOptions()}
        onInputChange={handleSearchChange}
        onChange={(vals: any) => {
          const allVals: string[] = vals.map(getOptionValue)
          const current = multiProps.value ?? []
          const added = allVals.filter((v: string) => !current.includes(v))
          if (added.length > 0) {
            multiProps.onChange([...current, ...added])
          }
        }}
        optionValue={getOptionValue}
        optionTextValue={getOptionLabel}
        optionLabel={getOptionLabel}
        optionDisabled={getOptionDisabled}
        placeholder={local.placeholder}
        validationState={isInvalid() ? 'invalid' : 'valid'}
        disabled={local.disabled}
        name={local.name}
        debounceOptionsMillisecond={local.debounce}
        triggerMode={resolvedTriggerMode()}
        itemComponent={renderItemComponent}
        class="relative"
        {...others as any}
      >
        <KobalteSearch.Control<T>
          data-nsg-combobox="control"
          data-multiple="true"
          {...(isInvalid() && { 'data-invalid': true })}
        >
          {(_state) => (
            <>
              <div class="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
                <For each={resolvedMultiValue()}>
                  {(option) => (
                    <span
                      data-nsg-combobox="tag"
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      {getOptionLabel(option)}
                      <button
                        type="button"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation()
                          const val = getOptionValue(option)
                          const current = multiProps.value ?? []
                          multiProps.onChange(current.filter((v) => v !== val))
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
                  data-nsg-combobox="input"
                  data-multiple="true"
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
        <span data-nsg-combobox="error">
          {local.errorMessage}
        </span>
      </Show>
    </div>
  )
}
