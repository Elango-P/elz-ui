# @elz-ui/accordion

Accessible custom accordion for Elz UI.

Unstyled chrome by default: white background, no card borders/fills. Comfortable padding is built in; override with `className` or `style` (Tailwind, Bootstrap, etc.).

## Install

```bash
npm i @elz-ui/accordion @elz-ui/core
```

`@elz-ui/core` is a peer dependency (theme tokens and `cn`). Import `@elz-ui/core/styles.css` for open/close animation.

## Setup

```tsx
import { ElzProvider } from "@elz-ui/core";
import "@elz-ui/core/styles.css";

export function App({ children }: { children: React.ReactNode }) {
  return <ElzProvider>{children}</ElzProvider>;
}
```

## Usage

By default each item opens and closes only when you click it. Padding is included; customize with props.

Map items when you have many sections:

```tsx
const items = [
  { value: "a", title: "What is Elz UI?", content: "A modular React component library under @elz-ui." },
  { value: "b", title: "How do I install?", content: "npm i @elz-ui/core @elz-ui/accordion" },
  { value: "c", title: "Is it accessible?", content: "Yes — keyboard and ARIA are built in." },
];

<Accordion>
  {items.map((item) => (
    <AccordionItem key={item.value} value={item.value}>
      <AccordionTrigger>{item.title}</AccordionTrigger>
      <AccordionContent>{item.content}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
```

### Autoclose

Opening one item closes the others. Works with `type="multiple"` as well — `autoclose` wins.

```tsx
<Accordion autoclose>
  {/* opening one item closes the others */}
</Accordion>

<Accordion type="multiple" autoclose>
  {/* same exclusive behavior */}
</Accordion>
```

## Exports

| Export | Description |
|--------|-------------|
| `Accordion` | Root container and open-state controller |
| `AccordionItem` | Single accordion section (default white background) |
| `AccordionTrigger` | Expand / collapse control |
| `AccordionContent` | Collapsible panel content |

### `AccordionItem` styling props

| Prop | Description |
|------|-------------|
| `className` / `style` | Styles the item container |
| `headerClassName` | Classes on the header trigger (Tailwind / Bootstrap) |
| `headerStyle` | Inline styles on the header trigger (`background`, `color`, …) |

`AccordionTrigger` `className` / `style` still work and override `header*` when both are set.

### Root props

| Prop | Default | Description |
|------|---------|-------------|
| `autoclose` | `false` | When `true`, opening one item closes the others (overrides `type="multiple"`) |
| `collapsible` | `true` | When exclusive, allow closing the open item by clicking it again |
| `type` | `"multiple"` | `"single"` is exclusive; `"multiple"` is independent unless `autoclose` is set |
| `className` / `style` | — | Apply all visual styling here (also on Item, Trigger, Content) |

Controlled (`value` / `onValueChange`) or uncontrolled (`defaultValue`) supported. Use `data-state="open" | "closed"` in your CSS if needed.

## License

MIT
