import * as React from "react";
import { cn } from "@elz-ui/core";

type AccordionType = "single" | "multiple";

type AccordionContextValue = {
  type: AccordionType;
  value: string[];
  toggle: (itemValue: string) => void;
};

type AccordionItemContextValue = {
  value: string;
  contentId: string;
  open: boolean;
  headerClassName?: string;
  headerStyle?: React.CSSProperties;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);
const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

function useAccordion() {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) {
    throw new Error("Accordion components must be used within <Accordion>");
  }
  return ctx;
}

function useAccordionItem() {
  const ctx = React.useContext(AccordionItemContext);
  if (!ctx) {
    throw new Error("AccordionItem components must be used within <AccordionItem>");
  }
  return ctx;
}

function toArray(value: string | string[] | undefined): string[] {
  if (value === undefined || value === "") return [];
  return Array.isArray(value) ? value : [value];
}

function ChevronIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type AccordionProps = Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue"> & {
  /**
   * When true, opening one item closes the others.
   * Can be combined with `type="multiple"` — `autoclose` wins at runtime.
   * Default: false (each item toggles independently).
   */
  autoclose?: boolean;
  collapsible?: boolean;
  type?: AccordionType;
  value?: string | string[];
  defaultValue?: string | string[];
  /** Exclusive mode (`autoclose` / `type="single"`) passes a string; otherwise a string[]. */
  onValueChange?: (value: string | string[]) => void;
};

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
  const {
    type = "multiple",
    autoclose,
    collapsible = true,
    value: valueProp,
    defaultValue,
    onValueChange,
    className,
    children,
    style,
    ...rest
  } = props;

  const exclusive = autoclose ?? type === "single";
  const resolvedType: AccordionType = exclusive ? "single" : "multiple";

  const isControlled = valueProp !== undefined;
  const [uncontrolled, setUncontrolled] = React.useState(() => toArray(defaultValue));

  const value = isControlled ? toArray(valueProp) : uncontrolled;

  const toggle = React.useCallback(
    (itemValue: string) => {
      const isOpen = value.includes(itemValue);
      let next: string[];

      if (!exclusive) {
        next = isOpen ? value.filter((v) => v !== itemValue) : [...value, itemValue];
      } else if (isOpen) {
        next = collapsible ? [] : value;
      } else {
        next = [itemValue];
      }

      if (!isControlled) {
        setUncontrolled(next);
      }

      if (onValueChange) {
        onValueChange(exclusive ? (next[0] ?? "") : next);
      }
    },
    [exclusive, collapsible, value, isControlled, onValueChange],
  );

  return (
    <AccordionContext.Provider value={{ type: resolvedType, value, toggle }}>
      <div
        ref={ref}
        data-slot="accordion"
        data-autoclose={exclusive ? "true" : "false"}
        className={cn(className)}
        {...rest}
        style={{ display: "grid", gap: "0.25rem", ...style }}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
});
Accordion.displayName = "Accordion";

type AccordionItemProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string;
  /** Class names applied to the header trigger (Bootstrap / Tailwind). */
  headerClassName?: string;
  /** Inline styles applied to the header trigger (bg, color, etc.). */
  headerStyle?: React.CSSProperties;
};

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  (
    {
      className,
      value: itemValue,
      children,
      style,
      headerClassName,
      headerStyle,
      ...props
    },
    ref,
  ) => {
    const { value } = useAccordion();
    const open = value.includes(itemValue);
    const reactId = React.useId();
    const contentId = `elz-accordion-content-${reactId}`;

    return (
      <AccordionItemContext.Provider
        value={{ value: itemValue, contentId, open, headerClassName, headerStyle }}
      >
        <div
          ref={ref}
          data-slot="accordion-item"
          data-state={open ? "open" : "closed"}
          className={cn(className)}
          {...props}
          style={{ background: "var(--elz-background, #fff)", ...style }}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  },
);
AccordionItem.displayName = "AccordionItem";

type AccordionTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, style, onClick, ...props }, ref) => {
    const { toggle } = useAccordion();
    const { value, contentId, open, headerClassName, headerStyle } = useAccordionItem();

    return (
      <h3 style={{ margin: 0 }}>
        <button
          ref={ref}
          type="button"
          data-slot="accordion-trigger"
          data-state={open ? "open" : "closed"}
          aria-expanded={open}
          aria-controls={contentId}
          className={cn(headerClassName, className)}
          {...props}
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            margin: 0,
            padding: "0.75rem 1rem",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            font: "inherit",
            color: "inherit",
            textAlign: "left",
            ...headerStyle,
            ...style,
          }}
          onClick={(event) => {
            onClick?.(event);
            if (!event.defaultPrevented) {
              toggle(value);
            }
          }}
        >
          <span style={{ flex: 1 }}>{children}</span>
          <span data-slot="accordion-chevron" aria-hidden>
            <ChevronIcon />
          </span>
        </button>
      </h3>
    );
  },
);
AccordionTrigger.displayName = "AccordionTrigger";

type AccordionContentProps = React.HTMLAttributes<HTMLDivElement>;

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, style, ...props }, ref) => {
    const { contentId, open } = useAccordionItem();

    return (
      <div
        ref={ref}
        id={contentId}
        role="region"
        inert={!open ? true : undefined}
        aria-hidden={!open}
        data-slot="accordion-content"
        data-state={open ? "open" : "closed"}
        className={cn(className)}
        {...props}
        style={{
          padding: "0 1rem 0.85rem",
          ...style,
        }}
      >
        <div data-slot="accordion-content-inner">{children}</div>
      </div>
    );
  },
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
export type { AccordionProps, AccordionItemProps, AccordionTriggerProps, AccordionContentProps };
