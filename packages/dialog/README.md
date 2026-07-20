# @elz-ui/dialog

Accessible modal dialog for Elz UI.

Built on Radix Dialog. Defaults come from `@elz-ui/core/styles.css`. Prefer **`className`** (Tailwind/Bootstrap); use **`style`** for one-off CSS.

## Install

```bash
npm i @elz-ui/dialog @elz-ui/core
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
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@elz-ui/dialog";

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose>Cancel</DialogClose>
      <DialogClose>Continue</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

Controlled (`open` / `onOpenChange`) is supported on `Dialog` via Radix Root props.

## Exports

| Export | Description |
|--------|-------------|
| `Dialog` | Root open-state controller |
| `DialogTrigger` | Element that opens the dialog |
| `DialogPortal` | Portal container |
| `DialogOverlay` | Dimmed backdrop |
| `DialogContent` | Modal panel (includes portal + overlay) |
| `DialogHeader` | Title / description layout region |
| `DialogFooter` | Actions layout region |
| `DialogTitle` | Accessible dialog title |
| `DialogDescription` | Accessible dialog description |
| `DialogClose` | Closes the dialog |

## License

MIT
