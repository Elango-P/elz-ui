import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn, resolveSurfaceStyle } from "@elz-ui/core";

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

export type ToastVariant = "default" | "success" | "error" | "warn" | "info";

type ToastData = {
  id: string;
  title?: string;
  description?: string;
  duration?: number;
  variant?: ToastVariant;
};

type ToastInput = Omit<ToastData, "id">;

type ToastFn = ((input: ToastInput) => string) & {
  success: (title: string, input?: Omit<ToastInput, "title" | "variant">) => string;
  error: (title: string, input?: Omit<ToastInput, "title" | "variant">) => string;
  warn: (title: string, input?: Omit<ToastInput, "title" | "variant">) => string;
  info: (title: string, input?: Omit<ToastInput, "title" | "variant">) => string;
};

type ToastContextValue = {
  toasts: ToastData[];
  toast: ToastFn;
  dismiss: (id: string) => void;
  position: ToastPosition;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

let toastCount = 0;

const swipeByPosition: Record<ToastPosition, "up" | "down" | "left" | "right"> = {
  "top-left": "left",
  "top-right": "right",
  "top-center": "up",
  "bottom-left": "left",
  "bottom-right": "right",
  "bottom-center": "down",
};

function createToastId() {
  return `elz-toast-${++toastCount}`;
}

function withToastHelpers(base: (input: ToastInput) => string): ToastFn {
  const fn = base as ToastFn;
  fn.success = (title, input) => base({ ...input, title, variant: "success" });
  fn.error = (title, input) => base({ ...input, title, variant: "error" });
  fn.warn = (title, input) => base({ ...input, title, variant: "warn" });
  fn.info = (title, input) => base({ ...input, title, variant: "info" });
  return fn;
}

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

  const toast = React.useMemo(
    () =>
      withToastHelpers((input: ToastInput) => {
        const id = createToastId();
        setToasts((prev) => [...prev, { id, duration, variant: "default", ...input }]);
        return id;
      }),
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

const toast = withToastHelpers((input: ToastInput) => {
  const detail: ToastData = { variant: "default", ...input, id: createToastId() };
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("elz-toast", { detail }));
  }
  return detail.id;
});

function Toaster({ className, style, ...props }: React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>) {
  const ctx = React.useContext(ToastContext);
  const [external, setExternal] = React.useState<ToastData[]>([]);
  const position = ctx?.position ?? "bottom-right";

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
      {items.map((item) => {
        const variant = item.variant ?? "default";
        return (
          <ToastPrimitive.Root
            key={item.id}
            duration={item.duration}
            data-slot="toast"
            data-position={position}
            data-variant={variant}
            open
            onOpenChange={(open) => {
              if (!open) {
                ctx?.dismiss(item.id);
                setExternal((prev) => prev.filter((t) => t.id !== item.id));
              }
            }}
          >
            <div data-slot="toast-body">
              {item.title ? (
                <ToastPrimitive.Title data-slot="toast-title">{item.title}</ToastPrimitive.Title>
              ) : null}
              {item.description ? (
                <ToastPrimitive.Description data-slot="toast-description">
                  {item.description}
                </ToastPrimitive.Description>
              ) : null}
            </div>
            <ToastPrimitive.Close aria-label="Close" data-slot="toast-close">
              ×
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        );
      })}
      <ToastPrimitive.Viewport
        data-slot="toast-viewport"
        data-position={position}
        className={cn(className)}
        {...props}
        style={resolveSurfaceStyle(className, style)}
      />
    </>
  );
}

export { ToastProvider, useToast, toast, Toaster };
export type { ToastProviderProps, ToastInput, ToastData };
