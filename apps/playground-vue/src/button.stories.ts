import { Button, NeoUIProvider, type ThemeConfig } from "@75neo/vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

const VARIANTS = ["solid", "subtle", "outline", "ghost", "link"] as const;
const PALETTES = ["accent", "neutral", "success", "warning", "danger", "info"] as const;
const SIZES = ["xs", "sm", "md", "lg"] as const;

const row = "flex flex-wrap items-center gap-3";
const grid = "grid gap-3";
const legend = "text-xs font-medium uppercase tracking-wide text-fg-muted";

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

/**
 * `class` is merged by `tailwind-merge`, not appended: `rounded-full` replaces the size
 * variant's `rounded-md` and `px-8` replaces its `px-4`, with no `!important` and no
 * knowledge of what the theme picked.
 */
export const OverridingClasses: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args, row }),
    template: `<div :class="row">
      <Button v-bind="args">default</Button>
      <Button v-bind="args" class="rounded-full px-8">rounded-full px-8</Button>
      <Button v-bind="args" :ui="{ base: 'uppercase tracking-widest' }">via ui</Button>
    </div>`,
  }),
};

/**
 * The same override applied to every button at once. The plugin or `<NeoUIProvider>`
 * merges a `ThemeConfig` into the built-in themes, so a whole app can be re-shaped
 * without touching a call site.
 */
const pillTheme: ThemeConfig = {
  button: {
    slots: { base: "rounded-full" },
    defaultVariants: { colorPalette: "neutral" },
  },
};

export const ThemedApp: Story = {
  render: (args) => ({
    components: { Button, NeoUIProvider },
    setup: () => ({ args, VARIANTS, row, pillTheme }),
    template: `<NeoUIProvider :theme="pillTheme">
      <div :class="row">
        <Button v-for="v in VARIANTS" :key="v" v-bind="args" :variant="v">{{ v }}</Button>
      </div>
    </NeoUIProvider>`,
  }),
};
