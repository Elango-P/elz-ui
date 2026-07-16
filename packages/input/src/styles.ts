import { createVariants } from "@elz-ui/core";

export const inputVariants = createVariants({
  base: "elz-input-wrapper",
  variants: {
    variant: {
      filled: "elz-input--filled",
      outlined: "elz-input--outlined",
      ghost: "elz-input--ghost",
      soft: "elz-input--soft",
      underlined: "elz-input--underlined",
      flat: "elz-input--flat",
    },
    size: {
      xs: "elz-input--size-xs",
      sm: "elz-input--size-sm",
      md: "elz-input--size-md",
      lg: "elz-input--size-lg",
      xl: "elz-input--size-xl",
    },
    radius: {
      none: "elz-input--radius-none",
      sm: "elz-input--radius-sm",
      md: "elz-input--radius-md",
      lg: "elz-input--radius-lg",
      xl: "elz-input--radius-xl",
      full: "elz-input--radius-full",
    },
    color: {
      primary: "elz-input--color-primary",
      secondary: "elz-input--color-secondary",
      success: "elz-input--color-success",
      warning: "elz-input--color-warning",
      danger: "elz-input--color-danger",
      info: "elz-input--color-info",
    },
    hasError: {
      true: "elz-input--error",
      false: "",
    },
  },
  defaultVariants: {
    variant: "outlined",
    size: "md",
    radius: "md",
    color: "primary",
    hasError: "false",
  },
});
