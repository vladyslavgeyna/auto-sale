import { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/Tooltip";

type Story = StoryObj<typeof Tooltip>;

const Root = ({ children }: { children: React.ReactNode }) => (
  <TooltipProvider>{children}</TooltipProvider>
);

export default {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Tooltip>;

const Template = ({ ...args }: Story["args"]) => (
  <Root>
    <Tooltip {...args} delayDuration={0}>
      <TooltipTrigger>Hover</TooltipTrigger>
      <TooltipContent>
        <p>Here is tooltip content</p>
      </TooltipContent>
    </Tooltip>
  </Root>
);

export const Default: Story = {
  render: (args) => <Template {...args} />,
};
