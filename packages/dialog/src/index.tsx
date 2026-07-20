import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn, resolveSurfaceStyle } from "@elz-ui/core";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, style, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-slot="dialog-overlay"
    className={cn(className)}
    {...props}
    style={resolveSurfaceStyle(className, style)}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

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

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(
  (
    {
      className,
      children,
      style,
      onPointerDownOutside,
      onInteractOutside,
      onFocusOutside,
      ...props
    },
    ref,
  ) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        data-slot="dialog-content"
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
    </DialogPortal>
  ),
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="dialog-header"
    className={cn(className)}
    {...props}
    style={resolveSurfaceStyle(className, style)}
  />
);

const DialogFooter = ({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="dialog-footer"
    className={cn(className)}
    {...props}
    style={resolveSurfaceStyle(className, style)}
  />
);

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, style, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    data-slot="dialog-title"
    className={cn(className)}
    {...props}
    style={resolveSurfaceStyle(className, style)}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, style, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    data-slot="dialog-description"
    className={cn(className)}
    {...props}
    style={resolveSurfaceStyle(className, style)}
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
