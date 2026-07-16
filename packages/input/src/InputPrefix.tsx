import * as React from "react";
import { cn } from "@elz-ui/core";

export interface InputPrefixProps extends React.HTMLAttributes<HTMLDivElement> {}

export const InputPrefix = React.forwardRef<HTMLDivElement, InputPrefixProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center pl-3 pr-2 text-gray-500 dark:text-gray-400 select-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

InputPrefix.displayName = "InputPrefix";
