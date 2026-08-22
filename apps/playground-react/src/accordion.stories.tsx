import { Accordion, type AccordionItem, NeoUIProvider, type ThemeConfig } from "@75neo/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LeafIcon, PlusIcon, ShapesIcon, SunMoonIcon } from "lucide-react";

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
const frame = "max-w-lg";
const legend = "text-xs font-medium uppercase tracking-wide text-fg-muted";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  args: { items, defaultValue: ["recipes"] },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    colorPalette: { control: "select", options: PALETTES },
    size: { control: "select", options: SIZES },
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

/** The four shapes. Only the chrome changes; the anatomy is identical. */
export const Variants: Story = {
  render: (args) => (
    <div className={`${grid} ${frame}`}>
      {VARIANTS.map((variant) => (
        <div key={variant} className="grid gap-2">
          <span className={legend}>{variant}</span>
          <Accordion {...args} variant={variant} />
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className={`${grid} ${frame}`}>
      {SIZES.map((size) => (
        <div key={size} className="grid gap-2">
          <span className={legend}>{size}</span>
          <Accordion {...args} size={size} />
        </div>
      ))}
    </div>
  ),
};

/** Shape and intent are independent — the expanded trigger and its icon carry it. */
export const Intents: Story = {
  render: (args) => (
    <div className={`${grid} ${frame}`}>
      {PALETTES.map((colorPalette) => (
        <div key={colorPalette} className="grid gap-2">
          <span className={legend}>{colorPalette}</span>
          <Accordion {...args} colorPalette={colorPalette} />
        </div>
      ))}
    </div>
  ),
};

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
    ui: { trailingIcon: "data-[state=open]:rotate-45" },
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
            <p className="mt-2 text-2xs uppercase tracking-wide">{open ? "open" : "closed"}</p>
          </>
        )}
      >
        {({ item, index }) => (
          <>
            <span className="tabular-nums text-fg-muted">{index + 1}.</span> {item.label}
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
              <code className="mt-2 block rounded bg-surface-subtle px-2 py-1 text-2xs">
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
      root: "rounded-none border-x-0",
      trigger: "font-semibold uppercase tracking-wide",
      trailingIcon: "text-intent-fg",
      body: "text-fg",
    },
  },
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
  render: (args) => (
    <NeoUIProvider theme={flatTheme}>
      <div className={frame}>
        <Accordion {...args} />
      </div>
    </NeoUIProvider>
  ),
};
