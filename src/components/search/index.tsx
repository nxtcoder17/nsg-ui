import { Search as KobalteSearch } from '@kobalte/core/search'
import { type JSX, splitProps, Show } from 'solid-js'
import { cn } from '../../utils/cn'
import { CheckIcon, SearchIcon, SpinnerIcon } from '../../icons'

export type SearchOption = string | { value: string; label: string; disabled?: boolean }

export type SearchItemState = {
  selected: boolean
  highlighted: boolean
  disabled: boolean
}

export type SearchProps<T extends SearchOption = SearchOption> = {
  options: T[]
  value: string | null
  onChange: (value: string | null) => void
  onInputChange?: (value: string) => void
  placeholder?: string
  loading?: boolean
  noResultsMessage?: string
  disabled?: boolean
  name?: string
  errorMessage?: string
  containerClass?: string
  debounce?: number
  // For object options
  optionValue?: keyof T | ((option: T) => string)
  optionLabel?: keyof T | ((option: T) => string)
  optionDisabled?: keyof T | ((option: T) => boolean)
  /** Custom render function for dropdown items */
  itemComponent?: (item: T, state: SearchItemState) => JSX.Element
  /** Prefix icon */
  prefix?: JSX.Element
}

const getOptionValue = <T extends SearchOption>(option: T): string => {
  if (typeof option === 'string') return option
  return option.value
}

const getOptionLabel = <T extends SearchOption>(option: T): string => {
  if (typeof option === 'string') return option
  return option.label
}

const getOptionDisabled = <T extends SearchOption>(option: T): boolean => {
  if (typeof option === 'string') return false
  return option.disabled ?? false
}

export function Search<T extends SearchOption>(props: SearchProps<T>): JSX.Element {
  const [local, others] = splitProps(props, [
    'options',
    'value',
    'onChange',
    'onInputChange',
    'placeholder',
    'loading',
    'noResultsMessage',
    'disabled',
    'name',
    'errorMessage',
    'containerClass',
    'debounce',
    'optionValue',
    'optionLabel',
    'optionDisabled',
    'itemComponent',
    'prefix',
  ])

  const isInvalid = () => !!local.errorMessage

  return (
    <div class="flex flex-col gap-0.5">
      <KobalteSearch<T>
        options={local.options}
        onInputChange={local.onInputChange}
        onChange={(val) => local.onChange?.(val ? getOptionValue(val) : null)}
        optionValue={local.optionValue as any ?? getOptionValue}
        optionTextValue={getOptionLabel}
        optionLabel={local.optionLabel as any ?? getOptionLabel}
        optionDisabled={local.optionDisabled as any ?? getOptionDisabled}
        placeholder={local.placeholder}
        validationState={isInvalid() ? 'invalid' : 'valid'}
        disabled={local.disabled}
        name={local.name}
        debounceOptionsMillisecond={local.debounce}
        triggerMode="input"
        itemComponent={(itemProps) => (
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
            {(state) => local.itemComponent ? (
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
                <KobalteSearch.ItemIndicator>
                  <CheckIcon class="text-primary-500" />
                </KobalteSearch.ItemIndicator>
              </>
            )}
          </KobalteSearch.Item>
        )}
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
              : 'border-border focus-within:ring-ring'
          )}
        >
          <KobalteSearch.Icon class="text-text-muted shrink-0">
            {local.prefix ?? <SearchIcon />}
          </KobalteSearch.Icon>
          <KobalteSearch.Input
            class={cn(
              'flex-1 h-full text-sm bg-transparent',
              'text-text placeholder:text-text-muted',
              'focus:outline-none',
              'disabled:cursor-not-allowed'
            )}
          />
          <KobalteSearch.Indicator class="text-text-muted shrink-0">
            <Show when={local.loading}>
              <SpinnerIcon />
            </Show>
          </KobalteSearch.Indicator>
        </KobalteSearch.Control>

        <KobalteSearch.Portal>
          <KobalteSearch.Content
            class={cn(
              'z-50 min-w-[8rem] overflow-hidden rounded-lg',
              'bg-surface-raised text-text border border-border shadow-lg',
              'animate-slide-down'
            )}
          >
            <KobalteSearch.Listbox class="p-1 max-h-60 overflow-auto" />
            <Show when={local.options.length === 0 && !local.loading}>
              <KobalteSearch.NoResult class="px-3 py-6 text-sm text-text-secondary text-center">
                {local.noResultsMessage ?? 'No results found'}
              </KobalteSearch.NoResult>
            </Show>
          </KobalteSearch.Content>
        </KobalteSearch.Portal>
      </KobalteSearch>

      <Show when={local.errorMessage}>
        <span class="text-xs text-danger-500">
          {local.errorMessage}
        </span>
      </Show>
    </div>
  )
}
