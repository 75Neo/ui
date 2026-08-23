import { Button, NeoUIProvider, type ThemeConfig } from "@75neo/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRightIcon, PlusIcon, SearchIcon } from "lucide-react";

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
  render: (args) => (
    <div className={row}>
      {VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant} label={variant} />
      ))}
    </div>
  ),
};

/**
 * Shape and colour are independent — every row below is the same six variants. Only
 * `neutral` is spelled out in the theme; the other six re-point one custom property.
 */
export const Colors: Story = {
  render: (args) => (
    <div className={grid}>
      {COLORS.map((color) => (
        <div key={color} className={grid}>
          <span className={legend}>{color}</span>
          <div className={row}>
            {VARIANTS.map((variant) => (
              <Button key={variant} {...args} variant={variant} color={color} label={variant} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/** Padding-driven, so a button grows with its own text rather than a fixed height. */
export const Sizes: Story = {
  render: (args) => (
    <div className={row}>
      {SIZES.map((size) => (
        <Button key={size} {...args} size={size} label={size} />
      ))}
    </div>
  ),
};

/** `icon` leads by default; `trailing` moves it, and the two sided props are absolute. */
export const Icons: Story = {
  render: (args) => (
    <div className={row}>
      <Button {...args} icon={PlusIcon} label="Add item" />
      <Button {...args} icon={ArrowRightIcon} trailing label="Continue" />
      <Button {...args} leadingIcon={SearchIcon} trailingIcon={ArrowRightIcon} label="Search" />
    </div>
  ),
};

/** No label and no children makes the button square, without `square` being passed. */
export const IconOnly: Story = {
  args: { label: undefined },
  render: (args) => (
    <div className={row}>
      {SIZES.map((size) => (
        <Button key={size} {...args} size={size} icon={PlusIcon} aria-label={`Add (${size})`} />
      ))}
    </div>
  ),
};

/** The spinner replaces whichever icon is showing, and the button disables itself. */
export const Loading: Story = {
  render: (args) => (
    <div className={row}>
      <Button {...args} loading label="Saving" />
      <Button {...args} loading trailing icon={ArrowRightIcon} label="Saving" />
      <Button {...args} loading label={undefined} aria-label="Saving" />
    </div>
  ),
};

/** Full width, with the trailing icon pushed to the far edge so the button reads as a row. */
export const Block: Story = {
  args: { block: true, trailingIcon: ArrowRightIcon },
  render: (args) => (
    <div className="grid max-w-sm gap-3">
      {VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant} label={variant} />
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div className={row}>
      {VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant} label={variant} disabled />
      ))}
    </div>
  ),
};

/**
 * `className` is merged by `tailwind-merge`, not appended: `rounded-full` replaces the
 * theme's `rounded-md` and `px-8` replaces the size variant's `px-2.5`, with no
 * `!important` and no knowledge of what the theme picked.
 */
export const OverridingClasses: Story = {
  render: (args) => (
    <div className={row}>
      <Button {...args} label="default" />
      <Button {...args} className="rounded-full px-8" label="rounded-full px-8" />
      <Button {...args} ui={{ label: "uppercase tracking-widest" }} label="via ui" />
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
    defaultVariants: { color: "neutral" },
  },
};

export const ThemedApp: Story = {
  render: (args) => (
    <NeoUIProvider theme={pillTheme}>
      <div className={row}>
        {VARIANTS.map((variant) => (
          <Button key={variant} {...args} variant={variant} label={variant} />
        ))}
      </div>
    </NeoUIProvider>
  ),
};
