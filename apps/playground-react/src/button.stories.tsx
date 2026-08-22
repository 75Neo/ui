import { Button } from "@75neo/react";
import { css } from "@75neo/styles/css";
import type { Meta, StoryObj } from "@storybook/react-vite";

const VARIANTS = ["solid", "subtle", "outline", "ghost", "link"] as const;
const PALETTES = ["accent", "neutral", "success", "warning", "danger", "info"] as const;
const SIZES = ["xs", "sm", "md", "lg"] as const;

const row = css({ display: "flex", gap: "3", alignItems: "center", flexWrap: "wrap" });
const grid = css({ display: "grid", gap: "3" });
const legend = css({ textStyle: "label.sm", color: "fg.muted", textTransform: "uppercase" });

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

export const FullWidth: Story = { args: { fullWidth: true } };
