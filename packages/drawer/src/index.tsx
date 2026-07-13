import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn, type Side } from "@elz-ui/core";

const Drawer = DialogPrimitive.Root;
const DrawerTrigger = DialogPrimitive.Trigger;
const DrawerClose = DialogPrimitive.Close;
const DrawerPortal = DialogPrimitive.Portal;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-slot="drawer-overlay"
    className={cn(className)}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: "var(--elz-z-overlay)" as unknown as number,
      background: "var(--elz-overlay)",
      ...props.style,
    }}
    {...props}
  />
));
DrawerOverlay.displayName = "DrawerOverlay";

type DrawerContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  side?: Side;
};

const sideStyles: Record<Side, React.CSSProperties> = {
  right: { top: 0, right: 0, bottom: 0, width: "min(100%, 26rem)", height: "100%", borderLeft: "1px solid var(--elz-border)" },
  left: { top: 0, left: 0, bottom: 0, width: "min(100%, 26rem)", height: "100%", borderRight: "1px solid var(--elz-border)" },
  top: { top: 0, left: 0, right: 0, width: "100%", height: "min(100%, 22rem)", borderBottom: "1px solid var(--elz-border)" },
  bottom: { bottom: 0, left: 0, right: 0, width: "100%", height: "min(100%, 22rem)", borderTop: "1px solid var(--elz-border)" },
};

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(({ className, children, side = "right", ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DialogPrimitive.Content
      ref={ref}
      data-slot="drawer-content"
      data-side={side}
      className={cn(className)}
      style={{
        position: "fixed",
        zIndex: "var(--elz-z-overlay)" as unknown as number,
        background: "var(--elz-background)",
        color: "var(--elz-foreground)",
        boxShadow: "var(--elz-shadow)",
        padding: "1.5rem",
        fontFamily: "var(--elz-font)",
        display: "flex",
        flexDirection: "column",
        outline: "none",
        ...sideStyles[side],
        ...props.style,
      }}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

function DrawerHeader({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(className)}
      style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.25rem", ...style }}
      {...props}
    />
  );
}

function DrawerFooter({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(className)}
      style={{
        marginTop: "auto",
        display: "flex",
        gap: "0.5rem",
        justifyContent: "flex-end",
        paddingTop: "1.25rem",
        borderTop: "1px solid var(--elz-border)",
        ...style,
      }}
      {...props}
    />
  );
}

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    data-slot="drawer-title"
    className={cn(className)}
    style={{
      margin: 0,
      fontFamily: "var(--elz-font-display)",
      fontSize: "1.35rem",
      fontWeight: 560,
      letterSpacing: "-0.02em",
      ...props.style,
    }}
    {...props}
  />
));
DrawerTitle.displayName = "DrawerTitle";

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    data-slot="drawer-description"
    className={cn(className)}
    style={{ margin: 0, color: "var(--elz-muted-foreground)", fontSize: "0.9375rem", lineHeight: 1.55, ...props.style }}
    {...props}
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
