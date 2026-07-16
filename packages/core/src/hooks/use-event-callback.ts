import * as React from "react";

export function useEventCallback<Args extends unknown[], Return>(
  fn?: (...args: Args) => Return
): (...args: Args) => Return {
  const ref = React.useRef(fn);
  
  // React 19 uses useLayoutEffect synchronously on client, no issue.
  React.useLayoutEffect(() => {
    ref.current = fn;
  });

  return React.useCallback(
    (...args: Args) => ref.current?.(...args) as Return,
    []
  );
}
