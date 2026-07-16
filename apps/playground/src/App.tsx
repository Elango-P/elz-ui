import { useForm } from "react-hook-form";
import { ElzProvider } from "@elz-ui/core";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@elz-ui/dialog";
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
import { Popover, PopoverTrigger, PopoverContent } from "@elz-ui/popover";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@elz-ui/tooltip";
import { ToastProvider, useToast } from "@elz-ui/toast";
import { Menu, MenuTrigger, MenuContent, MenuItem, MenuSeparator, MenuLabel } from "@elz-ui/menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@elz-ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@elz-ui/accordion";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@elz-ui/form";
import { Input } from "@elz-ui/input";
import { Button } from "@elz-ui/button";
import "./playground.css";

const FAQ_ITEMS = [
  {
    value: "a",
    title: "What is Elz UI?",
    content: "A modular React component library under @elz-ui.",
  },
  {
    value: "b",
    title: "How do I install?",
    content: "pnpm add @elz-ui/core @elz-ui/accordion",
  },
  {
    value: "c",
    title: "Is it accessible?",
    content: "Yes — keyboard and ARIA are built in.",
  },
] as const;

const AUTOCLOSE_ITEMS = [
  {
    value: "a",
    title: "Only one open at a time",
    content: "Opening another item closes this one.",
  },
  {
    value: "b",
    title: "Try opening me next",
    content: "The previous panel closed automatically.",
  },
] as const;

function AccordionList({
  items,
  autoclose,
}: {
  items: readonly { value: string; title: string; content: string }[];
  autoclose?: boolean;
}) {
  return (
    <Accordion autoclose={autoclose}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function ToastDemo() {
  const { toast } = useToast();
  return (
    <Button
      color="primary"
      type="button"
      onClick={() =>
        toast({
          title: "Changes published",
          description: "Your workspace settings were saved successfully.",
        })
      }
    >
      Show toast
    </Button>
  );
}

function FormDemo() {
  const form = useForm<{ email: string }>({ defaultValues: { email: "" } });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((v) => alert(JSON.stringify(v)))}
        style={{ display: "grid", gap: "0.75rem", maxWidth: 360 }}
      >
        <FormField
          control={form.control}
          name="email"
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <input
                  {...field}
                  placeholder="you@example.com"
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.75rem",
                    borderRadius: "var(--elz-radius-sm)",
                    border: "1px solid var(--elz-border)",
                    fontFamily: "var(--elz-font)",
                    background: "#fff",
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" color="primary" style={{ width: "fit-content" }}>
          Submit
        </Button>
      </form>
    </Form>
  );
}

function InputDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
      <Input label="Email" placeholder="Enter your email" />
      <Input label="Password" type="password" placeholder="Enter password" />
      <Input label="Username" placeholder="johndoe" prefix="@" />
      <Input label="Search" type="search" placeholder="Search..." clearable />
      <Input label="Invalid field" error="This field is required" defaultValue="Wrong value" />
      <Input label="Disabled" disabled placeholder="Not allowed" />
    </div>
  );
}

function ButtonDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--elz-muted-foreground)" }}>Variants</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <Button variant="solid" color="primary">Solid</Button>
          <Button variant="outlined" color="primary">Outlined</Button>
          <Button variant="soft" color="primary">Soft</Button>
          <Button variant="ghost" color="primary">Ghost</Button>
          <Button variant="link" color="primary">Link</Button>
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--elz-muted-foreground)" }}>Colors</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <Button color="default">Default</Button>
          <Button color="primary">Primary</Button>
          <Button color="danger">Danger</Button>
          <Button color="danger" variant="soft">Danger Soft</Button>
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--elz-muted-foreground)" }}>States & Sizes</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button isLoading color="primary">Loading...</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
    </div>
  );
}

export function App() {
  return (
    <ElzProvider>
      <ToastProvider position="top-right">
        <TooltipProvider delayDuration={180}>
          <main className="playground">
            <header className="playground__brand">
              <h1 className="playground__logo">Elz UI</h1>
              <p className="playground__tag">
                Precision overlays for product interfaces — dialogs, drawers, menus, and quiet feedback.
              </p>
            </header>

            <section className="overlay-stage">
              <h2 className="overlay-stage__title">Overlays</h2>
              <div className="overlay-grid">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button type="button">
                      Dialog
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Archive project?</DialogTitle>
                      <DialogDescription>
                        This hides the project from your dashboard. You can restore it anytime from archived
                        projects.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="ghost">
                          Cancel
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button type="button" color="primary">
                          Archive
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Drawer>
                  <DrawerTrigger asChild>
                    <Button type="button">
                      Drawer
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent side="right">
                    <DrawerHeader>
                      <DrawerTitle>Inspector</DrawerTitle>
                      <DrawerDescription>
                        Review details without leaving your current context.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="drawer-body">
                      <ul className="drawer-list">
                        <li>
                          <strong>Status</strong>
                          <span>Published</span>
                        </li>
                        <li>
                          <strong>Owner</strong>
                          <span>Design systems</span>
                        </li>
                        <li>
                          <strong>Updated</strong>
                          <span>2 hours ago</span>
                        </li>
                      </ul>
                    </div>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button type="button" variant="ghost">
                          Close
                        </Button>
                      </DrawerClose>
                      <Button type="button" color="primary">
                        Edit details
                      </Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button type="button">
                      Popover
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="popover-card">
                      <h3>Quick share</h3>
                      <p>Invite teammates with view or edit access. Links expire in 7 days.</p>
                      <Button type="button" color="primary">
                        Copy link
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="button">
                      Tooltip
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Keyboard shortcut: ⌘K</TooltipContent>
                </Tooltip>

                <Menu>
                  <MenuTrigger asChild>
                    <Button type="button">
                      Menu
                    </Button>
                  </MenuTrigger>
                  <MenuContent align="start">
                    <MenuLabel>Account</MenuLabel>
                    <MenuItem>
                      <span className="menu-icon">◎</span> Profile
                    </MenuItem>
                    <MenuItem>
                      <span className="menu-icon">⚙</span> Settings
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem>
                      <span className="menu-icon">↗</span> Open docs
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem style={{ color: "var(--elz-danger)" }}>
                      <span className="menu-icon">⎋</span> Log out
                    </MenuItem>
                  </MenuContent>
                </Menu>

                <ToastDemo />
              </div>
            </section>

            <section className="section">
              <h2>Tabs</h2>
              <Tabs defaultValue="one">
                <TabsList>
                  <TabsTrigger value="one">Overview</TabsTrigger>
                  <TabsTrigger value="two">Activity</TabsTrigger>
                </TabsList>
                <TabsContent value="one">Project health looks stable this week.</TabsContent>
                <TabsContent value="two">3 updates from your team in the last 24 hours.</TabsContent>
              </Tabs>
            </section>

            <section className="section">
              <h2>Accordion</h2>
              <AccordionList items={FAQ_ITEMS} />
              <h2 style={{ marginTop: "1.25rem" }}>Accordion (autoclose)</h2>
              <AccordionList items={AUTOCLOSE_ITEMS} autoclose />
            </section>

            <section className="section">
              <h2>Form</h2>
              <FormDemo />
            </section>

            <section className="section">
              <h2>Input</h2>
              <InputDemo />
            </section>

            <section className="section">
              <h2>Button</h2>
              <ButtonDemo />
            </section>
          </main>
        </TooltipProvider>
      </ToastProvider>
    </ElzProvider>
  );
}
