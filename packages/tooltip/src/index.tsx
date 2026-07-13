import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@elz-ui/core";

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      data-slot="tooltip-content"
      className={cn(className)}
      style={{
        zIndex: "var(--elz-z-overlay)" as unknown as number,
        background: "#171a21",
        color: "#f7f8fa",
        borderRadius: "var(--elz-radius-sm)",
        padding: "0.45rem 0.7rem",
        fontSize: "0.75rem",
        fontWeight: 500,
        letterSpacing: "0.01em",
        fontFamily: "var(--elz-font)",
        boxShadow: "var(--elz-shadow-sm)",
        maxWidth: "16rem",
        ...props.style,
      }}
      {...props}
    >
      {props.children}
      <TooltipPrimitive.Arrow
        style={{ fill: "#171a21" }}
        width={11}
        height={6}
      />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent };
