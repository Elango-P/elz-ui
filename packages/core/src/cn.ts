import { clsx, type ClassValue } from "clsx";

/** Merge class names. Consumers can wrap with tailwind-merge if desired. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
