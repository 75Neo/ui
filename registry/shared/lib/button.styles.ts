import { tv, type VariantProps } from "tailwind-variants/lite";
import { focusRing, intent } from "@/registry/shared/lib/intent.styles";

export const button = tv({
  slots: {
    base: `inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md font-medium whitespace-nowrap transition-colors ${focusRing}`,
    leading: "shrink-0",
    trailing: "shrink-0",
    spinner: "shrink-0 animate-spin",
  },
  variants: {
    variant: {
      solid: "bg-(--intent) text-(--intent-fg) shadow-xs hover:bg-(--intent-hover)",
      outline:
        "text-(--intent-soft-fg) shadow-xs ring ring-(--intent-border) ring-inset hover:bg-(--intent-soft)",
      soft: "bg-(--intent-soft) text-(--intent-soft-fg) hover:bg-(--intent-border)",
      subtle:
        "bg-(--intent-soft) text-(--intent-soft-fg) ring ring-(--intent-border) ring-inset hover:bg-(--intent-border)",
      ghost: "text-(--intent-soft-fg) hover:bg-(--intent-soft)",
      link: "text-(--intent-soft-fg) underline-offset-4 hover:underline",
    },
    color: intent,
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
