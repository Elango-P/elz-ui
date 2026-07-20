import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn, resolveSurfaceStyle } from "@elz-ui/core";

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, style, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      data-slot="tooltip-content"
      className={cn(className)}
      {...props}
      style={resolveSurfaceStyle(className, style)}
    >
      {children}
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
