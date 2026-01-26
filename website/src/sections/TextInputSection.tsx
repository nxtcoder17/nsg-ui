import { Component, createSignal } from 'solid-js'
import { TextInput } from 'nsg-ui'
import { DemoCard } from '../components/DemoCard'

export function TextInputIcon(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 10h4M7 14h8" />
    </svg>
  )
}

// Simple icons for demos
const MailIcon = () => (
  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
)

const SearchIcon = () => (
  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
)

const LockIcon = () => (
  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
)

export const TextInputSection: Component = () => {
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [search, setSearch] = createSignal('')
  const [bio, setBio] = createSignal('')
  const [username, setUsername] = createSignal('')

  const isEmailValid = () => !email() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email())

  return (
    <section id="text-input" class="scroll-mt-24 mb-20">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <TextInputIcon class="w-4 h-4 text-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text">TextInput</h2>
        </div>
        <p class="text-text-secondary ml-11">A text input field for single-line or multiline text entry.</p>
      </div>

      <div class="grid gap-6">
        <DemoCard title="Basic" description="Simple text input with label">
          <div class="max-w-sm space-y-4">
            <TextInput
              value={email()}
              onChange={setEmail}
              label="Email"
              placeholder="you@example.com"
              type="email"
            />
            <div class="text-sm text-text-secondary">
              Value: <span class="font-mono text-primary-500">{email() || '(empty)'}</span>
            </div>
          </div>
        </DemoCard>

        <DemoCard title="With Description" description="Help text below the input">
          <div class="max-w-sm">
            <TextInput
              value={password()}
              onChange={setPassword}
              label="Password"
              type="password"
              placeholder="Enter password"
              description="Must be at least 8 characters"
              required
            />
          </div>
        </DemoCard>

        <DemoCard title="With Prefix & Suffix" description="Icons or text before/after the input">
          <div class="max-w-sm space-y-4">
            <TextInput
              value={search()}
              onChange={setSearch}
              placeholder="Search..."
              prefix={<SearchIcon />}
            />
            <TextInput
              label="Email"
              placeholder="you@example.com"
              prefix={<MailIcon />}
            />
            <TextInput
              label="Website"
              placeholder="example.com"
              prefix={<span class="text-sm">https://</span>}
            />
            <TextInput
              label="Price"
              placeholder="0.00"
              prefix={<span class="text-sm">$</span>}
              suffix={<span class="text-sm">USD</span>}
            />
          </div>
        </DemoCard>

        <DemoCard title="Multiline (Textarea)" description="For longer text input">
          <div class="max-w-md space-y-4">
            <TextInput
              value={bio()}
              onChange={setBio}
              label="Bio"
              placeholder="Tell us about yourself..."
              description="Max 500 characters"
              multiline
              rows={4}
            />
            <TextInput
              label="Auto-resize"
              placeholder="This textarea grows as you type..."
              multiline
              autoResize
            />
          </div>
        </DemoCard>

        <DemoCard title="Validation" description="Error state with message">
          <div class="max-w-sm space-y-4">
            <TextInput
              value={email()}
              onChange={setEmail}
              label="Email"
              placeholder="you@example.com"
              type="email"
              errorMessage={email() && !isEmailValid() ? 'Please enter a valid email address' : undefined}
            />
            <TextInput
              value={username()}
              onChange={setUsername}
              label="Username"
              placeholder="johndoe"
              errorMessage={username() && username().length < 3 ? 'Username must be at least 3 characters' : undefined}
              description="Letters and numbers only"
            />
          </div>
        </DemoCard>

        <DemoCard title="States" description="Disabled and readonly">
          <div class="max-w-sm space-y-4">
            <TextInput
              label="Disabled"
              placeholder="Can't edit this"
              disabled
            />
            <TextInput
              label="Disabled with value"
              value="This is disabled"
              disabled
            />
            <TextInput
              label="Read only"
              value="Read only value"
              readOnly
            />
          </div>
        </DemoCard>
      </div>
    </section>
  )
}
