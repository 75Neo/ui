import { tv, type VariantProps } from "tailwind-variants/lite";

export type Color = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";

export const button = tv({
  slots: {
    base: "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md font-medium whitespace-nowrap transition-colors",
    leading: "shrink-0",
    trailing: "shrink-0",
    spinner: "shrink-0 animate-spin",
  },
  variants: {
    variant: {
      solid: "",
      outline: "",
      soft: "",
      subtle: "",
      ghost: "",
      link: "",
    },
    color: {
      primary: "",
      secondary: "",
      success: "",
      info: "",
      warning: "",
      error: "",
      neutral: "",
    },
    size: {
      xs: {
        base: "gap-1 px-2 py-1 text-xs",
        leading: "[&>svg]:size-3.5",
        trailing: "[&>svg]:size-3.5",
        spinner: "size-3.5",
      },
      sm: {
        base: "gap-1.5 px-2.5 py-1.5 text-xs",
        leading: "[&>svg]:size-4",
        trailing: "[&>svg]:size-4",
        spinner: "size-4",
      },
      md: {
        base: "gap-1.5 px-3 py-2 text-sm",
        leading: "[&>svg]:size-4",
        trailing: "[&>svg]:size-4",
        spinner: "size-4",
      },
      lg: {
        base: "gap-2 px-3.5 py-2 text-sm",
        leading: "[&>svg]:size-5",
        trailing: "[&>svg]:size-5",
        spinner: "size-5",
      },
      xl: {
        base: "gap-2 px-4 py-2.5 text-base",
        leading: "[&>svg]:size-6",
        trailing: "[&>svg]:size-6",
        spinner: "size-6",
      },
    },
    block: {
      true: "flex w-full",
    },
    square: {
      true: "aspect-square",
    },
    disabled: {
      true: "pointer-events-none opacity-60 shadow-none",
    },
  },
  compoundVariants: [
    // Hues follow one recipe: states are opacity steps over the single token,
    // the focus ring takes the same color. Classes are written out literally
    // so Tailwind can scan them in the shipped files.
    {
      color: "primary",
      variant: "solid",
      class:
        "bg-primary text-inverted shadow-xs outline-primary/25 hover:bg-primary/75 focus-visible:outline-3 active:bg-primary/75",
    },
    {
      color: "primary",
      variant: "outline",
      class:
        "text-primary shadow-xs ring ring-primary/50 outline-primary/25 ring-inset hover:bg-primary/10 focus-visible:ring-primary focus-visible:outline-3 active:bg-primary/10",
    },
    {
      color: "primary",
      variant: "soft",
      class:
        "bg-primary/10 text-primary outline-primary/25 hover:bg-primary/15 focus-visible:outline-3 active:bg-primary/15",
    },
    {
      color: "primary",
      variant: "subtle",
      class:
        "bg-primary/10 text-primary ring ring-primary/25 outline-primary/25 ring-inset hover:bg-primary/15 focus-visible:ring-primary focus-visible:outline-3 active:bg-primary/15",
    },
    {
      color: "primary",
      variant: "ghost",
      class:
        "text-primary outline-primary/25 hover:bg-primary/10 focus-visible:outline-3 active:bg-primary/10",
    },
    {
      color: "primary",
      variant: "link",
      class:
        "text-primary underline-offset-4 outline-primary/25 hover:text-primary/75 focus-visible:outline-3 active:text-primary/75",
    },
    {
      color: "success",
      variant: "solid",
      class:
        "bg-success text-inverted shadow-xs outline-success/25 hover:bg-success/75 focus-visible:outline-3 active:bg-success/75",
    },
    {
      color: "success",
      variant: "outline",
      class:
        "text-success shadow-xs ring ring-success/50 outline-success/25 ring-inset hover:bg-success/10 focus-visible:ring-success focus-visible:outline-3 active:bg-success/10",
    },
    {
      color: "success",
      variant: "soft",
      class:
        "bg-success/10 text-success outline-success/25 hover:bg-success/15 focus-visible:outline-3 active:bg-success/15",
    },
    {
      color: "success",
      variant: "subtle",
      class:
        "bg-success/10 text-success ring ring-success/25 outline-success/25 ring-inset hover:bg-success/15 focus-visible:ring-success focus-visible:outline-3 active:bg-success/15",
    },
    {
      color: "success",
      variant: "ghost",
      class:
        "text-success outline-success/25 hover:bg-success/10 focus-visible:outline-3 active:bg-success/10",
    },
    {
      color: "success",
      variant: "link",
      class:
        "text-success underline-offset-4 outline-success/25 hover:text-success/75 focus-visible:outline-3 active:text-success/75",
    },
    {
      color: "info",
      variant: "solid",
      class:
        "bg-info text-inverted shadow-xs outline-info/25 hover:bg-info/75 focus-visible:outline-3 active:bg-info/75",
    },
    {
      color: "info",
      variant: "outline",
      class:
        "text-info shadow-xs ring ring-info/50 outline-info/25 ring-inset hover:bg-info/10 focus-visible:ring-info focus-visible:outline-3 active:bg-info/10",
    },
    {
      color: "info",
      variant: "soft",
      class:
        "bg-info/10 text-info outline-info/25 hover:bg-info/15 focus-visible:outline-3 active:bg-info/15",
    },
    {
      color: "info",
      variant: "subtle",
      class:
        "bg-info/10 text-info ring ring-info/25 outline-info/25 ring-inset hover:bg-info/15 focus-visible:ring-info focus-visible:outline-3 active:bg-info/15",
    },
    {
      color: "info",
      variant: "ghost",
      class: "text-info outline-info/25 hover:bg-info/10 focus-visible:outline-3 active:bg-info/10",
    },
    {
      color: "info",
      variant: "link",
      class:
        "text-info underline-offset-4 outline-info/25 hover:text-info/75 focus-visible:outline-3 active:text-info/75",
    },
    {
      color: "warning",
      variant: "solid",
      class:
        "bg-warning text-inverted shadow-xs outline-warning/25 hover:bg-warning/75 focus-visible:outline-3 active:bg-warning/75",
    },
    {
      color: "warning",
      variant: "outline",
      class:
        "text-warning shadow-xs ring ring-warning/50 outline-warning/25 ring-inset hover:bg-warning/10 focus-visible:ring-warning focus-visible:outline-3 active:bg-warning/10",
    },
    {
      color: "warning",
      variant: "soft",
      class:
        "bg-warning/10 text-warning outline-warning/25 hover:bg-warning/15 focus-visible:outline-3 active:bg-warning/15",
    },
    {
      color: "warning",
      variant: "subtle",
      class:
        "bg-warning/10 text-warning ring ring-warning/25 outline-warning/25 ring-inset hover:bg-warning/15 focus-visible:ring-warning focus-visible:outline-3 active:bg-warning/15",
    },
    {
      color: "warning",
      variant: "ghost",
      class:
        "text-warning outline-warning/25 hover:bg-warning/10 focus-visible:outline-3 active:bg-warning/10",
    },
    {
      color: "warning",
      variant: "link",
      class:
        "text-warning underline-offset-4 outline-warning/25 hover:text-warning/75 focus-visible:outline-3 active:text-warning/75",
    },
    {
      color: "error",
      variant: "solid",
      class:
        "bg-error text-inverted shadow-xs outline-error/25 hover:bg-error/75 focus-visible:outline-3 active:bg-error/75",
    },
    {
      color: "error",
      variant: "outline",
      class:
        "text-error shadow-xs ring ring-error/50 outline-error/25 ring-inset hover:bg-error/10 focus-visible:ring-error focus-visible:outline-3 active:bg-error/10",
    },
    {
      color: "error",
      variant: "soft",
      class:
        "bg-error/10 text-error outline-error/25 hover:bg-error/15 focus-visible:outline-3 active:bg-error/15",
    },
    {
      color: "error",
      variant: "subtle",
      class:
        "bg-error/10 text-error ring ring-error/25 outline-error/25 ring-inset hover:bg-error/15 focus-visible:ring-error focus-visible:outline-3 active:bg-error/15",
    },
    {
      color: "error",
      variant: "ghost",
      class:
        "text-error outline-error/25 hover:bg-error/10 focus-visible:outline-3 active:bg-error/10",
    },
    {
      color: "error",
      variant: "link",
      class:
        "text-error underline-offset-4 outline-error/25 hover:text-error/75 focus-visible:outline-3 active:text-error/75",
    },
    // Secondary is a light surface, so it reads dark text instead of inverted.
    {
      color: "secondary",
      variant: "solid",
      class:
        "bg-secondary text-default shadow-xs outline-secondary/25 hover:bg-secondary/75 focus-visible:outline-3 active:bg-secondary/75",
    },
    {
      color: "secondary",
      variant: "outline",
      class:
        "bg-default text-default shadow-xs ring ring-accented outline-secondary/25 ring-inset hover:bg-secondary/10 focus-visible:ring-secondary focus-visible:outline-3 active:bg-secondary/10",
    },
    {
      color: "secondary",
      variant: "soft",
      class:
        "bg-secondary/10 text-default outline-secondary/25 hover:bg-secondary/15 focus-visible:outline-3 active:bg-secondary/15",
    },
    {
      color: "secondary",
      variant: "subtle",
      class:
        "bg-secondary/10 text-default ring ring-secondary/25 outline-secondary/25 ring-inset hover:bg-secondary/15 focus-visible:ring-secondary focus-visible:outline-3 active:bg-secondary/15",
    },
    {
      color: "secondary",
      variant: "ghost",
      class:
        "text-default outline-secondary/25 hover:bg-secondary/10 focus-visible:outline-3 active:bg-secondary/10",
    },
    {
      color: "secondary",
      variant: "link",
      class:
        "text-muted underline-offset-4 outline-secondary/25 hover:text-default focus-visible:outline-3 active:text-default",
    },
    // Neutral draws on the neutral system rather than a hue.
    {
      color: "neutral",
      variant: "solid",
      class:
        "bg-inverted text-inverted shadow-xs outline-inverted/25 hover:bg-inverted/90 focus-visible:outline-3 active:bg-inverted/90",
    },
    {
      color: "neutral",
      variant: "outline",
      class:
        "bg-default text-default shadow-xs ring ring-accented outline-inverted/25 ring-inset hover:bg-elevated focus-visible:ring-inverted focus-visible:outline-3 active:bg-elevated",
    },
    {
      color: "neutral",
      variant: "soft",
      class:
        "bg-elevated text-default outline-inverted/25 hover:bg-accented/75 focus-visible:outline-3 active:bg-accented/75",
    },
    {
      color: "neutral",
      variant: "subtle",
      class:
        "bg-elevated text-default ring ring-accented outline-inverted/25 ring-inset hover:bg-accented/75 focus-visible:ring-inverted focus-visible:outline-3 active:bg-accented/75",
    },
    {
      color: "neutral",
      variant: "ghost",
      class:
        "text-default outline-inverted/25 hover:bg-elevated focus-visible:outline-3 active:bg-elevated",
    },
    {
      color: "neutral",
      variant: "link",
      class:
        "text-muted underline-offset-4 outline-inverted/25 hover:text-default focus-visible:outline-3 active:text-default",
    },
    { square: true, size: "xs", class: "p-1" },
    { square: true, size: "sm", class: "p-1.5" },
    { square: true, size: "md", class: "p-2" },
    { square: true, size: "lg", class: "p-2" },
    { square: true, size: "xl", class: "p-2.5" },
  ],
  defaultVariants: {
    variant: "solid",
    color: "primary",
    size: "md",
  },
});

export type ButtonVariants = VariantProps<typeof button>;

export const buttonStyles = button();
