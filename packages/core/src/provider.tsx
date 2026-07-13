import * as React from "react";

export type ElzProviderProps = {
  children: React.ReactNode;
  className?: string;
};

/** Root wrapper that applies Elz CSS variable scope. */
export function ElzProvider({ children, className }: ElzProviderProps) {
  return <div className={className ? `elz-root ${className}` : "elz-root"}>{children}</div>;
}
