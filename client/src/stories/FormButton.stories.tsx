import { Meta, StoryObj } from "@storybook/react";
import FormButton from "../components/form-button/FormButton";

type Story = StoryObj<typeof FormButton>;

export default {
  title: "Components/FormButton",
  component: FormButton,

  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof FormButton>;

const Template = ({ ...args }: Story["args"]) => (
  <FormButton className="w-[300px]" {...args}>
    Submit
  </FormButton>
);

export const Default: Story = {
  render: (args) => <Template {...args} />,
};

export const Loading: Story = {
  render: (args) => <Template {...args} />,

  args: {
    isLoading: true,
  },
};

export const Disables: Story = {
  render: (args) => <Template {...args} />,

  args: {
    isDisabled: true,
  },
};
