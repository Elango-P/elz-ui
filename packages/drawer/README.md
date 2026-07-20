# @elz-ui/drawer

Accessible slide-over drawer for Elz UI.

Built on Radix Dialog. Panel can enter from any side.

Defaults come from `@elz-ui/core/styles.css`. Prefer **`className`** (Tailwind/Bootstrap) for theming; use **`style`** for one-off CSS objects.

```tsx
<DrawerContent side="right" className="w-[32rem] p-6">
  …
</DrawerContent>
```

## Install

```bash
npm i @elz-ui/drawer @elz-ui/core
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
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@elz-ui/drawer";

<Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent side="right">
    <DrawerHeader>
      <DrawerTitle>Panel</DrawerTitle>
      <DrawerDescription>Additional details and actions.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose>Close</DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

### Side

| Prop | Default | Description |
|------|---------|-------------|
| `side` | `"right"` | `"top" \| "right" \| "bottom" \| "left"` on `DrawerContent` |

Controlled (`open` / `onOpenChange`) is supported on `Drawer` via Radix Root props.

## Exports

| Export | Description |
|--------|-------------|
| `Drawer` | Root open-state controller |
| `DrawerTrigger` | Element that opens the drawer |
| `DrawerClose` | Closes the drawer |
| `DrawerPortal` | Portal container |
| `DrawerOverlay` | Dimmed backdrop |
| `DrawerContent` | Slide-over panel (includes portal + overlay) |
| `DrawerHeader` | Title / description layout region |
| `DrawerFooter` | Actions layout region |
| `DrawerTitle` | Accessible drawer title |
| `DrawerDescription` | Accessible drawer description |

## License

MIT
