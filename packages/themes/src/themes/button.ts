import { tv, type VariantProps } from "tailwind-variants";

export const button = tv({
  slots: {
    base: "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-transparent text-center align-middle font-medium whitespace-nowrap transition-[color,background-color,border-color,box-shadow] duration-150 outline-none select-none focus-visible:ring-[3px] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    leading: "shrink-0 [&>svg]:size-full",
    trailing: "shrink-0 [&>svg]:size-full",
    label: "min-w-0 truncate",
  },
  variants: {
    variant: {
      solid: {},
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
  },
  compoundVariants: [
    {
      variant: "solid",
      color: "primary",
      class: {
        base: "bg-primary text-primary-foreground shadow-xs hover:bg-primary-elevated focus-visible:ring-primary/50 active:bg-primary-elevated",
      },
    },
    {
      variant: "solid",
      color: "secondary",
      class: {
        base: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary-elevated focus-visible:ring-secondary/50 active:bg-secondary-elevated",
      },
    },
    {
      variant: "solid",
      color: "neutral",
      class: {
        base: "bg-neutral text-neutral-foreground shadow-xs hover:bg-neutral-elevated focus-visible:ring-neutral/50 active:bg-neutral-elevated",
      },
    },
    {
      variant: "solid",
      color: "success",
      class: {
        base: "bg-success text-success-foreground shadow-xs hover:bg-success-elevated focus-visible:ring-success/50 active:bg-success-elevated",
      },
    },
    {
      variant: "solid",
      color: "info",
      class: {
        base: "bg-info text-info-foreground shadow-xs hover:bg-info-elevated focus-visible:ring-info/50 active:bg-info-elevated",
      },
    },
    {
      variant: "solid",
      color: "warning",
      class: {
        base: "bg-warning text-warning-foreground shadow-xs hover:bg-warning-elevated focus-visible:ring-warning/50 active:bg-warning-elevated",
      },
    },
    {
      variant: "solid",
      color: "error",
      class: {
        base: "bg-error text-error-foreground shadow-xs hover:bg-error-elevated focus-visible:ring-error/50 active:bg-error-elevated",
      },
    },
    {
      variant: "soft",
      color: "primary",
      class: {
        base: "bg-primary-muted text-primary-emphasis hover:bg-primary-accented focus-visible:ring-primary/50 active:bg-primary-accented",
      },
    },
    {
      variant: "soft",
      color: "secondary",
      class: {
        base: "bg-secondary-muted text-secondary-emphasis hover:bg-secondary-accented focus-visible:ring-secondary/50 active:bg-secondary-accented",
      },
    },
    {
      variant: "soft",
      color: "neutral",
      class: {
        base: "bg-neutral-muted text-neutral-emphasis hover:bg-neutral-accented focus-visible:ring-neutral/50 active:bg-neutral-accented",
      },
    },
    {
      variant: "soft",
      color: "success",
      class: {
        base: "bg-success-muted text-success-emphasis hover:bg-success-accented focus-visible:ring-success/50 active:bg-success-accented",
      },
    },
    {
      variant: "soft",
      color: "info",
      class: {
        base: "bg-info-muted text-info-emphasis hover:bg-info-accented focus-visible:ring-info/50 active:bg-info-accented",
      },
    },
    {
      variant: "soft",
      color: "warning",
      class: {
        base: "bg-warning-muted text-warning-emphasis hover:bg-warning-accented focus-visible:ring-warning/50 active:bg-warning-accented",
      },
    },
    {
      variant: "soft",
      color: "error",
      class: {
        base: "bg-error-muted text-error-emphasis hover:bg-error-accented focus-visible:ring-error/50 active:bg-error-accented",
      },
    },
    {
      variant: "outline",
      color: "primary",
      class: {
        base: "border-primary-emphasis/40 text-primary-emphasis hover:border-primary-emphasis hover:bg-primary-muted focus-visible:ring-primary/50 active:bg-primary-accented",
      },
    },
    {
      variant: "outline",
      color: "secondary",
      class: {
        base: "border-secondary-emphasis/40 text-secondary-emphasis hover:border-secondary-emphasis hover:bg-secondary-muted focus-visible:ring-secondary/50 active:bg-secondary-accented",
      },
    },
    {
      variant: "outline",
      color: "neutral",
      class: {
        base: "border-neutral-emphasis/40 text-neutral-emphasis hover:border-neutral-emphasis hover:bg-neutral-muted focus-visible:ring-neutral/50 active:bg-neutral-accented",
      },
    },
    {
      variant: "outline",
      color: "success",
      class: {
        base: "border-success-emphasis/40 text-success-emphasis hover:border-success-emphasis hover:bg-success-muted focus-visible:ring-success/50 active:bg-success-accented",
      },
    },
    {
      variant: "outline",
      color: "info",
      class: {
        base: "border-info-emphasis/40 text-info-emphasis hover:border-info-emphasis hover:bg-info-muted focus-visible:ring-info/50 active:bg-info-accented",
      },
    },
    {
      variant: "outline",
      color: "warning",
      class: {
        base: "border-warning-emphasis/40 text-warning-emphasis hover:border-warning-emphasis hover:bg-warning-muted focus-visible:ring-warning/50 active:bg-warning-accented",
      },
    },
    {
      variant: "outline",
      color: "error",
      class: {
        base: "border-error-emphasis/40 text-error-emphasis hover:border-error-emphasis hover:bg-error-muted focus-visible:ring-error/50 active:bg-error-accented",
      },
    },
    {
      variant: "ghost",
      color: "primary",
      class: {
        base: "text-primary-emphasis hover:bg-primary-muted focus-visible:ring-primary/50 active:bg-primary-accented",
      },
    },
    {
      variant: "ghost",
      color: "secondary",
      class: {
        base: "text-secondary-emphasis hover:bg-secondary-muted focus-visible:ring-secondary/50 active:bg-secondary-accented",
      },
    },
    {
      variant: "ghost",
      color: "neutral",
      class: {
        base: "text-neutral-emphasis hover:bg-neutral-muted focus-visible:ring-neutral/50 active:bg-neutral-accented",
      },
    },
    {
      variant: "ghost",
      color: "success",
      class: {
        base: "text-success-emphasis hover:bg-success-muted focus-visible:ring-success/50 active:bg-success-accented",
      },
    },
    {
      variant: "ghost",
      color: "info",
      class: {
        base: "text-info-emphasis hover:bg-info-muted focus-visible:ring-info/50 active:bg-info-accented",
      },
    },
    {
      variant: "ghost",
      color: "warning",
      class: {
        base: "text-warning-emphasis hover:bg-warning-muted focus-visible:ring-warning/50 active:bg-warning-accented",
      },
    },
    {
      variant: "ghost",
      color: "error",
      class: {
        base: "text-error-emphasis hover:bg-error-muted focus-visible:ring-error/50 active:bg-error-accented",
      },
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

export type ButtonVariants = VariantProps<typeof button>;
export type ButtonSlots = keyof ReturnType<typeof button>;
