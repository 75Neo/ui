import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  slots: {
    base: "focus-visible:ring-offset-primary inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-transparent text-center align-middle font-medium transition-colors duration-150 outline-none select-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-75",
    leading: "shrink-0 [&>svg]:size-full",
    label: "min-w-0 truncate",
    trailing: "shrink-0 [&>svg]:size-full",
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
      color: "neutral",
      class: {
        base: "bg-inverted text-inverted hover:bg-inverted/90 active:bg-inverted/90 focus-visible:ring-inverted/40",
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
        base: "bg-warning hover:bg-warning/90 active:bg-warning/80 focus-visible:ring-warning/40 font-semibold text-neutral-950",
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
        base: "bg-primary/10 text-primary hover:bg-primary/18 active:bg-primary/26 dark:bg-primary/15 dark:text-primary dark:hover:bg-primary/25 dark:active:bg-primary/35 focus-visible:ring-primary/40",
      },
    },
    {
      variant: "soft",
      color: "secondary",
      class: {
        base: "bg-secondary/10 text-secondary hover:bg-secondary/18 active:bg-secondary/26 dark:bg-secondary/15 dark:text-secondary dark:hover:bg-secondary/25 dark:active:bg-secondary/35 focus-visible:ring-secondary/40",
      },
    },
    {
      variant: "soft",
      color: "neutral",
      class: {
        base: "bg-elevated text-default hover:bg-accented active:bg-accented dark:bg-accented dark:hover:bg-elevated dark:active:bg-elevated focus-visible:ring-inverted/40",
      },
    },
    {
      variant: "soft",
      color: "success",
      class: {
        base: "bg-success/10 text-success hover:bg-success/18 active:bg-success/26 dark:bg-success/15 dark:text-success dark:hover:bg-success/25 dark:active:bg-success/35 focus-visible:ring-success/40",
      },
    },
    {
      variant: "soft",
      color: "info",
      class: {
        base: "bg-info/10 text-info hover:bg-info/18 active:bg-info/26 dark:bg-info/15 dark:text-info dark:hover:bg-info/25 dark:active:bg-info/35 focus-visible:ring-info/40",
      },
    },
    {
      variant: "soft",
      color: "warning",
      class: {
        base: "bg-warning/15 hover:bg-warning/22 active:bg-warning/30 dark:bg-warning/15 dark:text-warning dark:hover:bg-warning/25 dark:active:bg-warning/35 focus-visible:ring-warning/40 text-neutral-900",
      },
    },
    {
      variant: "soft",
      color: "error",
      class: {
        base: "bg-error/10 text-error hover:bg-error/18 active:bg-error/26 dark:bg-error/15 dark:text-error dark:hover:bg-error/25 dark:active:bg-error/35 focus-visible:ring-error/40",
      },
    },
    {
      variant: "outline",
      color: "primary",
      class: {
        base: "border-primary/45 text-primary hover:border-primary hover:bg-primary/10 active:bg-primary/18 dark:border-primary/50 dark:text-primary dark:hover:border-primary dark:hover:bg-primary/15 dark:active:bg-primary/25 focus-visible:ring-primary/40",
      },
    },
    {
      variant: "outline",
      color: "secondary",
      class: {
        base: "border-secondary/45 text-secondary hover:border-secondary hover:bg-secondary/10 active:bg-secondary/18 dark:border-secondary/50 dark:hover:border-secondary dark:hover:bg-secondary/15 dark:active:bg-secondary/25 focus-visible:ring-secondary/40",
      },
    },
    {
      variant: "outline",
      color: "neutral",
      class: {
        base: "border-default text-default hover:border-accented hover:bg-elevated active:bg-elevated dark:border-accented dark:hover:border-default dark:hover:bg-accented dark:active:bg-accented focus-visible:ring-inverted/40",
      },
    },
    {
      variant: "outline",
      color: "success",
      class: {
        base: "border-success/45 text-success hover:border-success hover:bg-success/10 active:bg-success/18 dark:border-success/50 dark:hover:border-success dark:hover:bg-success/15 dark:active:bg-success/25 focus-visible:ring-success/40",
      },
    },
    {
      variant: "outline",
      color: "info",
      class: {
        base: "border-info/45 text-info hover:border-info hover:bg-info/10 active:bg-info/18 dark:border-info/50 dark:hover:border-info dark:hover:bg-info/15 dark:active:bg-info/25 focus-visible:ring-info/40",
      },
    },
    {
      variant: "outline",
      color: "warning",
      class: {
        base: "border-warning/55 hover:border-warning hover:bg-warning/10 active:bg-warning/18 dark:border-warning/50 dark:text-warning dark:hover:border-warning dark:hover:bg-warning/15 dark:active:bg-warning/25 focus-visible:ring-warning/40 text-neutral-900",
      },
    },
    {
      variant: "outline",
      color: "error",
      class: {
        base: "border-error/45 text-error hover:border-error hover:bg-error/10 active:bg-error/18 dark:border-error/50 dark:hover:border-error dark:hover:bg-error/15 dark:active:bg-error/25 focus-visible:ring-error/40",
      },
    },
    {
      variant: "ghost",
      color: "primary",
      class: {
        base: "text-primary hover:bg-primary/10 active:bg-primary/18 dark:hover:bg-primary/15 dark:active:bg-primary/25 focus-visible:ring-primary/40",
      },
    },
    {
      variant: "ghost",
      color: "secondary",
      class: {
        base: "text-secondary hover:bg-secondary/10 active:bg-secondary/18 dark:hover:bg-secondary/15 dark:active:bg-secondary/25 focus-visible:ring-secondary/40",
      },
    },
    {
      variant: "ghost",
      color: "neutral",
      class: {
        base: "text-default hover:bg-elevated active:bg-elevated dark:hover:bg-accented dark:active:bg-accented focus-visible:ring-inverted/40",
      },
    },
    {
      variant: "ghost",
      color: "success",
      class: {
        base: "text-success hover:bg-success/10 active:bg-success/18 dark:hover:bg-success/15 dark:active:bg-success/25 focus-visible:ring-success/40",
      },
    },
    {
      variant: "ghost",
      color: "info",
      class: {
        base: "text-info hover:bg-info/10 active:bg-info/18 dark:hover:bg-info/15 dark:active:bg-info/25 focus-visible:ring-info/40",
      },
    },
    {
      variant: "ghost",
      color: "warning",
      class: {
        base: "hover:bg-warning/10 active:bg-warning/18 dark:text-warning dark:hover:bg-warning/15 dark:active:bg-warning/25 focus-visible:ring-warning/40 text-neutral-900",
      },
    },
    {
      variant: "ghost",
      color: "error",
      class: {
        base: "text-error hover:bg-error/10 active:bg-error/18 dark:hover:bg-error/15 dark:active:bg-error/25 focus-visible:ring-error/40",
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
    { size: "xs", slots: ["leading", "trailing"], class: "size-3" },
    { size: "sm", slots: ["leading", "trailing"], class: "size-3.5" },
    { size: "md", slots: ["leading", "trailing"], class: "size-4" },
    { size: "lg", slots: ["leading", "trailing"], class: "size-4" },
    { size: "xl", slots: ["leading", "trailing"], class: "size-5" },
  ],
  defaultVariants: {
    variant: "solid",
    size: "md",
    color: "primary",
  },
});

type ButtonVariants = VariantProps<typeof button>;

export { button, type ButtonVariants };
