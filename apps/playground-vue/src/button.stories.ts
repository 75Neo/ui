import { css } from "@75neo/styles/css";
import { Button } from "@75neo/vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

const VARIANTS = ["solid", "subtle", "outline", "ghost", "link"] as const;
const PALETTES = ["accent", "neutral", "success", "warning", "danger", "info"] as const;
const SIZES = ["xs", "sm", "md", "lg"] as const;

const row = css({ display: "flex", gap: "3", alignItems: "center", flexWrap: "wrap" });
const grid = css({ display: "grid", gap: "3" });
const legend = css({ textStyle: "label.sm", color: "fg.muted", textTransform: "uppercase" });

const meta = {
  title: "Components/Button",
  component: Button,
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: "<Button v-bind='args'>Button</Button>",
  }),
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    colorPalette: { control: "select", options: PALETTES },
    size: { control: "select", options: SIZES },
    fullWidth: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** The emphasis ladder, at a single intent. */
export const Variants: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args, VARIANTS, row }),
    template: `<div :class="row">
      <Button v-for="v in VARIANTS" :key="v" v-bind="args" :variant="v">{{ v }}</Button>
    </div>`,
  }),
};

/** Shape and intent are independent — every row below is the same five variants. */
export const Intents: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args, VARIANTS, PALETTES, row, grid, legend }),
    template: `<div :class="grid">
      <div v-for="p in PALETTES" :key="p" :class="grid">
        <span :class="legend">{{ p }}</span>
        <div :class="row">
          <Button v-for="v in VARIANTS" :key="v" v-bind="args" :variant="v" :colorPalette="p">
            {{ v }}
          </Button>
        </div>
      </div>
    </div>`,
  }),
};

export const Sizes: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args, SIZES, row }),
    template: `<div :class="row">
      <Button v-for="s in SIZES" :key="s" v-bind="args" :size="s">{{ s }}</Button>
    </div>`,
  }),
};

export const Disabled: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args, VARIANTS, row }),
    template: `<div :class="row">
      <Button v-for="v in VARIANTS" :key="v" v-bind="args" :variant="v" disabled>{{ v }}</Button>
    </div>`,
  }),
};

export const FullWidth: Story = { args: { fullWidth: true } };
