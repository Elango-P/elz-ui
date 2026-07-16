import * as React from "react";

export function useId(deterministicId?: string): string {
  const reactId = React.useId();
  return deterministicId || reactId;
}
