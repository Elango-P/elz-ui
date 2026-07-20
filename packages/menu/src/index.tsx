import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn, resolveSurfaceStyle } from "@elz-ui/core";

/** Defaults to non-modal so page scroll / zoom keep working while the menu is open. Pass `modal` to opt into Radix scroll-lock. */
function Menu({
  modal = false,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root modal={modal} {...props} />;
}

const MenuTrigger = DropdownMenuPrimitive.Trigger;
const MenuGroup = DropdownMenuPrimitive.Group;
const MenuPortal = DropdownMenuPrimitive.Portal;
const MenuSub = DropdownMenuPrimitive.Sub;
const MenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const MenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 8, style, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      data-slot="menu-content"
      className={cn(className)}
      {...props}
      style={resolveSurfaceStyle(className, style)}
    />
  </DropdownMenuPrimitive.Portal>
));
MenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const MenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, style, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    data-slot="menu-item"
    className={cn(className)}
    {...props}
    style={resolveSurfaceStyle(className, style)}
  />
));
MenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const MenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, style, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    data-slot="menu-separator"
    className={cn(className)}
    {...props}
    style={resolveSurfaceStyle(className, style)}
  />
));
MenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const MenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, style, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    data-slot="menu-label"
    className={cn(className)}
    {...props}
    style={resolveSurfaceStyle(className, style)}
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
