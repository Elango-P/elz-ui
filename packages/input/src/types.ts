import * as React from "react";

export type InputSize = "xs" | "sm" | "md" | "lg" | "xl";
export type InputVariant = "filled" | "outlined" | "ghost" | "soft" | "underlined" | "flat";
export type InputRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type InputColor = "primary" | "secondary" | "success" | "warning" | "danger" | "info";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  success?: React.ReactNode;
  warning?: React.ReactNode;
  description?: React.ReactNode;

  size?: InputSize;
  variant?: InputVariant;
  radius?: InputRadius;
  color?: InputColor;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;

  loading?: boolean;
  clearable?: boolean;
  copyable?: boolean;
  showPasswordToggle?: boolean;
  floatingLabel?: boolean;
  characterCounter?: boolean;
  fullWidth?: boolean;
  debounce?: number;

  onValueChange?: (value: string) => void;
  onDebouncedValueChange?: (value: string) => void;
  onClear?: () => void;

  containerClassName?: string;
  labelClassName?: string;
  helperClassName?: string;
  errorClassName?: string;
  inputClassName?: string;
  wrapperClassName?: string;
}
