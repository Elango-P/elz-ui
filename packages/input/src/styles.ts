import { createVariants } from "@elz-ui/core";

export const inputVariants = createVariants({
  base: "flex w-full min-w-0 outline-none transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    variant: {
      filled: "bg-gray-100 dark:bg-gray-800 border border-transparent focus:bg-white dark:focus:bg-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
      outlined: "bg-transparent border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
      ghost: "bg-transparent border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-500/20",
      soft: "bg-blue-50 dark:bg-blue-900/20 border-transparent text-blue-900 dark:text-blue-100 focus:bg-blue-100 dark:focus:bg-blue-900/40 focus:ring-2 focus:ring-blue-500/20",
      underlined: "bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 rounded-none px-0 focus:border-blue-500 focus:ring-0",
      flat: "bg-gray-100 dark:bg-gray-800 border-transparent",
    },
    size: {
      xs: "h-7 px-2 text-xs",
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-4 text-base",
      xl: "h-14 px-5 text-lg",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
    color: {
      primary: "",
      secondary: "",
      success: "",
      warning: "",
      danger: "",
      info: "",
    },
    hasError: {
      true: "!border-red-500 focus:!ring-red-500/20",
      false: "",
    },
  },
  compoundVariants: [
    { variant: "filled", color: "primary", class: "focus:border-blue-500 focus:ring-blue-500/20" },
    { variant: "outlined", color: "primary", class: "focus:border-blue-500 focus:ring-blue-500/20" },
    
    { variant: "filled", color: "success", class: "focus:border-green-500 focus:ring-green-500/20" },
    { variant: "outlined", color: "success", class: "focus:border-green-500 focus:ring-green-500/20" },
    { variant: "soft", color: "success", class: "bg-green-50 text-green-900 focus:bg-green-100 focus:ring-green-500/20" },
    
    { variant: "filled", color: "warning", class: "focus:border-yellow-500 focus:ring-yellow-500/20" },
    { variant: "outlined", color: "warning", class: "focus:border-yellow-500 focus:ring-yellow-500/20" },
    { variant: "soft", color: "warning", class: "bg-yellow-50 text-yellow-900 focus:bg-yellow-100 focus:ring-yellow-500/20" },
    
    { variant: "filled", color: "danger", class: "focus:border-red-500 focus:ring-red-500/20" },
    { variant: "outlined", color: "danger", class: "focus:border-red-500 focus:ring-red-500/20" },
    { variant: "soft", color: "danger", class: "bg-red-50 text-red-900 focus:bg-red-100 focus:ring-red-500/20" },
  ],
  defaultVariants: {
    variant: "outlined",
    size: "md",
    radius: "md",
    color: "primary",
    hasError: "false",
  },
});
