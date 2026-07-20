# @elz-ui/form

Form field primitives for Elz UI.

Accessible labels, descriptions, and error messages wired for [react-hook-form](https://react-hook-form.com/). Customize layout with `className` or `style`.

## Install

```bash
npm i @elz-ui/form @elz-ui/core react-hook-form
```

`@elz-ui/core` is a peer dependency. `react-hook-form` (`>=7`) is an optional peer but required for `Form` / `FormField`. Import `@elz-ui/core/styles.css` for theme variables.

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
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@elz-ui/form";

type Values = { email: string };

function ProfileForm() {
  const form = useForm<Values>({ defaultValues: { email: "" } });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)}>
        <FormField
          control={form.control}
          name="email"
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <input type="email" {...field} />
              </FormControl>
              <FormDescription>We never share your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </Form>
  );
}
```

`FormControl` uses Radix `Slot` so the child receives `id`, `aria-*`, and invalid state automatically.

## Exports

| Export | Description |
|--------|-------------|
| `Form` | Alias of react-hook-form `FormProvider` |
| `FormField` | `Controller` wrapper with field context |
| `FormItem` | Field layout container (generates ids) |
| `FormLabel` | Label linked to the control |
| `FormControl` | Slot that applies a11y props to the input |
| `FormDescription` | Helper text below the control |
| `FormMessage` | Validation / error message |
| `useFormField` | Reads field state and generated ids |

## License

MIT
