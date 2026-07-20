# @elz-ui/popover

Accessible popover for Elz UI.

Built on Radix Popover. Floating panel anchored to a trigger; customize with `className` or `style`.

## Install

```bash
npm i @elz-ui/popover @elz-ui/core
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
import { Popover, PopoverTrigger, PopoverContent } from "@elz-ui/popover";

<Popover>
  <PopoverTrigger>Info</PopoverTrigger>
  <PopoverContent>
    Extra details shown in a floating panel.
  </PopoverContent>
</Popover>
```

Use `PopoverAnchor` when the positioning reference should differ from the trigger. Controlled (`open` / `onOpenChange`) is supported on `Popover` via Radix Root props.

## Exports

| Export | Description |
|--------|-------------|
| `Popover` | Root open-state controller |
| `PopoverTrigger` | Element that toggles the popover |
| `PopoverContent` | Floating panel content |
| `PopoverAnchor` | Optional positioning anchor |

## License

MIT
