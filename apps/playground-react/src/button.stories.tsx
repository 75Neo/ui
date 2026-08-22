import { Button, NeoUIProvider, type ThemeConfig } from "@75neo/react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const VARIANTS = ["solid", "subtle", "outline", "ghost", "link"] as const;
const PALETTES = ["accent", "neutral", "success", "warning", "danger", "info"] as const;
const SIZES = ["xs", "sm", "md", "lg"] as const;

const row = "flex flex-wrap items-center gap-3";
const grid = "grid gap-3";
const legend = "text-xs font-medium uppercase tracking-wide text-fg-muted";

const meta = {
  title: "Components/Button",
  component: Button,
  args: { children: "Button" },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    colorPalette: { control: "select", options: PALETTES },
    size: { control: "select", options: SIZES },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** The emphasis ladder, at a single intent. */
export const Variants: Story = {
  render: (args) => (
    <div className={row}>
      {VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

/** Shape and intent are independent — every cell below is the same five variants. */
export const Intents: Story = {
  render: (args) => (
    <div className={grid}>
      {PALETTES.map((colorPalette) => (
        <div key={colorPalette} className={grid}>
          <span className={legend}>{colorPalette}</span>
          <div className={row}>
            {VARIANTS.map((variant) => (
              <Button key={variant} {...args} variant={variant} colorPalette={colorPalette}>
                {variant}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className={row}>
      {SIZES.map((size) => (
        <Button key={size} {...args} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div className={row}>
      {VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant} disabled>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

/**
 * `className` is merged by `tailwind-merge`, not appended: `rounded-full` replaces the
 * size variant's `rounded-md` and `px-8` replaces its `px-4`, with no `!important` and
 * no knowledge of what the theme picked.
 */
export const OverridingClasses: Story = {
  render: (args) => (
    <div className={row}>
      <Button {...args}>default</Button>
      <Button {...args} className="rounded-full px-8">
        rounded-full px-8
      </Button>
      <Button {...args} ui={{ base: "uppercase tracking-widest" }}>
        via ui
      </Button>
    </div>
  ),
};

/**
 * The same override applied to every button at once. `NeoUIProvider` merges a
 * `ThemeConfig` into the built-in themes, so a whole app can be re-shaped without
 * touching a call site.
 */
const pillTheme: ThemeConfig = {
  button: {
    slots: { base: "rounded-full" },
    defaultVariants: { colorPalette: "neutral" },
  },
};

export const ThemedApp: Story = {
  render: (args) => (
    <NeoUIProvider theme={pillTheme}>
      <div className={row}>
        {VARIANTS.map((variant) => (
          <Button key={variant} {...args} variant={variant}>
            {variant}
          </Button>
        ))}
      </div>
    </NeoUIProvider>
  ),
};
