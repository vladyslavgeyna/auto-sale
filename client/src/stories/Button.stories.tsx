import { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/ui/Button";

type Story = StoryObj<typeof Button>;

export default {
  title: "Components/Button",
  component: Button,

  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

const Template = ({ ...args }: Story["args"]) => (
  <Button {...args}>This is button</Button>
);

export const Default: Story = {
  render: (args) => <Template {...args} />,
};

export const Secondary: Story = {
  render: (args) => <Template {...args} />,

  args: {
    variant: "secondary",
  },
};

export const Outline: Story = {
  render: (args) => <Template {...args} />,

  args: {
    variant: "outline",
  },
};

export const Ghost: Story = {
  render: (args) => <Template {...args} />,

  args: {
    variant: "ghost",
  },
};
