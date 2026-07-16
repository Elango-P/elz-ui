import * as React from "react";
import { cn } from "@elz-ui/core";
import { useInputContext } from "./context";

export interface InputHelperProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const InputHelper = React.forwardRef<HTMLParagraphElement, InputHelperProps>(
  ({ className, children, ...props }, ref) => {
    const { id } = useInputContext();

    if (!children) return null;

    return (
      <p
        ref={ref}
        id={`${id}-helper`}
        className={cn("mt-1.5 text-sm text-gray-500 dark:text-gray-400", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

InputHelper.displayName = "InputHelper";
