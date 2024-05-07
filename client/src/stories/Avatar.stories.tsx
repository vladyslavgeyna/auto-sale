import { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";

type Story = StoryObj<typeof Avatar>;

export default {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Avatar>;

const Template = ({ src, ...args }: Story["args"] & { src?: string }) => (
  <div>
    <Avatar {...args}>
      <AvatarImage src={src ?? "/default_avatar.svg"} alt="User avatar" />
      <AvatarFallback>UA</AvatarFallback>
    </Avatar>
  </div>
);

export const Default: Story = {
  render: (args) => <Template {...args} src="/default_avatar.svg" />,
};

export const Fallback: Story = {
  render: (args) => <Template {...args} src="/default_avatar1.svg" />,
};
