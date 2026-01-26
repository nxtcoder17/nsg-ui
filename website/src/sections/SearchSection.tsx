import { Component, createSignal } from 'solid-js'
import { Search } from 'nsg-ui'
import { DemoCard } from '../components/DemoCard'

export function SearchSectionIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  )
}

// Mock data
const allFruits = [
  'Apple', 'Apricot', 'Avocado', 'Banana', 'Blackberry', 'Blueberry',
  'Cherry', 'Coconut', 'Cranberry', 'Date', 'Dragon Fruit', 'Elderberry',
  'Fig', 'Grape', 'Grapefruit', 'Guava', 'Honeydew', 'Kiwi', 'Lemon',
  'Lime', 'Lychee', 'Mango', 'Melon', 'Nectarine', 'Orange', 'Papaya',
  'Passion Fruit', 'Peach', 'Pear', 'Pineapple', 'Plum', 'Pomegranate',
  'Raspberry', 'Strawberry', 'Tangerine', 'Watermelon'
]

const users = [
  { value: '1', label: 'Alice Johnson', email: 'alice@example.com' },
  { value: '2', label: 'Bob Smith', email: 'bob@example.com' },
  { value: '3', label: 'Carol Williams', email: 'carol@example.com' },
  { value: '4', label: 'David Brown', email: 'david@example.com' },
  { value: '5', label: 'Eve Davis', email: 'eve@example.com' },
]

export const SearchSection: Component = () => {
  const [query, setQuery] = createSignal('')
  const [filteredFruits, setFilteredFruits] = createSignal<string[]>([])
  const [selectedFruit, setSelectedFruit] = createSignal<string | null>(null)

  const [userQuery, setUserQuery] = createSignal('')
  const [filteredUsers, setFilteredUsers] = createSignal(users)
  const [selectedUser, setSelectedUser] = createSignal<string | null>(null)

  const [asyncQuery, setAsyncQuery] = createSignal('')
  const [asyncResults, setAsyncResults] = createSignal<string[]>([])
  const [loading, setLoading] = createSignal(false)

  // Client-side filtering
  const handleFruitSearch = (value: string) => {
    setQuery(value)
    if (!value.trim()) {
      setFilteredFruits([])
      return
    }
    const filtered = allFruits.filter(fruit =>
      fruit.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredFruits(filtered)
  }

  // Object filtering
  const handleUserSearch = (value: string) => {
    setUserQuery(value)
    if (!value.trim()) {
      setFilteredUsers(users)
      return
    }
    const filtered = users.filter(user =>
      user.label.toLowerCase().includes(value.toLowerCase()) ||
      user.email.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredUsers(filtered)
  }

  // Simulated async search
  const handleAsyncSearch = (value: string) => {
    setAsyncQuery(value)
    if (!value.trim()) {
      setAsyncResults([])
      return
    }
    setLoading(true)
    // Simulate API delay
    setTimeout(() => {
      const filtered = allFruits.filter(fruit =>
        fruit.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5)
      setAsyncResults(filtered)
      setLoading(false)
    }, 500)
  }

  return (
    <section id="search" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <SearchSectionIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">Search</h2>
        </div>
        <p class="text-text-secondary ml-11">Searchable dropdown with external filtering control.</p>
      </div>

      <div class="grid gap-6">
        <DemoCard title="Basic" description="Type to filter options">
          <div class="max-w-sm space-y-4">
            <Search
              options={filteredFruits()}
              value={selectedFruit()}
              onChange={setSelectedFruit}
              onInputChange={handleFruitSearch}
              placeholder="Search fruits..."
              noResultsMessage="No fruits found"
            />
            <div class="text-sm text-text-secondary">
              Query: <span class="font-mono text-primary-500">{query() || '(empty)'}</span>
              <br />
              Selected: <span class="font-mono text-primary-500">{selectedFruit() ?? 'none'}</span>
            </div>
          </div>
        </DemoCard>

        <DemoCard title="Object Options" description="Search with complex data and custom rendering">
          <div class="max-w-sm space-y-4">
            <Search
              options={filteredUsers()}
              value={selectedUser()}
              onChange={setSelectedUser}
              onInputChange={handleUserSearch}
              placeholder="Search users..."
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
              Selected ID: <span class="font-mono text-primary-500">{selectedUser() ?? 'none'}</span>
            </div>
          </div>
        </DemoCard>

        <DemoCard title="Async Loading" description="Shows loading state during search">
          <div class="max-w-sm space-y-4">
            <Search
              options={asyncResults()}
              value={null}
              onChange={() => {}}
              onInputChange={handleAsyncSearch}
              placeholder="Search with delay..."
              loading={loading()}
              debounce={300}
            />
            <p class="text-xs text-text-secondary">
              Simulates a 500ms API delay. Try typing "apple" or "berry".
            </p>
          </div>
        </DemoCard>

        <DemoCard title="Validation" description="Error state with message">
          <div class="max-w-sm">
            <Search
              options={[]}
              value={null}
              onChange={() => {}}
              placeholder="Search..."
              errorMessage="Please select a valid option"
            />
          </div>
        </DemoCard>
      </div>
    </section>
  )
}
