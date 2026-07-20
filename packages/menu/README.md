# @elz-ui/menu

Accessible dropdown menu for Elz UI.

Built on Radix Dropdown Menu. Keyboard and ARIA behavior included.

Defaults come from `@elz-ui/core/styles.css`. Prefer **`className`** (Tailwind/Bootstrap); use **`style`** for one-off CSS.

`Menu` defaults to `modal={false}` so page scroll and zoom keep working. Pass `modal` for Radix scroll-lock.

## Install

```bash
npm i @elz-ui/menu @elz-ui/core
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
  Menu,
  MenuTrigger,
  MenuContent,
  MenuLabel,
  MenuItem,
  MenuSeparator,
} from "@elz-ui/menu";

<Menu>
  <MenuTrigger>Actions</MenuTrigger>
  <MenuContent>
    <MenuLabel>Account</MenuLabel>
    <MenuItem>Profile</MenuItem>
    <MenuItem>Settings</MenuItem>
    <MenuSeparator />
    <MenuItem>Log out</MenuItem>
  </MenuContent>
</Menu>
```

### Modal behavior

`Menu` defaults to `modal={false}` so page scroll and browser zoom keep working while open. Pass `modal` when you want Radix scroll-lock / inert background:

```tsx
<Menu modal>
  {/* … */}
</Menu>
```

## Exports

| Export | Description |
|--------|-------------|
| `Menu` | Root open-state controller (`modal` defaults to `false`) |
| `MenuTrigger` | Element that opens the menu |
| `MenuContent` | Floating menu panel |
| `MenuItem` | Selectable menu row |
| `MenuSeparator` | Visual divider |
| `MenuLabel` | Non-interactive section label |
| `MenuGroup` | Groups related items |
| `MenuPortal` | Portal container |
| `MenuSub` | Nested submenu root |
| `MenuRadioGroup` | Radio-style item group |

## License

MIT
