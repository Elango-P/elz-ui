import * as React from "react";
import { cn } from "@elz-ui/core";

export interface InputSuffixProps extends React.HTMLAttributes<HTMLDivElement> {}

export const InputSuffix = React.forwardRef<HTMLDivElement, InputSuffixProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "elz-input-icon elz-input-icon--right",
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
