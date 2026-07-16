import * as React from "react";
import { cn } from "@elz-ui/core";
import { useInputContext } from "./context";

export interface InputLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  floating?: boolean;
}

export const InputLabel = React.forwardRef<HTMLLabelElement, InputLabelProps>(
  ({ className, floating, children, ...props }, ref) => {
    const { id, required, isFocused, valueLength, hasError, disabled } = useInputContext();
    const hasValue = valueLength > 0;

    return (
      <label
        ref={ref}
        htmlFor={id}
        className={cn(
          "elz-input-label",
          floating && "elz-input-label--floating",
          floating && (isFocused || hasValue) && "elz-input-label--floating-active",
          floating && !(isFocused || hasValue) && "elz-input-label--floating-inactive",
          hasError && "elz-input-label--error",
          disabled && "elz-input-label--disabled",
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  }
);

InputLabel.displayName = "InputLabel";
