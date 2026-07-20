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
      style,
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
        <div className={cn("elz-input-container", fullWidth ? "elz-input-container--full-width" : "elz-input-container--auto-width", containerClassName)}>
          {!isFloating && label && (
            <InputLabel className={labelClassName}>{label}</InputLabel>
          )}

          <div
            className={cn(
              "elz-input-wrapper",
              inputVariants({ variant, size, radius, color, hasError: hasError ? "true" : "false" }),
              readOnly && !disabled && "elz-input--readonly",
              wrapperClassName
            )}
            onClick={() => innerRef.current?.focus()}
          >
            {startContent && <div className="elz-input-icon elz-input-icon--left">{startContent}</div>}
            {leftIcon && <div className="elz-input-icon elz-input-icon--left">{leftIcon}</div>}
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
                "elz-input-field",
                !startContent && !leftIcon && !prefix && "elz-input-field--no-left",
                !endContent && !rightIcon && !suffix && !clearable && !copyable && type !== "password" && !loading && "elz-input-field--no-right",
                inputClassName
              )}
              {...props}
              style={style}
            />

            {loading && (
              <div className="elz-input-icon elz-input-icon--right">
                <svg
                  style={{ animation: 'spin 1s linear infinite', height: '1rem', width: '1rem', color: '#a0aec0' }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
            {rightIcon && <div className="elz-input-icon elz-input-icon--right">{rightIcon}</div>}
            {endContent && <div className="elz-input-icon elz-input-icon--right">{endContent}</div>}
          </div>

          <div className="elz-input-footer">
            <div className="elz-input-messages">
              {(helperText || description) && (
                <InputHelper className={helperClassName}>
                  {helperText || description}
                </InputHelper>
              )}
              {error && <InputError className={errorClassName}>{error}</InputError>}
              {success && (
                <p className="elz-input-success">{success}</p>
              )}
              {warning && (
                <p className="elz-input-warning">{warning}</p>
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
