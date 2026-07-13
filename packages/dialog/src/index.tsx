import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@elz-ui/core";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-slot="dialog-overlay"
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
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      data-slot="dialog-content"
      className={cn(className)}
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        zIndex: "var(--elz-z-overlay)" as unknown as number,
        transform: "translate(-50%, -50%)",
        background: "var(--elz-background)",
        color: "var(--elz-foreground)",
        borderRadius: "calc(var(--elz-radius) + 0.15rem)",
        boxShadow: "var(--elz-shadow)",
        border: "1px solid var(--elz-border)",
        padding: "1.5rem",
        width: "min(100% - 2rem, 26rem)",
        fontFamily: "var(--elz-font)",
        outline: "none",
        ...props.style,
      }}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="dialog-header"
    className={cn(className)}
    style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.25rem", ...style }}
    {...props}
  />
);

const DialogFooter = ({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="dialog-footer"
    className={cn(className)}
    style={{
      display: "flex",
      gap: "0.5rem",
      justifyContent: "flex-end",
      marginTop: "1.5rem",
      ...style,
    }}
    {...props}
  />
);

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    data-slot="dialog-title"
    className={cn(className)}
    style={{
      margin: 0,
      fontFamily: "var(--elz-font-display)",
      fontSize: "1.35rem",
      fontWeight: 560,
      letterSpacing: "-0.02em",
      lineHeight: 1.25,
      ...props.style,
    }}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    data-slot="dialog-description"
    className={cn(className)}
    style={{
      margin: 0,
      color: "var(--elz-muted-foreground)",
      fontSize: "0.9375rem",
      lineHeight: 1.55,
      ...props.style,
    }}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
