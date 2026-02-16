# nsg-ui

A SolidJS component library built on [Kobalte](https://kobalte.dev) primitives with Tailwind CSS styling.

## Installation

```bash
bun add nsg-ui @kobalte/core solid-js
```

## Setup

### Tailwind CSS 4

In your main CSS file:

```css
@import 'tailwindcss';
@import 'nsg-ui/theme.css';
@source "node_modules/nsg-ui/dist/**/*.js";
```

That's it. The theme includes:
- All color scales (neutral, primary, danger, success, warning)
- Light mode colors in `@theme`
- Dark mode overrides in `.dark`
- Semantic tokens (surface, border, text, etc.)
- Animations and utilities

### Custom Colors

Override colors after importing the theme:

```css
@import 'tailwindcss';
@import 'nsg-ui/theme.css';

:root {
  --color-primary-500: oklch(55% 0.25 200);
}

.dark {
  --color-primary-500: oklch(65% 0.20 200);
}
```

## Usage

```tsx
import { Button, Dialog, Toast, toast } from 'nsg-ui';

function App() {
  return (
    <>
      <Button variant="default" onClick={() => toast.success({ title: 'Saved!' })}>
        Save
      </Button>

      <Dialog
        trigger={<Button variant="outline">Open Dialog</Button>}
        title="Confirm"
        description="Are you sure?"
      >
        <Button variant="danger">Delete</Button>
      </Dialog>
    </>
  );
}
```

## Components

| Component | Description |
|-----------|-------------|
| Accordion | Expandable content sections |
| Badge | Status indicators |
| Button | Actions with variants: default, outline, ghost, danger, link |
| Card | Content container |
| Checkbox | Boolean input with indeterminate state |
| ComboBox | Searchable select with single/multiple selection |
| CommandBar | Command palette with keyboard navigation |
| ContextMenu | Right-click menu |
| Dialog | Modal dialogs |
| DropdownMenu | Menus with submenus, checkboxes, radios |
| Image | Image with fallback |
| Link | Navigation links |
| NumberInput | Numeric input field |
| Popover | Floating content |
| Progress | Progress indicators |
| RadioGroup | Single selection from options |
| SegmentedControl | Toggle between options |
| Separator | Visual divider |
| Tabs | Tabbed content |
| Text | Themed text with color variants |
| TextInput | Text input field |
| Toast | Notifications (info, success, warning, danger) |
| ToggleButton | On/off toggle |

### Icons

```tsx
import { CheckIcon, ChevronRightIcon } from 'nsg-ui/icons';
```

## API Examples

### Button

```tsx
<Button variant="default" size="md" disabled={false}>
  Click me
</Button>
```

Variants: `default` | `outline` | `ghost` | `danger` | `link`
Sizes: `sm` | `md` | `lg` | `icon`

### Toast

```tsx
// Auto-injects toast region on first call
toast.info({ title: 'Message received' });
toast.success({ title: 'Saved!', description: 'Changes applied' });
toast.warning({ title: 'Session expiring' });
toast.danger({ title: 'Error', description: 'Failed to save' });

// Options
toast.success({
  title: 'Uploading...',
  description: 'Optional details',
  withCloseIcon: true,
  duration: 2000,
  persistent: false,
});
```

### ComboBox

```tsx
<ComboBox
  options={['Apple', 'Banana', 'Cherry']}
  value={fruit()}
  onChange={setFruit}
  placeholder="Select a fruit..."
/>

// Multiple selection
<ComboBox
  multiple
  options={frameworks}
  value={selected()}
  onChange={setSelected}
/>
```

### DropdownMenu

```tsx
<DropdownMenu trigger={<Button>Open</Button>}>
  <DropdownMenu.Group label="Actions">
    <DropdownMenu.ActionItem label="Edit" onSelect={() => {}} />
    <DropdownMenu.ActionItem label="Delete" variant="danger" onSelect={() => {}} />
  </DropdownMenu.Group>

  <DropdownMenu.Separator />

  <DropdownMenu.SingleSelect label="Theme" value={theme()} onChange={setTheme}>
    <DropdownMenu.Option value="light" label="Light" />
    <DropdownMenu.Option value="dark" label="Dark" />
  </DropdownMenu.SingleSelect>
</DropdownMenu>
```

## Development

```bash
# Build library
bun run build

# Watch mode
bun run dev

# Run demo website
cd website && bun dev
```

## License

MIT
