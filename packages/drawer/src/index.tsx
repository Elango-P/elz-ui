import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn, resolveSurfaceStyle, type Side } from "@elz-ui/core";

const Drawer = DialogPrimitive.Root;
const DrawerTrigger = DialogPrimitive.Trigger;
const DrawerClose = DialogPrimitive.Close;
const DrawerPortal = DialogPrimitive.Portal;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, style, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-slot="drawer-overlay"
    className={cn(className)}
    {...props}
    style={resolveSurfaceStyle(className, style)}
  />
));
DrawerOverlay.displayName = "DrawerOverlay";

type DrawerContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  side?: Side;
};

function allowPortaledOverlayInteraction(event: {
  preventDefault: () => void;
  target: EventTarget | null;
}) {
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (
    target.closest(".overlay-menu") ||
    target.closest("[data-radix-popper-content-wrapper]") ||
    target.closest("[data-slot='menu-content']") ||
    target.closest("[data-slot='popover-content']") ||
    target.closest("[data-slot='select-content']") ||
    target.closest("[data-slot='tooltip-content']")
  ) {
    event.preventDefault();
  }
}

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(
  (
    {
      className,
      children,
      side = "right",
      style,
      onPointerDownOutside,
      onInteractOutside,
      onFocusOutside,
      ...props
    },
    ref,
  ) => (
    <DrawerPortal>
      <DrawerOverlay />
      <DialogPrimitive.Content
        ref={ref}
        data-slot="drawer-content"
        data-side={side}
        className={cn(className)}
        onPointerDownOutside={(event) => {
          allowPortaledOverlayInteraction(event);
          onPointerDownOutside?.(event);
        }}
        onInteractOutside={(event) => {
          allowPortaledOverlayInteraction(event);
          onInteractOutside?.(event);
        }}
        onFocusOutside={(event) => {
          allowPortaledOverlayInteraction(event);
          onFocusOutside?.(event);
        }}
        {...props}
        style={resolveSurfaceStyle(className, style)}
      >
        {children}
      </DialogPrimitive.Content>
    </DrawerPortal>
  ),
);
DrawerContent.displayName = "DrawerContent";

function DrawerHeader({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(className)}
      {...props}
      style={resolveSurfaceStyle(className, style)}
    />
  );
}

function DrawerFooter({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(className)}
      {...props}
      style={resolveSurfaceStyle(className, style)}
    />
  );
}

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, style, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    data-slot="drawer-title"
    className={cn(className)}
    {...props}
    style={resolveSurfaceStyle(className, style)}
  />
));
DrawerTitle.displayName = "DrawerTitle";

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, style, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    data-slot="drawer-description"
    className={cn(className)}
    {...props}
    style={resolveSurfaceStyle(className, style)}
  />
));
DrawerDescription.displayName = "DrawerDescription";

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
