import {
  Accordion,
  type AccordionItem,
  type AccordionProps,
  NeoUIProvider,
  type ThemeConfig,
} from "@75neo/vue";
import { LeafIcon, PlusIcon, ShapesIcon, SunMoonIcon } from "@lucide/vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

const VARIANTS = ["outline", "subtle", "elevated", "plain"] as const;
const PALETTES = ["accent", "neutral", "success", "warning", "danger", "info"] as const;
const SIZES = ["sm", "md", "lg"] as const;

const items: AccordionItem[] = [
  {
    value: "recipes",
    label: "Where does styling live?",
    icon: LeafIcon,
    content:
      "In one tailwind-variants theme under packages/styles. React, Vue and Svelte all render the class names it produces, so a variant is added once rather than three times.",
  },
  {
    value: "intents",
    label: "How are shape and intent kept apart?",
    icon: ShapesIcon,
    content:
      "Every intent palette fills the same eight roles, so a theme writes each shape once against the intent-* roles and gets all six intents for free.",
  },
  {
    value: "modes",
    label: "What happens in dark mode?",
    icon: SunMoonIcon,
    content:
      "Components style against semantic utilities such as bg-surface and text-fg-muted, which resolve per colour mode. Nothing inside a component ever branches on dark: itself.",
  },
];

const grid = "grid gap-6";
const row = "grid gap-2";
const frame = "max-w-lg";
const legend = "text-xs font-medium uppercase tracking-wide text-fg-muted";

/**
 * Ark's own root props (`multiple`, `defaultValue`, …) reach the component as attrs, so
 * they are spelled out here rather than inferred from the binding's declared props.
 */
type AccordionArgs = AccordionProps & {
  defaultValue?: string[];
  multiple?: boolean;
  collapsible?: boolean;
  disabled?: boolean;
};

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  args: { defaultValue: ["recipes"] },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    colorPalette: { control: "select", options: PALETTES },
    size: { control: "select", options: SIZES },
    multiple: { control: "boolean" },
    collapsible: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  render: (args) => ({
    components: { Accordion },
    setup: () => ({ args, items, frame }),
    template: `<div :class="frame">
      <Accordion v-bind="args" :items="items" />
    </div>`,
  }),
} satisfies Meta<AccordionArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** The four shapes. Only the chrome changes; the anatomy is identical. */
export const Variants: Story = {
  render: (args) => ({
    components: { Accordion },
    setup: () => ({ args, items, VARIANTS, grid, row, frame, legend }),
    template: `<div :class="[grid, frame]">
      <div v-for="v in VARIANTS" :key="v" :class="row">
        <span :class="legend">{{ v }}</span>
        <Accordion v-bind="args" :items="items" :variant="v" />
      </div>
    </div>`,
  }),
};

export const Sizes: Story = {
  render: (args) => ({
    components: { Accordion },
    setup: () => ({ args, items, SIZES, grid, row, frame, legend }),
    template: `<div :class="[grid, frame]">
      <div v-for="s in SIZES" :key="s" :class="row">
        <span :class="legend">{{ s }}</span>
        <Accordion v-bind="args" :items="items" :size="s" />
      </div>
    </div>`,
  }),
};

/** Shape and intent are independent — the expanded trigger and its icon carry it. */
export const Intents: Story = {
  render: (args) => ({
    components: { Accordion },
    setup: () => ({ args, items, PALETTES, grid, row, frame, legend }),
    template: `<div :class="[grid, frame]">
      <div v-for="p in PALETTES" :key="p" :class="row">
        <span :class="legend">{{ p }}</span>
        <Accordion v-bind="args" :items="items" :colorPalette="p" />
      </div>
    </div>`,
  }),
};

/** `multiple` lets several panels stay open; `collapsible` lets the last one close. */
export const Multiple: Story = {
  args: { multiple: true, collapsible: true, defaultValue: ["recipes", "intents"] },
};

/** Disabled on the accordion; `disabled` on one item disables just that row. */
export const Disabled: Story = { args: { disabled: true } };

export const DisabledItem: Story = {
  render: (args) => ({
    components: { Accordion },
    setup: () => ({
      args,
      frame,
      items: items.map((item, index) => ({ ...item, disabled: index === 1 })),
    }),
    template: `<div :class="frame">
      <Accordion v-bind="args" :items="items" />
    </div>`,
  }),
};

/** `trailingIcon` replaces the chevron; `ui.trailingIcon` retunes how it animates. */
export const TrailingIcon: Story = {
  render: (args) => ({
    components: { Accordion },
    setup: () => ({ args, items, frame, PlusIcon }),
    template: `<div :class="frame">
      <Accordion
        v-bind="args"
        :items="items"
        :trailing-icon="PlusIcon"
        :ui="{ trailingIcon: 'data-[state=open]:rotate-45' }"
      />
    </div>`,
  }),
};

/**
 * Every part a caller might want to replace is a named slot. `#leading`, `#default` and
 * `#trailing` are the trigger's three; `#body` is the panel's.
 */
export const Slots: Story = {
  render: (args) => ({
    components: { Accordion },
    setup: () => ({ args, items, frame }),
    template: `<div :class="frame">
      <Accordion v-bind="args" :items="items">
        <template #default="{ item, index }">
          <span class="tabular-nums text-fg-muted">{{ index + 1 }}.</span>
          {{ item.label }}
        </template>
        <template #body="{ item, open }">
          <p>{{ item.content }}</p>
          <p class="mt-2 text-2xs uppercase tracking-wide">{{ open ? "open" : "closed" }}</p>
        </template>
      </Accordion>
    </div>`,
  }),
};

/**
 * A row that names a `slot` gets its own pair on top of those: `#{slot}` replaces the
 * whole panel, `#{slot}-body` only what sits inside it. The rows that name none keep
 * rendering their `content`.
 */
export const PerItemSlots: Story = {
  render: (args) => ({
    components: { Accordion },
    setup: () => ({
      args,
      frame,
      items: items.map((item, index) => (index === 0 ? { ...item, slot: "styling" } : item)),
    }),
    template: `<div :class="frame">
      <Accordion v-bind="args" :items="items">
        <template #styling-body="{ item }">
          <p>{{ item.content }}</p>
          <code class="mt-2 block rounded bg-surface-subtle px-2 py-1 text-2xs">
            packages/styles/src/themes
          </code>
        </template>
      </Accordion>
    </div>`,
  }),
};

/**
 * `ui` reaches every slot of the theme, so one prop restyles triggers, icons and bodies
 * at once. An item's own `ui` is merged over it, for one row only.
 */
export const Customized: Story = {
  render: (args) => ({
    components: { Accordion },
    setup: () => ({ args, items, frame }),
    template: `<div :class="frame">
      <Accordion
        v-bind="args"
        :items="items"
        :ui="{
          root: 'rounded-none border-x-0',
          trigger: 'font-semibold uppercase tracking-wide',
          trailingIcon: 'text-intent-fg',
          body: 'text-fg',
        }"
      />
    </div>`,
  }),
};

/**
 * The same overrides applied app-wide. Anything a `ui` prop can say, a `ThemeConfig` can
 * say for every accordion at once — including which variant is the default.
 */
const flatTheme: ThemeConfig = {
  accordion: {
    slots: { trigger: "font-semibold" },
    defaultVariants: { variant: "plain", colorPalette: "info" },
  },
};

export const ThemedApp: Story = {
  render: (args) => ({
    components: { Accordion, NeoUIProvider },
    setup: () => ({ args, items, frame, flatTheme }),
    template: `<NeoUIProvider :theme="flatTheme">
      <div :class="frame">
        <Accordion v-bind="args" :items="items" />
      </div>
    </NeoUIProvider>`,
  }),
};
