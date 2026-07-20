# @elz-ui/tooltip

Accessible tooltip for Elz UI.

Built on Radix Tooltip. Wrap interactive content with a provider; customize with `className` or `style`.

## Install

```bash
npm i @elz-ui/tooltip @elz-ui/core
```

`@elz-ui/core` is a peer dependency (theme tokens and `cn`). Import `@elz-ui/core/styles.css` for theme variables.

## Setup

```tsx
import { ElzProvider } from "@elz-ui/core";
import { TooltipProvider } from "@elz-ui/tooltip";
import "@elz-ui/core/styles.css";

export function App({ children }: { children: React.ReactNode }) {
  return (
    <ElzProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </ElzProvider>
  );
}
```

## Usage

```tsx
import { Tooltip, TooltipTrigger, TooltipContent } from "@elz-ui/tooltip";

<Tooltip>
  <TooltipTrigger>Hover</TooltipTrigger>
  <TooltipContent>Short hint text</TooltipContent>
</Tooltip>
```

## Exports

| Export | Description |
|--------|-------------|
| `TooltipProvider` | Required context for delay and shared tooltip behavior |
| `Tooltip` | Root open-state controller |
| `TooltipTrigger` | Element that shows the tooltip on hover / focus |
| `TooltipContent` | Tooltip label panel (includes arrow) |

## License

MIT
