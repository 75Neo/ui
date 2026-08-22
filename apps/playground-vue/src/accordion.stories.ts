import { css } from "@75neo/styles/css";
import { Accordion, type AccordionProps } from "@75neo/vue";
import { PlusIcon } from "@lucide/vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

const VARIANTS = ["outline", "subtle", "elevated", "plain"] as const;
const PALETTES = ["accent", "neutral", "success", "warning", "danger", "info"] as const;
const SIZES = ["sm", "md", "lg"] as const;

const items = [
  {
    value: "recipes",
    title: "Where does styling live?",
    content:
      "In one recipe under packages/styles. React, Vue and Svelte all render the class names it produces, so a variant is added once rather than three times.",
  },
  {
    value: "intents",
    title: "How are shape and intent kept apart?",
    content:
      "Every intent palette fills the same eight roles, so a recipe writes each shape once against colorPalette.* and gets all six intents for free.",
  },
  {
    value: "modes",
    title: "What happens in dark mode?",
    content:
      "Components style against semantic tokens, which resolve per colour mode. Nothing inside a component ever branches on _dark.",
  },
];

const grid = css({ display: "grid", gap: "6" });
const row = css({ display: "grid", gap: "2" });
const frame = css({ maxWidth: "lg" });
const legend = css({ textStyle: "label.sm", color: "fg.muted", textTransform: "uppercase" });

/** Registered flat rather than as a namespace, so runtime templates resolve them. */
const components = {
  AccordionRoot: Accordion.Root,
  AccordionItem: Accordion.Item,
  AccordionItemTrigger: Accordion.ItemTrigger,
  AccordionItemIndicator: Accordion.ItemIndicator,
  AccordionItemContent: Accordion.ItemContent,
};

const ITEMS = `
  <AccordionItem v-for="item in items" :key="item.value" :value="item.value">
    <AccordionItemTrigger>
      {{ item.title }}
      <AccordionItemIndicator />
    </AccordionItemTrigger>
    <AccordionItemContent>{{ item.content }}</AccordionItemContent>
  </AccordionItem>`;

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
  component: Accordion.Root,
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
    components,
    setup: () => ({ args, items, frame }),
    template: `<div :class="frame">
      <AccordionRoot v-bind="args">${ITEMS}</AccordionRoot>
    </div>`,
  }),
} satisfies Meta<AccordionArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** The four shapes. Only the chrome changes; the anatomy is identical. */
export const Variants: Story = {
  render: (args) => ({
    components,
    setup: () => ({ args, items, VARIANTS, grid, row, frame, legend }),
    template: `<div :class="[grid, frame]">
      <div v-for="v in VARIANTS" :key="v" :class="row">
        <span :class="legend">{{ v }}</span>
        <AccordionRoot v-bind="args" :variant="v">${ITEMS}</AccordionRoot>
      </div>
    </div>`,
  }),
};

export const Sizes: Story = {
  render: (args) => ({
    components,
    setup: () => ({ args, items, SIZES, grid, row, frame, legend }),
    template: `<div :class="[grid, frame]">
      <div v-for="s in SIZES" :key="s" :class="row">
        <span :class="legend">{{ s }}</span>
        <AccordionRoot v-bind="args" :size="s">${ITEMS}</AccordionRoot>
      </div>
    </div>`,
  }),
};

/** Shape and intent are independent — the expanded header and its indicator carry it. */
export const Intents: Story = {
  render: (args) => ({
    components,
    setup: () => ({ args, items, PALETTES, grid, row, frame, legend }),
    template: `<div :class="[grid, frame]">
      <div v-for="p in PALETTES" :key="p" :class="row">
        <span :class="legend">{{ p }}</span>
        <AccordionRoot v-bind="args" :colorPalette="p">${ITEMS}</AccordionRoot>
      </div>
    </div>`,
  }),
};

/** `multiple` lets several panels stay open; `collapsible` lets the last one close. */
export const Multiple: Story = {
  args: { multiple: true, collapsible: true, defaultValue: ["recipes", "intents"] },
};

/** Disabled on the root; pass it to a single `Item` to disable just that row. */
export const Disabled: Story = { args: { disabled: true } };

/** `ItemIndicator` renders a chevron unless you give it something else. */
export const CustomIndicator: Story = {
  render: (args) => ({
    components: { ...components, PlusIcon },
    setup: () => ({
      args,
      items,
      frame,
      plus: css({ _open: { transform: "rotate(45deg)" } }),
    }),
    template: `<div :class="frame">
      <AccordionRoot v-bind="args">
        <AccordionItem v-for="item in items" :key="item.value" :value="item.value">
          <AccordionItemTrigger>
            {{ item.title }}
            <AccordionItemIndicator :class="plus">
              <PlusIcon aria-hidden="true" />
            </AccordionItemIndicator>
          </AccordionItemTrigger>
          <AccordionItemContent>{{ item.content }}</AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>
    </div>`,
  }),
};
