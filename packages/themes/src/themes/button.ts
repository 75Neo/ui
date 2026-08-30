import { tv, type VariantProps } from "tailwind-variants";

export const button = tv({
  slots: {
    base: "",
    leading: "",
    trailing: "",
    label: "",
  },
  variants: {
    variant: {
      solid: {},
      soft: {},
      outline: {},
      ghost: {},
    },
    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
    },
    color: {
      primary: {},
      secondary: {},
      neutral: {},
      success: {},
      info: {},
      warning: {},
      error: {},
    },
    compact: {
      true: {},
    },
  },
  compoundVariants: [],
  compoundSlots: [],
  defaultVariants: {
    variant: "solid",
    size: "md",
    color: "primary",
  },
});

export type ButtonVariants = VariantProps<typeof button>;
