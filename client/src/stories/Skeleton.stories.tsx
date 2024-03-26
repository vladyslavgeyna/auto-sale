import { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "../components/ui/Skeleton";

type Story = StoryObj<typeof Skeleton>;

export default {
  title: "Components/Skeleton",
  component: Skeleton,

  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Skeleton>;

const Template = ({ ...args }: Story["args"]) => (
  <Skeleton {...args} className="h-[40px] w-[300px]" />
);

export const Default: Story = {
  render: (args) => <Template {...args} />,
};
