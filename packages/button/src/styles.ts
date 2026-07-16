import { createVariants } from "@elz-ui/core";

export const buttonVariants = createVariants({
  base: "elz-btn",
  variants: {
    variant: {
      solid: "elz-btn--solid",
      outlined: "elz-btn--outlined",
      ghost: "elz-btn--ghost",
      soft: "elz-btn--soft",
      link: "elz-btn--link",
    },
    color: {
      default: "elz-btn--default",
      primary: "elz-btn--primary",
      secondary: "elz-btn--secondary",
      success: "elz-btn--success",
      warning: "elz-btn--warning",
      danger: "elz-btn--danger",
    },
    size: {
      sm: "elz-btn--size-sm",
      md: "elz-btn--size-md",
      lg: "elz-btn--size-lg",
      icon: "elz-btn--size-icon",
    },
    radius: {
      none: "elz-btn--radius-none",
      sm: "elz-btn--radius-sm",
      md: "elz-btn--radius-md",
      lg: "elz-btn--radius-lg",
      full: "elz-btn--radius-full",
    },
    isIconOnly: {
      true: "elz-btn--icon-only",
      false: "",
    }
  },
  defaultVariants: {
    variant: "solid",
    color: "default",
    size: "md",
    radius: "md",
    isIconOnly: "false",
  },
});
