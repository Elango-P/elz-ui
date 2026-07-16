import * as React from "react";
import { cn } from "@elz-ui/core";
import { buttonVariants } from "./styles";
import type { ButtonProps } from "./types";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      color,
      radius,
      fullWidth,
      isLoading,
      leftIcon,
      rightIcon,
      disabled,
      children,
      asChild,
      ...props
    },
    ref
  ) => {
    // If asChild is true, we should ideally use Slot from radix-ui. 
    // For now, if no Slot is available, we ignore asChild or implement a basic version.
    // In many UI libs (like shadcn), asChild uses Radix UI's Slot component.
    // We will stick to a standard button if asChild is not fully implemented, or you can add Slot if you have it.
    
    // We treat buttons with only an icon as "icon-only" to adjust padding if needed.
    const isIconOnly = React.Children.count(children) === 0 && (!!leftIcon || !!rightIcon);

    const buttonClass = cn(
      buttonVariants({
        variant,
        size,
        color,
        radius,
        isIconOnly: isIconOnly ? "true" : "false",
      }),
      fullWidth && "elz-btn--full-width",
      isLoading && "elz-btn--loading",
      className
    );

    return (
      <button
        ref={ref}
        className={buttonClass}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className="elz-btn__spinner">
            <svg
              style={{ animation: 'spin 1s linear infinite', height: '1.2em', width: '1.2em' }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        )}
        
        {!isLoading && leftIcon && (
          <span className="elz-btn__icon elz-btn__icon--left">{leftIcon}</span>
        )}
        
        {children && <span className="elz-btn__content">{children}</span>}
        
        {!isLoading && rightIcon && (
          <span className="elz-btn__icon elz-btn__icon--right">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
