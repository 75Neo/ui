import { Button } from "@75neo/vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
  title: "Components/Button",
  component: Button,
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: "<Button v-bind='args'>Button</Button>",
  }),
  argTypes: {
    variant: { control: "select", options: ["solid", "outline", "ghost", "danger"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {};
export const Outline: Story = { args: { variant: "outline" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Danger: Story = { args: { variant: "danger" } };
export const Large: Story = { args: { size: "lg" } };
