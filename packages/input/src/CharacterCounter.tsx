import * as React from "react";
import { cn } from "@elz-ui/core";
import { useInputContext } from "./context";

export interface CharacterCounterProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const CharacterCounter = React.forwardRef<HTMLSpanElement, CharacterCounterProps>(
  ({ className, ...props }, ref) => {
    const { valueLength, maxLength } = useInputContext();

    if (maxLength === undefined) return null;

    const isNearLimit = valueLength >= maxLength * 0.9;
    const isAtLimit = valueLength >= maxLength;

    return (
      <span
        ref={ref}
        className={cn(
          "elz-input-counter",
          isAtLimit
            ? "elz-input-counter--limit"
            : isNearLimit
            ? "elz-input-counter--near"
            : "",
          className
        )}
        {...props}
      >
        {valueLength}/{maxLength}
      </span>
    );
  }
);

CharacterCounter.displayName = "CharacterCounter";
