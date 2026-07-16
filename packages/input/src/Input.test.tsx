import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./index";
import React from "react";

describe("Input component", () => {
  it("renders correctly", () => {
    render(<Input placeholder="Test input" />);
    expect(screen.getByPlaceholderText("Test input")).toBeInTheDocument();
  });

  it("handles controlled value", async () => {
    const handleChange = vi.fn();
    const { rerender } = render(<Input value="initial" onChange={handleChange} />);
    
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("initial");

    rerender(<Input value="updated" onChange={handleChange} />);
    expect(input).toHaveValue("updated");
  });

  it("handles uncontrolled default value", () => {
    render(<Input defaultValue="initial" />);
    expect(screen.getByRole("textbox")).toHaveValue("initial");
  });

  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole("textbox");
    await user.type(input, "test");
    
    expect(handleChange).toHaveBeenCalledTimes(4);
    expect(input).toHaveValue("test");
  });

  it("renders with error state", () => {
    render(<Input error="This is an error" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("This is an error");
  });

  it("renders label and helper text", () => {
    render(<Input label="Username" helperText="Enter your username" />);
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Enter your username")).toBeInTheDocument();
  });

  it("can be cleared", async () => {
    const user = userEvent.setup();
    const handleClear = vi.fn();
    render(<Input defaultValue="test" clearable onClear={handleClear} />);
    
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("test");

    const clearButton = screen.getByRole("button", { name: "Clear input" });
    await user.click(clearButton);

    expect(handleClear).toHaveBeenCalled();
    expect(input).toHaveValue("");
  });

  it("toggles password visibility", async () => {
    const user = userEvent.setup();
    render(<Input type="password" defaultValue="secret" showPasswordToggle />);
    
    // role is not 'textbox' for password, need to query differently
    const input = screen.getByDisplayValue("secret");
    expect(input).toHaveAttribute("type", "password");

    const toggleButton = screen.getByRole("button", { name: "Show password" });
    await user.click(toggleButton);

    expect(input).toHaveAttribute("type", "text");
    
    await user.click(toggleButton);
    expect(input).toHaveAttribute("type", "password");
  });

  it("is disabled", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input disabled onChange={handleChange} />);
    
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();

    await user.type(input, "test");
    expect(handleChange).not.toHaveBeenCalled();
    expect(input).toHaveValue("");
  });

  it("is readonly", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input readOnly onChange={handleChange} />);
    
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("readonly");

    await user.type(input, "test");
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("shows character counter", async () => {
    const user = userEvent.setup();
    render(<Input maxLength={10} characterCounter />);
    
    expect(screen.getByText("0/10")).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    await user.type(input, "test");

    expect(screen.getByText("4/10")).toBeInTheDocument();
  });
});
