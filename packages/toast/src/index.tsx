import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn } from "@elz-ui/core";

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

type ToastData = {
  id: string;
  title?: string;
  description?: string;
  duration?: number;
};

type ToastContextValue = {
  toasts: ToastData[];
  toast: (input: Omit<ToastData, "id">) => string;
  dismiss: (id: string) => void;
  position: ToastPosition;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

let toastCount = 0;

const positionStyles: Record<ToastPosition, React.CSSProperties> = {
  "top-left": { top: "1.25rem", left: "1.25rem", right: "auto", bottom: "auto" },
  "top-right": { top: "1.25rem", right: "1.25rem", left: "auto", bottom: "auto" },
  "top-center": { top: "1.25rem", left: "50%", right: "auto", bottom: "auto", transform: "translateX(-50%)" },
  "bottom-left": { bottom: "1.25rem", left: "1.25rem", right: "auto", top: "auto" },
  "bottom-right": { bottom: "1.25rem", right: "1.25rem", left: "auto", top: "auto" },
  "bottom-center": { bottom: "1.25rem", left: "50%", right: "auto", top: "auto", transform: "translateX(-50%)" },
};

const swipeByPosition: Record<ToastPosition, "up" | "down" | "left" | "right"> = {
  "top-left": "left",
  "top-right": "right",
  "top-center": "up",
  "bottom-left": "left",
  "bottom-right": "right",
  "bottom-center": "down",
};

type ToastProviderProps = React.ComponentPropsWithoutRef<typeof ToastPrimitive.Provider> & {
  duration?: number;
  /** Where toasts appear. Default: `bottom-right` */
  position?: ToastPosition;
};

function ToastProvider({
  children,
  duration = 4000,
  position = "bottom-right",
  ...props
}: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const toast = React.useCallback(
    (input: Omit<ToastData, "id">) => {
      const id = `elz-toast-${++toastCount}`;
      setToasts((prev) => [...prev, { id, duration, ...input }]);
      return id;
    },
    [duration],
  );

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = React.useMemo(
    () => ({ toasts, toast, dismiss, position }),
    [toasts, toast, dismiss, position],
  );

  return (
    <ToastContext.Provider value={value}>
      <ToastPrimitive.Provider duration={duration} swipeDirection={swipeByPosition[position]} {...props}>
        {children}
        <Toaster />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

function toast(input: Omit<ToastData, "id">) {
  const detail = { ...input, id: `elz-toast-${++toastCount}` };
  window.dispatchEvent(new CustomEvent("elz-toast", { detail }));
  return detail.id;
}

function Toaster({ className, ...props }: React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>) {
  const ctx = React.useContext(ToastContext);
  const [external, setExternal] = React.useState<ToastData[]>([]);
  const position = ctx?.position ?? "bottom-right";
  const isTop = position.startsWith("top");

  React.useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ToastData>).detail;
      setExternal((prev) => [...prev, detail]);
    };
    window.addEventListener("elz-toast", handler);
    return () => window.removeEventListener("elz-toast", handler);
  }, []);

  const items = [...(ctx?.toasts ?? []), ...external];

  return (
    <>
      {items.map((item) => (
        <ToastPrimitive.Root
          key={item.id}
          duration={item.duration}
          data-slot="toast"
          data-position={position}
          open
          onOpenChange={(open) => {
            if (!open) {
              ctx?.dismiss(item.id);
              setExternal((prev) => prev.filter((t) => t.id !== item.id));
            }
          }}
          style={{
            background: "var(--elz-background)",
            color: "var(--elz-foreground)",
            border: "1px solid var(--elz-border)",
            borderRadius: "var(--elz-radius)",
            boxShadow: "var(--elz-shadow)",
            padding: "0.9rem 1rem",
            fontFamily: "var(--elz-font)",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "0.35rem 0.75rem",
            alignItems: "start",
            borderLeft: "3px solid var(--elz-accent)",
          }}
        >
          <div style={{ display: "grid", gap: "0.2rem" }}>
            {item.title ? (
              <ToastPrimitive.Title
                data-slot="toast-title"
                style={{ fontWeight: 600, fontSize: "0.875rem", letterSpacing: "-0.01em" }}
              >
                {item.title}
              </ToastPrimitive.Title>
            ) : null}
            {item.description ? (
              <ToastPrimitive.Description
                data-slot="toast-description"
                style={{ fontSize: "0.8125rem", color: "var(--elz-muted-foreground)", lineHeight: 1.45 }}
              >
                {item.description}
              </ToastPrimitive.Description>
            ) : null}
          </div>
          <ToastPrimitive.Close
            aria-label="Close"
            data-slot="toast-close"
            style={{
              border: "none",
              background: "transparent",
              color: "var(--elz-muted-foreground)",
              cursor: "pointer",
              fontSize: "1.1rem",
              lineHeight: 1,
              padding: "0.1rem",
              borderRadius: "0.35rem",
            }}
          >
            ×
          </ToastPrimitive.Close>
        </ToastPrimitive.Root>
      ))}
      <ToastPrimitive.Viewport
        data-slot="toast-viewport"
        data-position={position}
        className={cn(className)}
        style={{
          position: "fixed",
          zIndex: "var(--elz-z-toast)" as unknown as number,
          display: "flex",
          flexDirection: isTop ? "column-reverse" : "column",
          gap: "0.65rem",
          width: "min(100vw - 2rem, 22rem)",
          outline: "none",
          ...positionStyles[position],
          ...props.style,
        }}
        {...props}
      />
    </>
  );
}

export { ToastProvider, useToast, toast, Toaster };
export type { ToastProviderProps };
