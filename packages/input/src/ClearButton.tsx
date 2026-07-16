import * as React from "react";
import { cn } from "@elz-ui/core";

export interface ClearButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClear: () => void;
}

export const ClearButton = React.forwardRef<HTMLButtonElement, ClearButtonProps>(
  ({ className, onClear, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClear}
        className={cn(
          "elz-input-button elz-input-icon--right",
          className
        )}
        aria-label="Clear input"
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    );
  }
);

ClearButton.displayName = "ClearButton";
