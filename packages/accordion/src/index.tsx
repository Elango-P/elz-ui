import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@elz-ui/core";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    data-slot="accordion-item"
    className={cn(className)}
    style={{ borderBottom: "1px solid var(--elz-border)", ...props.style }}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header style={{ margin: 0 }}>
    <AccordionPrimitive.Trigger
      ref={ref}
      data-slot="accordion-trigger"
      className={cn(className)}
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.75rem 0",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--elz-font)",
        fontSize: "0.9375rem",
        fontWeight: 500,
        color: "var(--elz-foreground)",
        textAlign: "left",
        ...props.style,
      }}
      {...props}
    >
      {children}
      <span aria-hidden style={{ marginLeft: "0.5rem" }}>
        ▾
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    data-slot="accordion-content"
    className={cn(className)}
    style={{ overflow: "hidden", fontFamily: "var(--elz-font)", ...props.style }}
    {...props}
  >
    <div style={{ paddingBottom: "0.75rem", color: "var(--elz-muted-foreground)", fontSize: "0.875rem" }}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
