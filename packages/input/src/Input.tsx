import * as React from "react";
import { cn, useId, useControllableState, useEventCallback, useMergedRefs, useDebounce } from "@elz-ui/core";
import { InputProvider } from "./context";
import { inputVariants } from "./styles";
import type { InputProps } from "./types";
import { InputLabel } from "./InputLabel";
import { InputHelper } from "./InputHelper";
import { InputError } from "./InputError";
import { InputPrefix } from "./InputPrefix";
import { InputSuffix } from "./InputSuffix";
import { PasswordToggle } from "./PasswordToggle";
import { ClearButton } from "./ClearButton";
import { CopyButton } from "./CopyButton";
import { CharacterCounter } from "./CharacterCounter";

export interface InputHandle extends HTMLInputElement {
  clear: () => void;
}

export const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id: idProp,
      value: valueProp,
      defaultValue,
      onValueChange,
      onChange,
      onClear,
      type = "text",
      label,
      helperText,
      error,
      success,
      warning,
      description,
      size = "md",
      variant = "outlined",
      radius = "md",
      color = "primary",
      leftIcon,
      rightIcon,
      prefix,
      suffix,
      startContent,
      endContent,
      loading,
      clearable,
      copyable,
      showPasswordToggle,
      floatingLabel,
      characterCounter,
      fullWidth = true,
      debounce,
      disabled,
      readOnly,
      required,
      maxLength,
      className,
      containerClassName,
      labelClassName,
      helperClassName,
      errorClassName,
      inputClassName,
      wrapperClassName,
      ...props
    },
    ref
  ) => {
    const id = useId(idProp);
    const innerRef = React.useRef<HTMLInputElement>(null);
    
    // Attach clear method to the element directly for imperative use
    const mergedRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        if (node) {
          (node as InputHandle).clear = handleClear;
        }
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        innerRef.current = node;
      },
      [ref] // handleClear is not a dependency to avoid ref updates
    );

    const [value = "", setValue] = useControllableState({
      prop: valueProp !== undefined ? String(valueProp) : undefined,
      defaultProp: defaultValue !== undefined ? String(defaultValue) : undefined,
      onChange: onValueChange,
    });

    const [isFocused, setIsFocused] = React.useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const handleClear = useEventCallback(() => {
      if (disabled || readOnly) return;
      setValue("");
      onClear?.();
      // Dispatch event for standard onChange handlers
      if (innerRef.current) {
        innerRef.current.value = "";
        const event = new Event("input", { bubbles: true });
        innerRef.current.dispatchEvent(event);
        const changeEvent = new Event("change", { bubbles: true });
        innerRef.current.dispatchEvent(changeEvent);
        innerRef.current.focus();
      }
    });

    // Update clear ref method when handleClear changes
    React.useEffect(() => {
      if (innerRef.current) {
        (innerRef.current as InputHandle).clear = handleClear;
      }
    }, [handleClear]);

    const debouncedValue = useDebounce(value, debounce || 0);
    const isMounted = React.useRef(false);

    React.useEffect(() => {
      if (!isMounted.current) {
        isMounted.current = true;
        return;
      }
      if (debounce !== undefined && debounce > 0) {
        props.onDebouncedValueChange?.(debouncedValue);
      }
    }, [debouncedValue, debounce, props.onDebouncedValueChange]);

    // Call onChange normal
    const handleChange = useEventCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange?.(e);
    });

    const handleFocus = useEventCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    });

    const handleBlur = useEventCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    });

    const togglePassword = React.useCallback(() => {
      setIsPasswordVisible((prev) => !prev);
    }, []);

    const actualType = type === "password" ? (isPasswordVisible ? "text" : "password") : type;
    const hasError = !!error || props["aria-invalid"] === true;
    const isFloating = floatingLabel && !!label;

    return (
      <InputProvider
        value={{
          id,
          size,
          disabled: disabled || false,
          required: required || false,
          readOnly: readOnly || false,
          isFocused,
          hasError,
          valueLength: value.length,
          maxLength,
        }}
      >
        <div className={cn("flex flex-col relative", fullWidth ? "w-full" : "w-auto", containerClassName)}>
          {!isFloating && label && (
            <InputLabel className={labelClassName}>{label}</InputLabel>
          )}

          <div
            className={cn(
              "relative flex items-center w-full transition-shadow duration-200",
              inputVariants({ variant, size, radius, color, hasError: hasError ? "true" : "false" }),
              readOnly && !disabled && "bg-gray-50 dark:bg-gray-800/50 cursor-text",
              wrapperClassName
            )}
            onClick={() => innerRef.current?.focus()}
          >
            {startContent && <div className="flex-shrink-0 pl-3">{startContent}</div>}
            {leftIcon && <div className="flex-shrink-0 pl-3 text-gray-400">{leftIcon}</div>}
            {prefix && <InputPrefix>{prefix}</InputPrefix>}

            {isFloating && label && (
              <InputLabel floating className={labelClassName}>
                {label}
              </InputLabel>
            )}

            <input
              ref={mergedRef}
              id={id}
              type={actualType}
              value={value}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              maxLength={maxLength}
              aria-invalid={hasError}
              aria-describedby={
                cn(
                  error ? `${id}-error` : "",
                  helperText || description ? `${id}-helper` : ""
                ) || undefined
              }
              className={cn(
                "flex-1 w-full h-full bg-transparent border-none outline-none ring-0 p-0 placeholder-gray-400 disabled:cursor-not-allowed peer text-gray-900 dark:text-gray-100",
                !startContent && !leftIcon && !prefix && "pl-3", // Fallback padding
                !endContent && !rightIcon && !suffix && !clearable && !copyable && type !== "password" && !loading && "pr-3",
                isFloating && "placeholder-transparent",
                inputClassName
              )}
              {...props}
            />

            {loading && (
              <div className="flex-shrink-0 pr-3">
                <svg
                  className="animate-spin h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
            
            {!loading && clearable && value.length > 0 && !disabled && !readOnly && (
              <ClearButton onClear={handleClear} />
            )}

            {!loading && copyable && value.length > 0 && (
              <CopyButton valueToCopy={value} />
            )}

            {!loading && type === "password" && showPasswordToggle && !disabled && (
              <PasswordToggle isVisible={isPasswordVisible} onToggle={togglePassword} />
            )}

            {suffix && <InputSuffix>{suffix}</InputSuffix>}
            {rightIcon && <div className="flex-shrink-0 pr-3 text-gray-400">{rightIcon}</div>}
            {endContent && <div className="flex-shrink-0 pr-3">{endContent}</div>}
          </div>

          <div className="flex justify-between mt-1.5 items-start">
            <div className="flex flex-col gap-1">
              {(helperText || description) && (
                <InputHelper className={helperClassName}>
                  {helperText || description}
                </InputHelper>
              )}
              {error && <InputError className={errorClassName}>{error}</InputError>}
              {success && (
                <p className="text-sm text-green-500 font-medium">{success}</p>
              )}
              {warning && (
                <p className="text-sm text-yellow-500 font-medium">{warning}</p>
              )}
            </div>

            {characterCounter && maxLength && (
              <CharacterCounter />
            )}
          </div>
        </div>
      </InputProvider>
    );
  }
);

InputComponent.displayName = "Input";
