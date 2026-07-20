# Elz UI

Accessible React component library. Install packages individually under the `@elz-ui` scope.

## Packages

| Package | Description |
|---------|-------------|
| `@elz-ui/core` | Shared utilities, provider, CSS variables |
| `@elz-ui/drawer` | Slide-over drawer / sheet |
| `@elz-ui/dialog` | Modal dialog |
| `@elz-ui/popover` | Floating popover |
| `@elz-ui/tooltip` | Tooltip |
| `@elz-ui/toast` | Toast notifications |
| `@elz-ui/menu` | Dropdown menu |
| `@elz-ui/tabs` | Tabs |
| `@elz-ui/accordion` | Accordion |
| `@elz-ui/form` | Form field primitives |
| `@elz-ui/input` | Accessible input fields with variants and validation |
| `@elz-ui/button` | Interactive button component with variants and states |

## Install (consumers)

```bash
npm i @elz-ui/core @elz-ui/button @elz-ui/toast
# add other packages as needed
```

### Required setup

1. Import styles once (e.g. in your global CSS or root layout):

```css
@import "@elz-ui/core/styles.css";
```

2. Wrap your app with `ElzProvider`. For overlays, also wrap `ToastProvider` and `TooltipProvider` where needed:

```tsx
"use client";

import { ElzProvider } from "@elz-ui/core";
import { ToastProvider } from "@elz-ui/toast";
import { TooltipProvider } from "@elz-ui/tooltip";
import "@elz-ui/core/styles.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ElzProvider className="min-h-full">
      <ToastProvider position="top-right">
        <TooltipProvider>{children}</TooltipProvider>
      </ToastProvider>
    </ElzProvider>
  );
}
```

3. Theme by overriding CSS variables (`--elz-accent`, `--elz-success`, `--elz-danger`, etc.) on `:root` or `.elz-root`.

### Styling: `className` first, then `style`

Defaults live in `@elz-ui/core/styles.css` (`[data-slot]` / `.elz-*`). Prefer **`className`** for Tailwind or Bootstrap overrides. Use **`style`** for one-off CSS objects.

```tsx
<DrawerContent className="w-[32rem] p-6" />
<MenuContent style={{ minWidth: 280 }} />
```

When both are set, `className` is the primary customization path; `style` still applies as the consumer’s CSS object (inline) for targeted overrides.

### Toast variants

```tsx
const { toast } = useToast();
toast({ title: "Saved", variant: "success" });
toast.success("Saved");
toast.error("Failed");
toast.warn("Check this");
toast.info("Heads up");
```

## Development

```bash
pnpm install
pnpm build
pnpm test
pnpm dev   # playground
```

## License

MIT
