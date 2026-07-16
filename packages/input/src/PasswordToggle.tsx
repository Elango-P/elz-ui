import * as React from "react";
import { cn } from "@elz-ui/core";

export interface PasswordToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isVisible: boolean;
  onToggle: () => void;
}

export const PasswordToggle = React.forwardRef<HTMLButtonElement, PasswordToggleProps>(
  ({ className, isVisible, onToggle, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onToggle}
        className={cn(
          "elz-input-button elz-input-icon--right",
          className
        )}
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-pressed={isVisible}
        {...props}
      >
        {isVisible ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13.36 13.36a3 3 0 1 0-4.24-4.24" />
            <path d="m2 2 20 20" />
            <path d="M4.1 8.1C2.8 9.8 2 12 2 12s4 8 10 8a10.8 10.8 0 0 0 4.1-.8" />
            <path d="M9 3.1A10.8 10.8 0 0 1 12 3c6 0 10 8 10 8s-1.8 3.5-4.6 5.5" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    );
  }
);

PasswordToggle.displayName = "PasswordToggle";
