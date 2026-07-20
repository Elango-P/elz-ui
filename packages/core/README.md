# @elz-ui/core

Shared utilities and theming for Elz UI.

Provides the root provider, CSS variables, class-name helpers, and hooks used by every `@elz-ui` package.

## Install

```bash
npm i @elz-ui/core
```

## Setup

Wrap your app with `ElzProvider` and import the theme stylesheet:

```tsx
import { ElzProvider } from "@elz-ui/core";
import "@elz-ui/core/styles.css";

export function App({ children }: { children: React.ReactNode }) {
  return <ElzProvider>{children}</ElzProvider>;
}
```

`ElzProvider` applies the `elz-root` scope so CSS variables (`--elz-*`) resolve correctly.

## Usage

```tsx
import { cn, useControllableState, createVariants } from "@elz-ui/core";

const box = createVariants({
  base: "rounded p-2",
  variants: {
    tone: { muted: "bg-gray-100", accent: "bg-blue-100" },
  },
  defaultVariants: { tone: "muted" },
});

function Example({ open, onOpenChange }: { open?: boolean; onOpenChange?: (v: boolean) => void }) {
  const [value, setValue] = useControllableState({
    prop: open,
    defaultProp: false,
    onChange: onOpenChange,
  });

  return (
    <button
      className={cn(box({ tone: "accent" }), value && "ring")}
      onClick={() => setValue(!value)}
    >
      Toggle
    </button>
  );
}
```

## Exports

| Export | Description |
|--------|-------------|
| `ElzProvider` | Root wrapper that applies Elz CSS variable scope |
| `cn` | Class-name merger (`clsx`-based) |
| `resolveSurfaceStyle` | className-first style resolver (skips defaults when classes are set) |
| `createVariants` | Variant class factory (cva-style) |
| `useControllableState` | Controlled / uncontrolled state helper |
| `useId` | Stable ID generator |
| `useMergedRefs` / `assignRef` | Merge multiple refs onto one element |
| `useEventCallback` | Stable callback that always sees latest props |
| `useDebounce` | Debounce a changing value |
| `PolymorphicProps` | Shared props type (`className`, `children`) |
| `Side` | `"top" \| "right" \| "bottom" \| "left"` |

### Styles

Import `@elz-ui/core/styles.css` for theme tokens, `[data-slot]` surface defaults, and shared motion.

Prefer **`className`** (Tailwind/Bootstrap) to restyle components; use **`style`** for one-off CSS objects.

## License

MIT
