import { Component, createSignal } from 'solid-js'
import { ComboBox } from 'nsg-ui'
import { SearchIcon } from 'nsg-ui/icons'
import { DemoCard } from '../components/DemoCard'

export function ComboBoxIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7 8h10M7 12h6" />
      <path d="M15 15l3 3" stroke-width="2" />
    </svg>
  )
}

// Mock data
const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']

const allFruits = [
  'Apple', 'Apricot', 'Avocado', 'Banana', 'Blackberry', 'Blueberry',
  'Cherry', 'Coconut', 'Cranberry', 'Date', 'Dragon Fruit', 'Elderberry',
  'Fig', 'Grape', 'Grapefruit', 'Guava', 'Honeydew', 'Kiwi', 'Lemon',
  'Lime', 'Lychee', 'Mango', 'Melon', 'Nectarine', 'Orange', 'Papaya',
  'Passion Fruit', 'Peach', 'Pear', 'Pineapple', 'Plum', 'Pomegranate',
  'Raspberry', 'Strawberry', 'Tangerine', 'Watermelon'
]

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
]

const frameworks = [
  { value: 'solid', label: 'SolidJS' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular' },
  { value: 'qwik', label: 'Qwik', disabled: true },
]

const users = [
  { value: '1', label: 'Alice Johnson', email: 'alice@example.com' },
  { value: '2', label: 'Bob Smith', email: 'bob@example.com' },
  { value: '3', label: 'Carol Williams', email: 'carol@example.com' },
  { value: '4', label: 'David Brown', email: 'david@example.com' },
  { value: '5', label: 'Eve Davis', email: 'eve@example.com' },
]

export const ComboBoxSection: Component = () => {
  // String options
  const [fruit, setFruit] = createSignal('')
  // Object options
  const [country, setCountry] = createSignal('')
  // Multiple selection
  const [selectedFrameworks, setSelectedFrameworks] = createSignal<string[]>([])

  // Client-side filtering (search-style)
  const [query, setQuery] = createSignal('')
  const [filteredFruits, setFilteredFruits] = createSignal<string[]>([])
  const [selectedFruit, setSelectedFruit] = createSignal('')

  // Object filtering with custom render
  const [filteredUsers, setFilteredUsers] = createSignal(users)
  const [selectedUser, setSelectedUser] = createSignal('')

  // Async loading
  const [asyncResults, setAsyncResults] = createSignal<string[]>([])
  const [loading, setLoading] = createSignal(false)

  // Footer content
  const [tags, setTags] = createSignal<string[]>(['bug', 'feature'])
  const [filteredTags, setFilteredTags] = createSignal<string[]>([])
  const [selectedTag, setSelectedTag] = createSignal('')

  const handleFruitSearch = (value: string) => {
    setQuery(value)
    if (!value.trim()) {
      setFilteredFruits([])
      return
    }
    setFilteredFruits(
      allFruits.filter(f => f.toLowerCase().includes(value.toLowerCase()))
    )
  }

  const handleUserSearch = (value: string) => {
    if (!value.trim()) {
      setFilteredUsers(users)
      return
    }
    setFilteredUsers(
      users.filter(u =>
        u.label.toLowerCase().includes(value.toLowerCase()) ||
        u.email.toLowerCase().includes(value.toLowerCase())
      )
    )
  }

  const handleAsyncSearch = (value: string) => {
    if (!value.trim()) {
      setAsyncResults([])
      return
    }
    setLoading(true)
    setTimeout(() => {
      setAsyncResults(
        allFruits.filter(f => f.toLowerCase().includes(value.toLowerCase())).slice(0, 5)
      )
      setLoading(false)
    }, 500)
  }

  const handleTagSearch = (value: string) => {
    if (!value.trim()) {
      setFilteredTags(tags())
      return
    }
    setFilteredTags(tags().filter(t => t.toLowerCase().includes(value.toLowerCase())))
  }

  const addTag = (name: string) => {
    if (name && !tags().includes(name)) {
      setTags([...tags(), name])
      setFilteredTags([...tags()])
      setSelectedTag(name)
    }
  }

  return (
    <section id="combobox" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <ComboBoxIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">ComboBox</h2>
        </div>
        <p class="text-text-secondary ml-11">Searchable dropdown with filtering, multi-select, and extensible content.</p>
      </div>

      <div class="grid gap-6">
        {/* Basic string options */}
        <DemoCard title="String Options" description="Simple array of strings">
          <div class="flex items-start gap-8">
            <div class="w-64">
              <ComboBox
                options={fruits}
                value={fruit()}
                onChange={setFruit}
                placeholder="Select a fruit..."
              />
            </div>
            <div class="text-sm text-text-secondary">
              Selected: <span class="font-mono text-primary-500">{fruit() || 'none'}</span>
            </div>
          </div>
        </DemoCard>

        {/* Object options */}
        <DemoCard title="Object Options" description="Array of objects with value/label">
          <div class="flex items-start gap-8">
            <div class="w-64">
              <ComboBox
                options={countries}
                value={country()}
                onChange={setCountry}
                placeholder="Select a country..."
              />
            </div>
            <div class="text-sm text-text-secondary">
              Selected: <span class="font-mono text-primary-500">{country() || 'none'}</span>
            </div>
          </div>
        </DemoCard>

        {/* Multiple selection */}
        <DemoCard title="Multiple Selection" description="Select multiple items with tags">
          <div class="flex items-start gap-8">
            <div class="w-80">
              <ComboBox
                multiple
                options={frameworks}
                value={selectedFrameworks()}
                onChange={setSelectedFrameworks}
                placeholder="Select frameworks..."
                noResultComponent={(inputValue) => (
                  <button
                    type="button"
                    class="w-full text-left text-sm text-primary-600 hover:text-primary-700 px-1 py-1 rounded hover:bg-primary-50"
                    onClick={() => setSelectedFrameworks([...selectedFrameworks(), inputValue])}
                  >
                    + Add "{inputValue}"
                  </button>
                )}
              />
            </div>
            <div class="text-sm text-text-secondary">
              Selected: <span class="font-mono text-primary-500">{selectedFrameworks().join(', ') || 'none'}</span>
            </div>
          </div>
        </DemoCard>

        {/* Client-side filtering with prefix icon */}
        <DemoCard title="Filtering with Prefix" description="Type to filter with a search icon prefix">
          <div class="max-w-sm space-y-4">
            <ComboBox
              options={filteredFruits()}
              value={selectedFruit()}
              onChange={setSelectedFruit}
              onInputChange={handleFruitSearch}
              placeholder="Search fruits..."
              noResultsMessage="No fruits found"
              prefix={<SearchIcon />}
            />
            <div class="text-sm text-text-secondary">
              Query: <span class="font-mono text-primary-500">{query() || '(empty)'}</span>
              <br />
              Selected: <span class="font-mono text-primary-500">{selectedFruit() || 'none'}</span>
            </div>
          </div>
        </DemoCard>

        {/* Custom item rendering */}
        <DemoCard title="Custom Item Rendering" description="Search with complex data and custom rendering">
          <div class="max-w-sm space-y-4">
            <ComboBox
              options={filteredUsers()}
              value={selectedUser()}
              onChange={setSelectedUser}
              onInputChange={handleUserSearch}
              placeholder="Search users..."
              prefix={<SearchIcon />}
              itemComponent={(user, state) => (
                <div class="flex flex-col">
                  <span class={state.highlighted ? 'text-primary-900' : 'text-text'}>
                    {user.label}
                  </span>
                  <span class={`text-xs ${state.highlighted ? 'text-primary-700' : 'text-text-secondary'}`}>
                    {user.email}
                  </span>
                </div>
              )}
            />
            <div class="text-sm text-text-secondary">
              Selected ID: <span class="font-mono text-primary-500">{selectedUser() || 'none'}</span>
            </div>
          </div>
        </DemoCard>

        {/* Async loading */}
        <DemoCard title="Async Loading" description="Shows loading state during search">
          <div class="max-w-sm space-y-4">
            <ComboBox
              options={asyncResults()}
              value=""
              onChange={() => {}}
              onInputChange={handleAsyncSearch}
              placeholder="Search with delay..."
              loading={loading()}
              debounce={300}
              prefix={<SearchIcon />}
              noResultsMessage="No results"
            />
            <p class="text-xs text-text-secondary">
              Simulates a 500ms API delay. Try typing "apple" or "berry".
            </p>
          </div>
        </DemoCard>

        {/* Footer content */}
        <DemoCard title="Footer Content" description="Add new items via footer action">
          <div class="max-w-sm space-y-4">
            <ComboBox
              options={filteredTags()}
              value={selectedTag()}
              onChange={setSelectedTag}
              onInputChange={handleTagSearch}
              placeholder="Search or add tags..."
              noResultsMessage="No matching tags"
              prefix={<SearchIcon />}
              noResultComponent={(inputValue) => (
                <button
                  type="button"
                  class="w-full text-left text-sm text-primary-600 hover:text-primary-700 px-1 py-1 rounded hover:bg-primary-50"
                  onClick={() => addTag(inputValue)}
                >
                  + Add "{inputValue}"
                </button>
              )}
            />
            <div class="text-sm text-text-secondary">
              All tags: <span class="font-mono text-primary-500">{tags().join(', ')}</span>
            </div>
          </div>
        </DemoCard>

        {/* Validation */}
        <DemoCard title="Validation" description="Error state with message">
          <div class="max-w-sm">
            <ComboBox
              options={[] as string[]}
              value=""
              onChange={() => {}}
              placeholder="Search..."
              errorMessage="Please select a valid option"
            />
          </div>
        </DemoCard>

        {/* Disabled */}
        <DemoCard title="Disabled" description="Disabled combobox state">
          <div class="w-64">
            <ComboBox
              options={fruits}
              value=""
              onChange={() => {}}
              placeholder="Cannot interact..."
              disabled
            />
          </div>
        </DemoCard>
      </div>
    </section>
  )
}
