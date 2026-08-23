import { Button, NeoUIProvider, type ThemeConfig } from "@75neo/vue";
import { ArrowRightIcon, PlusIcon, SearchIcon } from "@lucide/vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

const VARIANTS = ["solid", "outline", "soft", "subtle", "ghost", "link"] as const;
const COLORS = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const;
const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;

const row = "flex flex-wrap items-center gap-3";
const grid = "grid gap-3";
const legend = "text-xs font-medium uppercase tracking-wide text-muted";

const meta = {
  title: "Components/Button",
  component: Button,
  args: { label: "Button" },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: "<Button v-bind='args' />",
  }),
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    color: { control: "select", options: COLORS },
    size: { control: "select", options: SIZES },
    block: { control: "boolean" },
    square: { control: "boolean" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** The emphasis ladder, at a single colour. */
export const Variants: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args, VARIANTS, row }),
    template: `<div :class="row">
      <Button v-for="v in VARIANTS" :key="v" v-bind="args" :variant="v" :label="v" />
    </div>`,
  }),
};

/**
 * Shape and colour are independent — every row below is the same six variants. Only
 * `neutral` is spelled out in the theme; the other six re-point one custom property.
 */
export const Colors: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args, VARIANTS, COLORS, row, grid, legend }),
    template: `<div :class="grid">
      <div v-for="c in COLORS" :key="c" :class="grid">
        <span :class="legend">{{ c }}</span>
        <div :class="row">
          <Button v-for="v in VARIANTS" :key="v" v-bind="args" :variant="v" :color="c" :label="v" />
        </div>
      </div>
    </div>`,
  }),
};

/** Padding-driven, so a button grows with its own text rather than a fixed height. */
export const Sizes: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args, SIZES, row }),
    template: `<div :class="row">
      <Button v-for="s in SIZES" :key="s" v-bind="args" :size="s" :label="s" />
    </div>`,
  }),
};

/** `icon` leads by default; `trailing` moves it, and the two sided props are absolute. */
export const Icons: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args, row, PlusIcon, ArrowRightIcon, SearchIcon }),
    template: `<div :class="row">
      <Button v-bind="args" :icon="PlusIcon" label="Add item" />
      <Button v-bind="args" :icon="ArrowRightIcon" trailing label="Continue" />
      <Button v-bind="args" :leading-icon="SearchIcon" :trailing-icon="ArrowRightIcon" label="Search" />
    </div>`,
  }),
};

/** No label and no default slot makes the button square, without `square` being passed. */
export const IconOnly: Story = {
  args: { label: undefined },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args, SIZES, row, PlusIcon }),
    template: `<div :class="row">
      <Button v-for="s in SIZES" :key="s" v-bind="args" :size="s" :icon="PlusIcon" :aria-label="'Add (' + s + ')'" />
    </div>`,
  }),
};

/** The spinner replaces whichever icon is showing, and the button disables itself. */
export const Loading: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args, row, ArrowRightIcon }),
    template: `<div :class="row">
      <Button v-bind="args" loading label="Saving" />
      <Button v-bind="args" loading trailing :icon="ArrowRightIcon" label="Saving" />
      <Button v-bind="args" loading aria-label="Saving" />
    </div>`,
  }),
};

/** Full width, with the trailing icon pushed to the far edge so the button reads as a row. */
export const Block: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args, VARIANTS, ArrowRightIcon }),
    template: `<div class="grid max-w-sm gap-3">
      <Button v-for="v in VARIANTS" :key="v" v-bind="args" block :variant="v" :label="v" :trailing-icon="ArrowRightIcon" />
    </div>`,
  }),
};

export const Disabled: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args, VARIANTS, row }),
    template: `<div :class="row">
      <Button v-for="v in VARIANTS" :key="v" v-bind="args" :variant="v" :label="v" disabled />
    </div>`,
  }),
};

/**
 * `class` is merged by `tailwind-merge`, not appended: `rounded-full` replaces the
 * theme's `rounded-md` and `px-8` replaces the size variant's `px-2.5`, with no
 * `!important` and no knowledge of what the theme picked.
 */
export const OverridingClasses: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args, row }),
    template: `<div :class="row">
      <Button v-bind="args" label="default" />
      <Button v-bind="args" class="rounded-full px-8" label="rounded-full px-8" />
      <Button v-bind="args" :ui="{ label: 'uppercase tracking-widest' }" label="via ui" />
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
    defaultVariants: { color: "neutral" },
  },
};

export const ThemedApp: Story = {
  render: (args) => ({
    components: { Button, NeoUIProvider },
    setup: () => ({ args, VARIANTS, row, pillTheme }),
    template: `<NeoUIProvider :theme="pillTheme">
      <div :class="row">
        <Button v-for="v in VARIANTS" :key="v" v-bind="args" :variant="v" :label="v" />
      </div>
    </NeoUIProvider>`,
  }),
};
