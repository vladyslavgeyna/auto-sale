import { Meta, StoryObj } from "@storybook/react";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";

type Story = StoryObj<typeof Input>;

export default {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Input>;

const Template = ({ ...args }: Story["args"]) => (
  <div>
    <Label>Here is input</Label>
    <Input {...args} />
  </div>
);

export const Default: Story = {
  render: (args) => <Template {...args} />,
};

export const Password: Story = {
  render: (args) => <Template {...args} />,

  args: {
    type: "password",
  },
};

export const Date: Story = {
  render: (args) => <Template {...args} />,

  args: {
    type: "date",
  },
};

export const Radio: Story = {
  render: (args) => <Template {...args} className="h-[20px] w-[20px]" />,

  args: {
    type: "radio",
  },
};

export const Checkbox: Story = {
  render: (args) => <Template {...args} className="h-[20px] w-[20px]" />,

  args: {
    type: "checkbox",
  },
};
