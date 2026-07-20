# @elz-ui/tabs

Accessible tabs for Elz UI.

Built on Radix Tabs. Switch between panels with keyboard support; customize with `className` or `style`.

## Install

```bash
npm i @elz-ui/tabs @elz-ui/core
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@elz-ui/tabs";

<Tabs defaultValue="a">
  <TabsList>
    <TabsTrigger value="a">One</TabsTrigger>
    <TabsTrigger value="b">Two</TabsTrigger>
  </TabsList>
  <TabsContent value="a">Panel A</TabsContent>
  <TabsContent value="b">Panel B</TabsContent>
</Tabs>
```

Controlled (`value` / `onValueChange`) is supported on `Tabs` via Radix Root props.

## Exports

| Export | Description |
|--------|-------------|
| `Tabs` | Root value controller |
| `TabsList` | Tab trigger container |
| `TabsTrigger` | Selects a tab panel |
| `TabsContent` | Panel shown when its value is active |

## License

MIT
