import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "inline-flex justify-center items-center shrink-0 cursor-pointer flex-nowrap text-center align-middle p-4",
  variants: {
    variant: {
      solid: "",
      soft: "",
      outline: "",
      text: "",
    },
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
    color: {
      primary: "",
      secondary: "",
      success: "",
      info: "",
      warning: "",
      error: "",
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      color: "primary",
      class: "bg-primary",
    },
  ],
  defaultVariants: {
    variant: "solid",
    size: "md",
    color: "primary",
  },
});

type ButtonVariants = VariantProps<typeof button>;

export { button, type ButtonVariants };
