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
          "flex h-full items-center justify-center px-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 rounded-md transition-colors",
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
