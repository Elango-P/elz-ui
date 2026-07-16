import * as React from "react";
import { cn } from "@elz-ui/core";

export interface InputPrefixProps extends React.HTMLAttributes<HTMLDivElement> {}

export const InputPrefix = React.forwardRef<HTMLDivElement, InputPrefixProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "elz-input-icon elz-input-icon--left",
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
