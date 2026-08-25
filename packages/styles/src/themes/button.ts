import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "inline-flex justify-center items-center shrink-0 cursor-pointer flex-nowrap text-center align-middle gap-2 rounded-md border border-transparent font-medium select-none outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none active:scale-95",
  variants: {
    variant: {
      solid: "shadow-sm",
      soft: "",
      outline: "",
      text: "",
    },
    size: {
      xs: "h-6 gap-1 px-2 text-xs",
      sm: "h-8 gap-1.5 px-3 text-sm",
      md: "h-10 gap-2 px-4 text-base",
      lg: "h-11 gap-2 px-5 text-lg",
      xl: "h-14 gap-2.5 px-6 text-lg",
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
      class:
        "bg-primary text-white hover:bg-primary/90 active:bg-primary/80 focus-visible:ring-primary/40",
    },
    {
      variant: "solid",
      color: "secondary",
      class:
        "bg-secondary text-white hover:bg-secondary/90 active:bg-secondary/80 focus-visible:ring-secondary/40",
    },
    {
      variant: "solid",
      color: "success",
      class:
        "bg-success text-white hover:bg-success/90 active:bg-success/80 focus-visible:ring-success/40",
    },
    {
      variant: "solid",
      color: "info",
      class: "bg-info text-white hover:bg-info/90 active:bg-info/80 focus-visible:ring-info/40",
    },
    {
      variant: "solid",
      color: "warning",
      class:
        "bg-warning text-white hover:bg-warning/90 active:bg-warning/80 focus-visible:ring-warning/40",
    },
    {
      variant: "solid",
      color: "error",
      class: "bg-error text-white hover:bg-error/90 active:bg-error/80 focus-visible:ring-error/40",
    },
    {
      variant: "soft",
      color: "primary",
      class:
        "bg-primary/10 text-primary hover:bg-primary/20 active:bg-primary/30 focus-visible:ring-primary/40",
    },
    {
      variant: "soft",
      color: "secondary",
      class:
        "bg-secondary/10 text-secondary hover:bg-secondary/20 active:bg-secondary/30 focus-visible:ring-secondary/40",
    },
    {
      variant: "soft",
      color: "success",
      class:
        "bg-success/10 text-success hover:bg-success/20 active:bg-success/30 focus-visible:ring-success/40",
    },
    {
      variant: "soft",
      color: "info",
      class: "bg-info/10 text-info hover:bg-info/20 active:bg-info/30 focus-visible:ring-info/40",
    },
    {
      variant: "soft",
      color: "warning",
      class:
        "bg-warning/10 text-warning hover:bg-warning/20 active:bg-warning/30 focus-visible:ring-warning/40",
    },
    {
      variant: "soft",
      color: "error",
      class:
        "bg-error/10 text-error hover:bg-error/20 active:bg-error/30 focus-visible:ring-error/40",
    },
    {
      variant: "outline",
      color: "primary",
      class:
        "border-primary text-primary hover:bg-primary/10 active:bg-primary/20 focus-visible:ring-primary/40",
    },
    {
      variant: "outline",
      color: "secondary",
      class:
        "border-secondary text-secondary hover:bg-secondary/10 active:bg-secondary/20 focus-visible:ring-secondary/40",
    },
    {
      variant: "outline",
      color: "success",
      class:
        "border-success text-success hover:bg-success/10 active:bg-success/20 focus-visible:ring-success/40",
    },
    {
      variant: "outline",
      color: "info",
      class: "border-info text-info hover:bg-info/10 active:bg-info/20 focus-visible:ring-info/40",
    },
    {
      variant: "outline",
      color: "warning",
      class:
        "border-warning text-warning hover:bg-warning/10 active:bg-warning/20 focus-visible:ring-warning/40",
    },
    {
      variant: "outline",
      color: "error",
      class:
        "border-error text-error hover:bg-error/10 active:bg-error/20 focus-visible:ring-error/40",
    },
    {
      variant: "text",
      color: "primary",
      class: "text-primary hover:bg-primary/10 active:bg-primary/20 focus-visible:ring-primary/40",
    },
    {
      variant: "text",
      color: "secondary",
      class:
        "text-secondary hover:bg-secondary/10 active:bg-secondary/20 focus-visible:ring-secondary/40",
    },
    {
      variant: "text",
      color: "success",
      class: "text-success hover:bg-success/10 active:bg-success/20 focus-visible:ring-success/40",
    },
    {
      variant: "text",
      color: "info",
      class: "text-info hover:bg-info/10 active:bg-info/20 focus-visible:ring-info/40",
    },
    {
      variant: "text",
      color: "warning",
      class: "text-warning hover:bg-warning/10 active:bg-warning/20 focus-visible:ring-warning/40",
    },
    {
      variant: "text",
      color: "error",
      class: "text-error hover:bg-error/10 active:bg-error/20 focus-visible:ring-error/40",
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
