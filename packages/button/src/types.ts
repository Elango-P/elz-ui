import * as React from "react";

export type ButtonVariant = "solid" | "outlined" | "ghost" | "soft" | "link";
export type ButtonSize = "sm" | "md" | "lg" | "icon";
export type ButtonColor = "primary" | "secondary" | "success" | "warning" | "danger" | "default";
export type ButtonRadius = "none" | "sm" | "md" | "lg" | "full";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  radius?: ButtonRadius;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}
