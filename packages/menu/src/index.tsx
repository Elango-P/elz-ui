import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@elz-ui/core";

const Menu = DropdownMenuPrimitive.Root;
const MenuTrigger = DropdownMenuPrimitive.Trigger;
const MenuGroup = DropdownMenuPrimitive.Group;
const MenuPortal = DropdownMenuPrimitive.Portal;
const MenuSub = DropdownMenuPrimitive.Sub;
const MenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const MenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 8, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      data-slot="menu-content"
      className={cn(className)}
      style={{
        zIndex: "var(--elz-z-overlay)" as unknown as number,
        minWidth: "12.5rem",
        background: "var(--elz-background)",
        color: "var(--elz-foreground)",
        borderRadius: "var(--elz-radius)",
        border: "1px solid var(--elz-border)",
        boxShadow: "var(--elz-shadow)",
        padding: "0.35rem",
        fontFamily: "var(--elz-font)",
        outline: "none",
        ...props.style,
      }}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
MenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const MenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    data-slot="menu-item"
    className={cn(className)}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "0.65rem",
      borderRadius: "var(--elz-radius-sm)",
      padding: "0.55rem 0.7rem",
      fontSize: "0.875rem",
      outline: "none",
      cursor: "pointer",
      transition: "background 120ms ease, color 120ms ease",
      ...props.style,
    }}
    {...props}
  />
));
MenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const MenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    data-slot="menu-separator"
    className={cn(className)}
    style={{ height: 1, margin: "0.35rem 0.25rem", background: "var(--elz-border)", ...props.style }}
    {...props}
  />
));
MenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const MenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    data-slot="menu-label"
    className={cn(className)}
    style={{
      padding: "0.45rem 0.7rem 0.25rem",
      fontSize: "0.6875rem",
      fontWeight: 600,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      color: "var(--elz-muted-foreground)",
      ...props.style,
    }}
    {...props}
  />
));
MenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

export {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuLabel,
  MenuGroup,
  MenuPortal,
  MenuSub,
  MenuRadioGroup,
};
