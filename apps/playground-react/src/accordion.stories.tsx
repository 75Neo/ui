import { Accordion, NeoUIProvider, type ThemeConfig } from "@75neo/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlusIcon } from "lucide-react";

const VARIANTS = ["outline", "subtle", "elevated", "plain"] as const;
const PALETTES = ["accent", "neutral", "success", "warning", "danger", "info"] as const;
const SIZES = ["sm", "md", "lg"] as const;

const items = [
  {
    value: "recipes",
    title: "Where does styling live?",
    content:
      "In one tailwind-variants theme under packages/styles. React, Vue and Svelte all render the class names it produces, so a variant is added once rather than three times.",
  },
  {
    value: "intents",
    title: "How are shape and intent kept apart?",
    content:
      "Every intent palette fills the same eight roles, so a theme writes each shape once against the intent-* roles and gets all six intents for free.",
  },
  {
    value: "modes",
    title: "What happens in dark mode?",
    content:
      "Components style against semantic utilities such as bg-surface and text-fg-muted, which resolve per colour mode. Nothing inside a component ever branches on dark: itself.",
  },
];

const grid = "grid gap-6";
const frame = "max-w-lg";
const legend = "text-xs font-medium uppercase tracking-wide text-fg-muted";

const renderItems = () =>
  items.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.ItemTrigger>
        {item.title}
        <Accordion.ItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>{item.content}</Accordion.ItemContent>
    </Accordion.Item>
  ));

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
  render: (args) => (
    <div className={frame}>
      <Accordion.Root {...args}>{renderItems()}</Accordion.Root>
    </div>
  ),
} satisfies Meta<typeof Accordion.Root>;

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
          <Accordion.Root {...args} variant={variant}>
            {renderItems()}
          </Accordion.Root>
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
          <Accordion.Root {...args} size={size}>
            {renderItems()}
          </Accordion.Root>
        </div>
      ))}
    </div>
  ),
};

/** Shape and intent are independent — the expanded header and its indicator carry it. */
export const Intents: Story = {
  render: (args) => (
    <div className={`${grid} ${frame}`}>
      {PALETTES.map((colorPalette) => (
        <div key={colorPalette} className="grid gap-2">
          <span className={legend}>{colorPalette}</span>
          <Accordion.Root {...args} colorPalette={colorPalette}>
            {renderItems()}
          </Accordion.Root>
        </div>
      ))}
    </div>
  ),
};

/** `multiple` lets several panels stay open; `collapsible` lets the last one close. */
export const Multiple: Story = {
  args: { multiple: true, collapsible: true, defaultValue: ["recipes", "intents"] },
};

/** Disabled on the root; pass it to a single `Item` to disable just that row. */
export const Disabled: Story = { args: { disabled: true } };

/** `ItemIndicator` renders a chevron unless you give it something else. */
export const CustomIndicator: Story = {
  render: (args) => (
    <div className={frame}>
      <Accordion.Root {...args}>
        {items.map((item) => (
          <Accordion.Item key={item.value} value={item.value}>
            <Accordion.ItemTrigger>
              {item.title}
              <Accordion.ItemIndicator className="data-[state=open]:rotate-45">
                <PlusIcon aria-hidden="true" />
              </Accordion.ItemIndicator>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>{item.content}</Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  ),
};

/**
 * `ui` reaches every part from the root. Each key is a slot of the accordion theme, so
 * one prop restyles triggers, indicators and bodies at once without the parts being
 * given props one by one.
 */
export const Customized: Story = {
  render: (args) => (
    <div className={frame}>
      <Accordion.Root
        {...args}
        ui={{
          root: "rounded-none border-x-0",
          itemTrigger: "font-semibold uppercase tracking-wide",
          itemIndicator: "text-intent-fg",
          itemBody: "text-fg",
        }}
      >
        {renderItems()}
      </Accordion.Root>
    </div>
  ),
};

/**
 * The same overrides applied app-wide. Anything a `ui` prop can say, a `ThemeConfig` can
 * say for every accordion at once — including which variant is the default.
 */
const flatTheme: ThemeConfig = {
  accordion: {
    slots: { itemTrigger: "font-semibold" },
    defaultVariants: { variant: "plain", colorPalette: "info" },
  },
};

export const ThemedApp: Story = {
  render: (args) => (
    <NeoUIProvider theme={flatTheme}>
      <div className={frame}>
        <Accordion.Root {...args}>{renderItems()}</Accordion.Root>
      </div>
    </NeoUIProvider>
  ),
};
