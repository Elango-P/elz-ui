import * as React from "react";
import { cn } from "@elz-ui/core";
import { useInputContext } from "./context";

export interface InputErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const InputError = React.forwardRef<HTMLParagraphElement, InputErrorProps>(
  ({ className, children, ...props }, ref) => {
    const { id, hasError } = useInputContext();

    if (!hasError || !children) return null;

    return (
      <p
        ref={ref}
        id={`${id}-error`}
        role="alert"
        className={cn("elz-input-error", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

InputError.displayName = "InputError";
