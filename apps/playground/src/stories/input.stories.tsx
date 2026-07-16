import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@elz-ui/input";
import React from "react";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "outlined", "ghost", "soft", "underlined", "flat"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "danger", "info"],
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Basic: Story = {
  args: {
    placeholder: "Enter your email",
    label: "Email",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    label: "Disabled",
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    value: "Readonly value (selectable)",
    label: "Readonly",
    readOnly: true,
  },
};

export const Loading: Story = {
  args: {
    placeholder: "Loading...",
    label: "Loading",
    loading: true,
  },
};

export const ErrorState: Story = {
  args: {
    placeholder: "john@example.com",
    label: "Email",
    defaultValue: "invalid-email",
    error: "Please enter a valid email address.",
  },
};

export const SuccessState: Story = {
  args: {
    placeholder: "Username",
    label: "Username",
    defaultValue: "johndoe",
    success: "Username is available!",
  },
};

export const WarningState: Story = {
  args: {
    placeholder: "Password",
    label: "Password",
    type: "password",
    defaultValue: "weak",
    warning: "Password is weak.",
  },
};

export const Password: Story = {
  args: {
    placeholder: "Enter password",
    label: "Password",
    type: "password",
    showPasswordToggle: true,
  },
};

export const Clearable: Story = {
  args: {
    placeholder: "Type to clear...",
    label: "Clearable Input",
    clearable: true,
    defaultValue: "Clear me",
  },
};

export const Copyable: Story = {
  args: {
    placeholder: "API Key",
    label: "API Key",
    copyable: true,
    defaultValue: "sk_test_123456789",
  },
};

export const PrefixAndSuffix: Story = {
  args: {
    placeholder: "Amount",
    label: "Donation Amount",
    prefix: "$",
    suffix: ".00",
  },
};

export const FloatingLabel: Story = {
  args: {
    label: "Floating Label",
    placeholder: "Floating Label",
    floatingLabel: true,
  },
};

export const CharacterCounter: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself",
    maxLength: 50,
    characterCounter: true,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Input label="Outlined" variant="outlined" placeholder="Outlined variant" />
      <Input label="Filled" variant="filled" placeholder="Filled variant" />
      <Input label="Soft" variant="soft" placeholder="Soft variant" />
      <Input label="Ghost" variant="ghost" placeholder="Ghost variant" />
      <Input label="Underlined" variant="underlined" placeholder="Underlined variant" />
      <Input label="Flat" variant="flat" placeholder="Flat variant" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md items-start">
      <Input size="xs" placeholder="Extra Small" />
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
      <Input size="xl" placeholder="Extra Large" />
    </div>
  ),
};

export const Search: Story = {
  render: () => {
    const [debouncedSearch, setDebouncedSearch] = React.useState("");
    const [immediateSearch, setImmediateSearch] = React.useState("");

    return (
      <div className="flex flex-col gap-6 max-w-md">
        <div>
          <Input 
            type="search" 
            label="Instant Search" 
            placeholder="Search instantly..."
            clearable
            onValueChange={setImmediateSearch}
          />
          <p className="text-sm mt-2 text-gray-500">Searching for: <strong>{immediateSearch}</strong></p>
        </div>
        <div>
          <Input 
            type="search" 
            label="Debounced Search (500ms)" 
            placeholder="Type to search..."
            clearable
            debounce={500}
            onDebouncedValueChange={setDebouncedSearch}
          />
          <p className="text-sm mt-2 text-gray-500">Searching for: <strong>{debouncedSearch}</strong></p>
        </div>
      </div>
    );
  },
};

