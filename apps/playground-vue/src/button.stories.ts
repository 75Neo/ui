import preview from "../.storybook/preview";
import { Button } from "@75neo/vue";

const meta = preview.meta({
  title: "Button",
  component: Button,
  render: (args) => ({
    components: { Button },
    setup() {
      return args;
    },
    template: `
      <Button>
        Button
      </Button>
    `,
  }),
});

export const Solid = meta.story({
  args: {
    variant: "solid",
  },
});

export const Soft = meta.story({
  args: {
    variant: "soft",
  },
});

export const Outline = meta.story({
  args: {
    variant: "outline",
  },
});

export const Text = meta.story({
  args: {
    variant: "text",
  },
});
