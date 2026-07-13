import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@elz-ui/core";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 8, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      data-slot="popover-content"
      className={cn(className)}
      style={{
        zIndex: "var(--elz-z-overlay)" as unknown as number,
        background: "var(--elz-background)",
        color: "var(--elz-foreground)",
        borderRadius: "var(--elz-radius)",
        border: "1px solid var(--elz-border)",
        boxShadow: "var(--elz-shadow)",
        padding: "1rem",
        width: "min(100vw - 2rem, 18rem)",
        fontFamily: "var(--elz-font)",
        fontSize: "0.875rem",
        lineHeight: 1.5,
        outline: "none",
        ...props.style,
      }}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
