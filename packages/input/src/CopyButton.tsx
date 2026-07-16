import * as React from "react";
import { cn } from "@elz-ui/core";

export interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string;
}

export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ className, valueToCopy, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = React.useCallback(() => {
      if (!valueToCopy) return;
      navigator.clipboard.writeText(valueToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }, [valueToCopy]);

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleCopy}
        className={cn(
          "elz-input-button elz-input-icon--right",
          className
        )}
        aria-label="Copy to clipboard"
        {...props}
      >
        {copied ? (
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
            className="text-green-500"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
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
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        )}
      </button>
    );
  }
);

CopyButton.displayName = "CopyButton";
