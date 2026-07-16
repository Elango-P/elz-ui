import * as React from "react";
import { cn } from "@elz-ui/core";

export interface InputSuffixProps extends React.HTMLAttributes<HTMLDivElement> {}

export const InputSuffix = React.forwardRef<HTMLDivElement, InputSuffixProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center pl-2 pr-3 text-gray-500 dark:text-gray-400 select-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

InputSuffix.displayName = "InputSuffix";
