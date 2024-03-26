import { Meta, StoryObj } from "@storybook/react";
import Title from "../components/ui/Title";

type Story = StoryObj<typeof Title>;

export default {
  title: "Components/Title",
  component: Title,

  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Title>;

const Template = ({ ...args }: Story["args"]) => (
  <Title {...args}>This is a title</Title>
);

export const Default: Story = {
  render: (args) => <Template {...args} />,
};
