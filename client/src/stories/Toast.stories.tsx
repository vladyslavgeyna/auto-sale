import { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/ui/Button";
import { Toaster } from "../components/ui/Toaster";
import { useToast } from "../components/ui/useToast";
import { useSuccessToast } from "../hooks/useSuccessToast";

type Story = StoryObj<typeof Button>;

export default {
  title: "Components/Toast",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

const Root = ({ children }: { children: React.ReactNode }) => (
  <div>
    {children}
    <Toaster />
  </div>
);

const DefaultTemplate = ({ ...args }: Story["args"]) => {
  const { toast } = useToast();

  return (
    <Root>
      <Button
        {...args}
        onClick={() => {
          toast({
            title: "Default Toast",
          });
        }}
      >
        Show Toast
      </Button>
    </Root>
  );
};

const SuccessTemplate = ({ ...args }: Story["args"]) => {
  const { successToast } = useSuccessToast();

  return (
    <Root>
      <Button
        {...args}
        onClick={() => {
          successToast("Success Toast");
        }}
      >
        Show Toast
      </Button>
    </Root>
  );
};

const ErrorTemplate = ({ ...args }: Story["args"]) => {
  const { toast } = useToast();

  return (
    <Root>
      <Button
        {...args}
        onClick={() => {
          toast({
            title: "Error Toast",
            variant: "destructive",
          });
        }}
      >
        Show Toast
      </Button>
    </Root>
  );
};

export const Default: Story = {
  render: (args) => <DefaultTemplate {...args} />,
};

export const SuccessToast: Story = {
  render: (args) => <SuccessTemplate {...args} />,
};

export const ErrorToast: Story = {
  render: (args) => <ErrorTemplate {...args} />,
};
