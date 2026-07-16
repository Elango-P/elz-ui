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
          "block text-sm font-medium text-gray-700 dark:text-gray-200 transition-all duration-200",
          floating && "absolute left-3 top-2.5 origin-[0] -translate-y-4 scale-75 transform cursor-text bg-white dark:bg-gray-900 px-1 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:peer-focus:text-blue-500",
          floating && (isFocused || hasValue) ? "text-blue-600 dark:text-blue-500 scale-75 -translate-y-4" : "",
          hasError && "text-red-500 dark:text-red-400",
          disabled && "opacity-50 cursor-not-allowed",
          !floating && "mb-1.5",
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
