import {
  Accordion,
  type AccordionItem,
  type AccordionProps,
  NeoUIProvider,
  type ThemeConfig,
} from "@75neo/vue";
import { LeafIcon, PlusIcon, ShapesIcon, SunMoonIcon } from "@lucide/vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

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
    label: "How are shape and colour kept apart?",
    icon: ShapesIcon,
    content:
      "A palette re-points a single custom property, so a theme writes each shape once against intent-* and gets every colour for free.",
  },
  {
    value: "modes",
    label: "What happens in dark mode?",
    icon: SunMoonIcon,
    content:
      "Components style against semantic utilities such as bg-elevated and text-muted, which resolve per colour mode. Nothing inside a component ever branches on dark: itself.",
  },
];

const frame = "max-w-lg";

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
        :ui="{ trailingIcon: 'group-data-[state=open]:rotate-45' }"
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
          <span class="tabular-nums text-muted">{{ index + 1 }}.</span>
          {{ item.label }}
        </template>
        <template #body="{ item, open }">
          <p>{{ item.content }}</p>
          <p class="mt-2 text-xs uppercase tracking-wide">{{ open ? "open" : "closed" }}</p>
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
          <code class="mt-2 block rounded bg-elevated px-2 py-1 text-xs">
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
          item: 'border-accented',
          trigger: 'font-semibold uppercase tracking-wide',
          trailingIcon: 'text-primary',
          body: 'text-toned',
        }"
      />
    </div>`,
  }),
};

/**
 * The same overrides applied app-wide. Anything a `ui` prop can say, a `ThemeConfig` can
 * say for every accordion at once.
 */
const boxedTheme: ThemeConfig = {
  accordion: {
    slots: {
      root: "overflow-hidden rounded-lg border border-default px-4",
      trigger: "font-semibold",
    },
  },
};

export const ThemedApp: Story = {
  render: (args) => ({
    components: { Accordion, NeoUIProvider },
    setup: () => ({ args, items, frame, boxedTheme }),
    template: `<NeoUIProvider :theme="boxedTheme">
      <div :class="frame">
        <Accordion v-bind="args" :items="items" />
      </div>
    </NeoUIProvider>`,
  }),
};
