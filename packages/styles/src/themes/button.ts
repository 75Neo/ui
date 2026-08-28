import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  slots: {
    base: "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded border border-transparent text-center align-middle font-medium transition-all duration-150 outline-none select-none focus-visible:ring-1 focus-visible:ring-offset-1 active:scale-[0.98] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none",
    leadingIcon: "shrink-0 [&>svg]:size-full",
    label: "min-w-0 truncate",
    trailingIcon: "shrink-0 [&>svg]:size-full",
  },
  variants: {
    variant: {
      solid: {
        base: "shadow-xs",
      },
      soft: {},
      outline: {},
      ghost: {},
    },
    size: {
      xs: {
        base: "h-6 gap-1 px-2 text-xs",
      },
      sm: {
        base: "h-7 gap-1 px-2.5 text-xs",
      },
      md: {
        base: "h-8 gap-1.5 px-3 text-sm",
      },
      lg: {
        base: "h-9 gap-1.5 px-3.5 text-sm",
      },
      xl: {
        base: "h-10 gap-2 px-4 text-base",
      },
    },
    color: {
      primary: {},
      secondary: {},
      success: {},
      info: {},
      warning: {},
      error: {},
    },
    compact: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      color: "primary",
      class: {
        base: "bg-primary hover:bg-primary/90 active:bg-primary/80 focus-visible:ring-primary/40 text-white",
      },
    },
    {
      variant: "solid",
      color: "secondary",
      class: {
        base: "bg-secondary hover:bg-secondary/90 active:bg-secondary/80 focus-visible:ring-secondary/40 text-white",
      },
    },
    {
      variant: "solid",
      color: "success",
      class: {
        base: "bg-success hover:bg-success/90 active:bg-success/80 focus-visible:ring-success/40 text-white",
      },
    },
    {
      variant: "solid",
      color: "info",
      class: {
        base: "bg-info hover:bg-info/90 active:bg-info/80 focus-visible:ring-info/40 text-white",
      },
    },
    {
      variant: "solid",
      color: "warning",
      class: {
        base: "bg-warning hover:bg-warning/90 active:bg-warning/80 focus-visible:ring-warning/40 text-white",
      },
    },
    {
      variant: "solid",
      color: "error",
      class: {
        base: "bg-error hover:bg-error/90 active:bg-error/80 focus-visible:ring-error/40 text-white",
      },
    },
    {
      variant: "soft",
      color: "primary",
      class: {
        base: "bg-primary/8 text-primary hover:bg-primary/15 active:bg-primary/25 focus-visible:ring-primary/40",
      },
    },
    {
      variant: "soft",
      color: "secondary",
      class: {
        base: "bg-secondary/8 text-secondary hover:bg-secondary/15 active:bg-secondary/25 focus-visible:ring-secondary/40",
      },
    },
    {
      variant: "soft",
      color: "success",
      class: {
        base: "bg-success/8 text-success hover:bg-success/15 active:bg-success/25 focus-visible:ring-success/40",
      },
    },
    {
      variant: "soft",
      color: "info",
      class: {
        base: "bg-info/8 text-info hover:bg-info/15 active:bg-info/25 focus-visible:ring-info/40",
      },
    },
    {
      variant: "soft",
      color: "warning",
      class: {
        base: "bg-warning/8 text-warning hover:bg-warning/15 active:bg-warning/25 focus-visible:ring-warning/40",
      },
    },
    {
      variant: "soft",
      color: "error",
      class: {
        base: "bg-error/8 text-error hover:bg-error/15 active:bg-error/25 focus-visible:ring-error/40",
      },
    },
    {
      variant: "outline",
      color: "primary",
      class: {
        base: "border-primary/40 text-primary hover:border-primary hover:bg-primary/8 active:bg-primary/15 focus-visible:ring-primary/40",
      },
    },
    {
      variant: "outline",
      color: "secondary",
      class: {
        base: "border-secondary/40 text-secondary hover:border-secondary hover:bg-secondary/8 active:bg-secondary/15 focus-visible:ring-secondary/40",
      },
    },
    {
      variant: "outline",
      color: "success",
      class: {
        base: "border-success/40 text-success hover:border-success hover:bg-success/8 active:bg-success/15 focus-visible:ring-success/40",
      },
    },
    {
      variant: "outline",
      color: "info",
      class: {
        base: "border-info/40 text-info hover:border-info hover:bg-info/8 active:bg-info/15 focus-visible:ring-info/40",
      },
    },
    {
      variant: "outline",
      color: "warning",
      class: {
        base: "border-warning/40 text-warning hover:border-warning hover:bg-warning/8 active:bg-warning/15 focus-visible:ring-warning/40",
      },
    },
    {
      variant: "outline",
      color: "error",
      class: {
        base: "border-error/40 text-error hover:border-error hover:bg-error/8 active:bg-error/15 focus-visible:ring-error/40",
      },
    },
    {
      variant: "ghost",
      color: "primary",
      class: {
        base: "text-primary hover:bg-primary/8 active:bg-primary/15 focus-visible:ring-primary/40",
      },
    },
    {
      variant: "ghost",
      color: "secondary",
      class: {
        base: "text-secondary hover:bg-secondary/8 active:bg-secondary/15 focus-visible:ring-secondary/40",
      },
    },
    {
      variant: "ghost",
      color: "success",
      class: {
        base: "text-success hover:bg-success/8 active:bg-success/15 focus-visible:ring-success/40",
      },
    },
    {
      variant: "ghost",
      color: "info",
      class: {
        base: "text-info hover:bg-info/8 active:bg-info/15 focus-visible:ring-info/40",
      },
    },
    {
      variant: "ghost",
      color: "warning",
      class: {
        base: "text-warning hover:bg-warning/8 active:bg-warning/15 focus-visible:ring-warning/40",
      },
    },
    {
      variant: "ghost",
      color: "error",
      class: {
        base: "text-error hover:bg-error/8 active:bg-error/15 focus-visible:ring-error/40",
      },
    },
    {
      compact: true,
      size: "xs",
      class: { base: "h-5! gap-1! px-1.5! text-[11px]" },
    },
    {
      compact: true,
      size: "sm",
      class: { base: "h-6! gap-1! px-2! text-[11px]" },
    },
    {
      compact: true,
      size: "md",
      class: { base: "h-7! gap-1.5! px-2.5! text-xs" },
    },
    {
      compact: true,
      size: "lg",
      class: { base: "h-8! gap-1.5! px-3! text-xs" },
    },
    {
      compact: true,
      size: "xl",
      class: { base: "h-9! gap-2! px-3.5! text-sm" },
    },
  ],
  compoundSlots: [
    { size: "xs", slots: ["leadingIcon", "trailingIcon"], class: "size-3" },
    { size: "sm", slots: ["leadingIcon", "trailingIcon"], class: "size-3.5" },
    { size: "md", slots: ["leadingIcon", "trailingIcon"], class: "size-4" },
    { size: "lg", slots: ["leadingIcon", "trailingIcon"], class: "size-4" },
    { size: "xl", slots: ["leadingIcon", "trailingIcon"], class: "size-5" },
  ],
  defaultVariants: {
    variant: "solid",
    size: "md",
    color: "primary",
  },
});

type ButtonVariants = VariantProps<typeof button>;

export { button, type ButtonVariants };
