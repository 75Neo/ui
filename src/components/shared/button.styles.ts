import { tv, type VariantProps } from "tailwind-variants/lite";

export const button = tv({
  slots: {
    base: "inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
    leadingIcon: "shrink-0",
    trailingIcon: "shrink-0",
  },
  variants: {
    variant: {
      solid: "",
      outline: "ring ring-inset",
      soft: "",
      subtle: "ring ring-inset",
      ghost: "",
      link: "underline-offset-4 hover:underline",
    },
    color: {
      primary: "focus-visible:outline-primary",
      secondary: "focus-visible:outline-secondary",
      success: "focus-visible:outline-success",
      info: "focus-visible:outline-info",
      warning: "focus-visible:outline-warning",
      error: "focus-visible:outline-error",
    },
    size: {
      xs: {
        base: "gap-1 px-2 py-1 text-xs",
        leadingIcon: "size-4",
        trailingIcon: "size-4",
      },
      sm: {
        base: "gap-1.5 px-2.5 py-1.5 text-xs",
        leadingIcon: "size-4",
        trailingIcon: "size-4",
      },
      md: {
        base: "gap-1.5 px-2.5 py-1.5 text-sm",
        leadingIcon: "size-5",
        trailingIcon: "size-5",
      },
      lg: {
        base: "gap-2 px-3 py-2 text-sm",
        leadingIcon: "size-5",
        trailingIcon: "size-5",
      },
      xl: {
        base: "gap-2 px-3 py-2 text-base",
        leadingIcon: "size-6",
        trailingIcon: "size-6",
      },
    },
    disabled: {
      true: "pointer-events-none opacity-75",
    },
  },
  compoundVariants: [
    { variant: "solid", color: "primary", class: "bg-primary text-inverted hover:bg-primary/75" },
    {
      variant: "solid",
      color: "secondary",
      class: "bg-secondary text-inverted hover:bg-secondary/75",
    },
    { variant: "solid", color: "success", class: "bg-success text-inverted hover:bg-success/75" },
    { variant: "solid", color: "info", class: "bg-info text-inverted hover:bg-info/75" },
    { variant: "solid", color: "warning", class: "bg-warning text-inverted hover:bg-warning/75" },
    { variant: "solid", color: "error", class: "bg-error text-inverted hover:bg-error/75" },

    {
      variant: "outline",
      color: "primary",
      class: "text-primary ring-primary/50 hover:bg-primary/10",
    },
    {
      variant: "outline",
      color: "secondary",
      class: "text-secondary ring-secondary/50 hover:bg-secondary/10",
    },
    {
      variant: "outline",
      color: "success",
      class: "text-success ring-success/50 hover:bg-success/10",
    },
    { variant: "outline", color: "info", class: "text-info ring-info/50 hover:bg-info/10" },
    {
      variant: "outline",
      color: "warning",
      class: "text-warning ring-warning/50 hover:bg-warning/10",
    },
    { variant: "outline", color: "error", class: "text-error ring-error/50 hover:bg-error/10" },

    { variant: "soft", color: "primary", class: "bg-primary/10 text-primary hover:bg-primary/15" },
    {
      variant: "soft",
      color: "secondary",
      class: "bg-secondary/10 text-secondary hover:bg-secondary/15",
    },
    { variant: "soft", color: "success", class: "bg-success/10 text-success hover:bg-success/15" },
    { variant: "soft", color: "info", class: "bg-info/10 text-info hover:bg-info/15" },
    { variant: "soft", color: "warning", class: "bg-warning/10 text-warning hover:bg-warning/15" },
    { variant: "soft", color: "error", class: "bg-error/10 text-error hover:bg-error/15" },

    {
      variant: "subtle",
      color: "primary",
      class: "bg-primary/10 text-primary ring-primary/25 hover:bg-primary/15",
    },
    {
      variant: "subtle",
      color: "secondary",
      class: "bg-secondary/10 text-secondary ring-secondary/25 hover:bg-secondary/15",
    },
    {
      variant: "subtle",
      color: "success",
      class: "bg-success/10 text-success ring-success/25 hover:bg-success/15",
    },
    {
      variant: "subtle",
      color: "info",
      class: "bg-info/10 text-info ring-info/25 hover:bg-info/15",
    },
    {
      variant: "subtle",
      color: "warning",
      class: "bg-warning/10 text-warning ring-warning/25 hover:bg-warning/15",
    },
    {
      variant: "subtle",
      color: "error",
      class: "bg-error/10 text-error ring-error/25 hover:bg-error/15",
    },

    { variant: "ghost", color: "primary", class: "text-primary hover:bg-primary/10" },
    { variant: "ghost", color: "secondary", class: "text-secondary hover:bg-secondary/10" },
    { variant: "ghost", color: "success", class: "text-success hover:bg-success/10" },
    { variant: "ghost", color: "info", class: "text-info hover:bg-info/10" },
    { variant: "ghost", color: "warning", class: "text-warning hover:bg-warning/10" },
    { variant: "ghost", color: "error", class: "text-error hover:bg-error/10" },

    { variant: "link", color: "primary", class: "text-primary hover:text-primary/75" },
    { variant: "link", color: "secondary", class: "text-secondary hover:text-secondary/75" },
    { variant: "link", color: "success", class: "text-success hover:text-success/75" },
    { variant: "link", color: "info", class: "text-info hover:text-info/75" },
    { variant: "link", color: "warning", class: "text-warning hover:text-warning/75" },
    { variant: "link", color: "error", class: "text-error hover:text-error/75" },
  ],
  defaultVariants: {
    variant: "solid",
    color: "primary",
    size: "md",
  },
});

export type ButtonVariants = VariantProps<typeof button>;
