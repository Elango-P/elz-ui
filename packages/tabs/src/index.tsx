import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@elz-ui/core";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    data-slot="tabs-list"
    className={cn(className)}
    style={{
      display: "inline-flex",
      gap: "0.25rem",
      padding: "0.25rem",
      background: "var(--elz-muted)",
      borderRadius: "var(--elz-radius)",
      fontFamily: "var(--elz-font)",
      ...props.style,
    }}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    data-slot="tabs-trigger"
    className={cn(className)}
    style={{
      border: "none",
      background: "transparent",
      borderRadius: "calc(var(--elz-radius) * 0.75)",
      padding: "0.4rem 0.75rem",
      fontSize: "0.875rem",
      cursor: "pointer",
      color: "var(--elz-muted-foreground)",
      ...props.style,
    }}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-slot="tabs-content"
    className={cn(className)}
    style={{ marginTop: "0.75rem", fontFamily: "var(--elz-font)", ...props.style }}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
