import { Accordion, type AccordionItem, NeoUIProvider, type ThemeConfig } from "@75neo/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LeafIcon, PlusIcon, ShapesIcon, SunMoonIcon } from "lucide-react";

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

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  args: { items, defaultValue: ["recipes"] },
  argTypes: {
    multiple: { control: "boolean" },
    collapsible: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  render: (args) => (
    <div className={frame}>
      <Accordion {...args} />
    </div>
  ),
} satisfies Meta<typeof Accordion>;

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
  args: { items: items.map((item, index) => ({ ...item, disabled: index === 1 })) },
};

/** `trailingIcon` replaces the chevron; `ui.trailingIcon` retunes how it animates. */
export const TrailingIcon: Story = {
  args: {
    trailingIcon: PlusIcon,
    ui: { trailingIcon: "group-data-[state=open]:rotate-45" },
  },
};

/**
 * Every part a caller might want to replace is a render prop — Vue and Svelte spell the
 * same five as named slots. `children` is the trigger's label; `body` is the panel's.
 */
export const Slots: Story = {
  render: (args) => (
    <div className={frame}>
      <Accordion
        {...args}
        body={({ item, open }) => (
          <>
            <p>{item.content}</p>
            <p className="mt-2 text-xs uppercase tracking-wide">{open ? "open" : "closed"}</p>
          </>
        )}
      >
        {({ item, index }) => (
          <>
            <span className="tabular-nums text-muted">{index + 1}.</span> {item.label}
          </>
        )}
      </Accordion>
    </div>
  ),
};

/**
 * A row that names a `slot` is rendered by the entry of that name in `slots`: `{slot}`
 * replaces its whole panel, `{slot}-body` only what sits inside it. The rows that name
 * none keep rendering their `content`.
 */
export const PerItemSlots: Story = {
  args: { items: items.map((item, index) => (index === 0 ? { ...item, slot: "styling" } : item)) },
  render: (args) => (
    <div className={frame}>
      <Accordion
        {...args}
        slots={{
          "styling-body": ({ item }) => (
            <>
              <p>{item.content}</p>
              <code className="mt-2 block rounded bg-elevated px-2 py-1 text-xs">
                packages/styles/src/themes
              </code>
            </>
          ),
        }}
      />
    </div>
  ),
};

/**
 * `ui` reaches every slot of the theme, so one prop restyles triggers, icons and bodies
 * at once. An item's own `ui` is merged over it, for one row only.
 */
export const Customized: Story = {
  args: {
    ui: {
      item: "border-accented",
      trigger: "font-semibold uppercase tracking-wide",
      trailingIcon: "text-primary",
      body: "text-toned",
    },
  },
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
  render: (args) => (
    <NeoUIProvider theme={boxedTheme}>
      <div className={frame}>
        <Accordion {...args} />
      </div>
    </NeoUIProvider>
  ),
};
