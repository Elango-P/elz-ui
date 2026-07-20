import type * as React from "react";

type Style = React.CSSProperties | undefined;

function hasClassName(className: unknown): boolean {
  if (typeof className === "string") return className.trim().length > 0;
  if (Array.isArray(className)) return className.some(hasClassName);
  return Boolean(className);
}

/**
 * Resolve surface styles with className-first priority.
 * - When `className` is set (Tailwind/Bootstrap), return consumer `style` only so classes can win.
 * - Otherwise merge package `defaults` with consumer `style`.
 */
export function resolveSurfaceStyle(
  className: unknown,
  style?: Style,
  defaults?: React.CSSProperties,
): React.CSSProperties | undefined {
  if (hasClassName(className)) {
    return style;
  }
  if (!defaults && !style) return undefined;
  return { ...defaults, ...style };
}
