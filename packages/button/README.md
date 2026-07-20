# @elz-ui/button

Accessible and customizable button component for Elz UI.

Style via variants, sizes, colors, and radius. Override further with `className` or `style`.

## Install

```bash
npm i @elz-ui/button @elz-ui/core
```

`@elz-ui/core` is a peer dependency (theme tokens and `cn`). Import `@elz-ui/core/styles.css` for theme variables.

## Setup

```tsx
import { ElzProvider } from "@elz-ui/core";
import "@elz-ui/core/styles.css";

export function App({ children }: { children: React.ReactNode }) {
  return <ElzProvider>{children}</ElzProvider>;
}
```

## Usage

```tsx
import { Button } from "@elz-ui/button";

<Button variant="solid" color="primary" size="md">
  Save
</Button>

<Button variant="outlined" color="danger" isLoading>
  Deleting…
</Button>

<Button size="icon" leftIcon={<SearchIcon />} aria-label="Search" />
```

## Exports

| Export | Description |
|--------|-------------|
| `Button` | Interactive button element |
| `buttonVariants` | Class factory for custom button-like elements |

### Key props

| Prop | Default | Description |
|------|---------|-------------|
| `variant` | `"solid"` | `"solid" \| "outlined" \| "ghost" \| "soft" \| "link"` |
| `size` | `"md"` | `"sm" \| "md" \| "lg" \| "icon"` |
| `color` | `"default"` | `"primary" \| "secondary" \| "success" \| "warning" \| "danger" \| "default"` |
| `radius` | `"md"` | `"none" \| "sm" \| "md" \| "lg" \| "full"` |
| `fullWidth` | `false` | Stretch to container width |
| `isLoading` | `false` | Shows a spinner and disables the button |
| `leftIcon` / `rightIcon` | — | Icons before / after the label |
| `className` / `style` | — | Extra visual styling |

Accepts standard `React.ButtonHTMLAttributes<HTMLButtonElement>`.

## License

MIT
