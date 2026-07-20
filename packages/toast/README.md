# @elz-ui/toast

Toast notifications for Elz UI.

Built on Radix Toast. Show brief feedback via hook or imperative helper; customize with `className` or `style` on the viewport.

## Install

```bash
npm i @elz-ui/toast @elz-ui/core
```

`@elz-ui/core` is a peer dependency (theme tokens and `cn`). Import `@elz-ui/core/styles.css` for theme variables.

## Setup

```tsx
import { ElzProvider } from "@elz-ui/core";
import { ToastProvider } from "@elz-ui/toast";
import "@elz-ui/core/styles.css";

export function App({ children }: { children: React.ReactNode }) {
  return (
    <ElzProvider>
      <ToastProvider position="bottom-right">{children}</ToastProvider>
    </ElzProvider>
  );
}
```

`ToastProvider` renders a `Toaster` viewport for you.

## Usage

### Hook

```tsx
import { useToast } from "@elz-ui/toast";

function SaveButton() {
  const { toast } = useToast();

  return (
    <button onClick={() => toast({ title: "Saved", description: "Your changes are live." })}>
      Save
    </button>
  );
}
```

### Imperative

Works from outside React (dispatches a `CustomEvent`). Still requires a mounted `ToastProvider` (or standalone `Toaster`) to display:

```tsx
import { toast } from "@elz-ui/toast";

toast({ title: "Copied", duration: 2000 });
```

### Provider props

| Prop | Default | Description |
|------|---------|-------------|
| `position` | `"bottom-right"` | `"top-left" \| "top-right" \| "top-center" \| "bottom-left" \| "bottom-right" \| "bottom-center"` |
| `duration` | `4000` | Default auto-dismiss ms for new toasts |

## Exports

| Export | Description |
|--------|-------------|
| `ToastProvider` | Context + Radix provider + built-in `Toaster` |
| `useToast` | Hook returning `{ toast, dismiss, toasts, position }` |
| `toast` | Imperative helper (window `CustomEvent`) |
| `Toaster` | Viewport that renders active toasts |

## License

MIT
