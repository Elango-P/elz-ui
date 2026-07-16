import * as React from "react";

type PossibleRef<T> = React.Ref<T> | undefined;

export function assignRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== undefined && "current" in ref) {
    (ref as React.MutableRefObject<T>).current = value;
  }
}

export function useMergedRefs<T>(...refs: PossibleRef<T>[]) {
  return React.useCallback((node: T) => {
    refs.forEach((ref) => assignRef(ref, node));
  }, refs); // eslint-disable-line react-hooks/exhaustive-deps
}
