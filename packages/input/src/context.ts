import * as React from "react";
import type { InputProps } from "./types";

interface InputContextValue
  extends Pick<InputProps, "size" | "disabled" | "required" | "readOnly"> {
  id: string;
  isFocused: boolean;
  hasError: boolean;
  valueLength: number;
  maxLength?: number;
}

const InputContext = React.createContext<InputContextValue | undefined>(undefined);

export function InputProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: InputContextValue;
}) {
  return React.createElement(InputContext.Provider, { value }, children);
}

export function useInputContext() {
  const context = React.useContext(InputContext);
  if (!context) {
    throw new Error("Input compound components cannot be rendered outside the Input component");
  }
  return context;
}
