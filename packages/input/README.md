# @elz-ui/input

An enterprise-ready, accessible, and customizable React Input component for Elz UI.

## Features

- **Full Native Support:** Supports every native HTML input type (text, password, email, etc.).
- **Accessible:** Built-in WAI-ARIA support, keyboard navigation, and screen reader compatibility.
- **Tree Shakeable & Zero Runtime Dependencies:** Extremely lightweight and modular.
- **Compound Components:** Clean `Input`, `Input.Label`, `Input.Helper`, and `Input.Error` API.
- **Variants & Sizes:** 6 visual variants, 5 sizes, 6 radius options.
- **Rich States:** Disabled, Readonly, Loading, Error, Success, Warning states perfectly styled.
- **Advanced Features:** Password visibility toggle, copy button, clear button, character counter, floating labels, prefixes, suffixes, and debounced value updates.

## Installation

```bash
pnpm add @elz-ui/input @elz-ui/core
```

## Usage

### Basic Usage

```tsx
import { Input } from "@elz-ui/input";

export default function App() {
  return (
    <Input 
      label="Email Address" 
      placeholder="john@example.com" 
      helperText="We'll never share your email." 
    />
  );
}
```

### Advanced Features

```tsx
import { Input } from "@elz-ui/input";
import { Mail } from "lucide-react";

export default function AdvancedInput() {
  return (
    <Input
      label="Password"
      type="password"
      showPasswordToggle
      clearable
      leftIcon={<Mail className="w-4 h-4" />}
      prefix="$"
      suffix=".00"
      maxLength={20}
      characterCounter
      variant="filled"
      radius="full"
      color="primary"
    />
  );
}
```

### Compound Components API

For maximum flexibility, you can use the compound component structure:

```tsx
import Input from "@elz-ui/input";

export default function CustomInput() {
  return (
    <Input label="Username">
      <Input.Label className="text-blue-500">Username</Input.Label>
      <Input.Prefix>@</Input.Prefix>
      {/* Underlying input handles its own rendering */}
      <Input.Helper>Must be unique</Input.Helper>
      <Input.Error>Username is already taken</Input.Error>
    </Input>
  );
}
```
*(Note: The main `Input` component renders the HTML input automatically and composes these sub-components when passed via standard props like `label`, `prefix`, `error`, etc. The compound exports allow for extended layout flexibility.)*

## Props Table

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | - | Label for the input. |
| `helperText` | `ReactNode` | - | Helper text below the input. |
| `error` | `ReactNode` | - | Error text (sets `aria-invalid`). |
| `success` | `ReactNode` | - | Success text. |
| `warning` | `ReactNode` | - | Warning text. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | The size of the input. |
| `variant` | `"filled" \| "outlined" \| "ghost" \| "soft" \| "underlined" \| "flat"` | `"outlined"` | Visual style variant. |
| `radius` | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | Border radius. |
| `color` | `"primary" \| "secondary" \| "success" \| "warning" \| "danger" \| "info"` | `"primary"` | Color theme. |
| `clearable` | `boolean` | `false` | Shows a clear button when input has value. |
| `copyable` | `boolean` | `false` | Shows a copy to clipboard button. |
| `showPasswordToggle` | `boolean` | `false` | Shows an eye icon to toggle password visibility. |
| `characterCounter` | `boolean` | `false` | Shows a counter when `maxLength` is set. |
| `debounce` | `number` | `0` | Delay in ms for `onDebouncedValueChange`. |
| `onValueChange` | `(value: string) => void` | `-` | Fires immediately when the value changes. |
| `onDebouncedValueChange` | `(value: string) => void` | `-` | Fires when the value changes, after `debounce` ms. |

*Accepts all standard `React.InputHTMLAttributes<HTMLInputElement>`.*

## Theming & Customization

The component relies on Tailwind CSS classes dynamically merged via `@elz-ui/core`. To customize styling, pass Tailwind classes to the `className` or `containerClassName` props.

## Accessibility

Built to WCAG AA standards.
- Automatic `id` generation and `htmlFor` mapping.
- Automatic `aria-describedby` linking to error and helper texts.
- Proper focus rings and keyboard interaction.
- `aria-invalid` automatically applied when `error` is present.
