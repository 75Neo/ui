import { tv, type VariantProps } from "tailwind-variants";

const avatar = tv({
  slots: {
    root: "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full align-middle select-none",
    image: "h-full w-full rounded-[inherit] object-cover",
    fallback: "flex size-full items-center justify-center truncate font-medium uppercase",
    icon: "shrink-0",
  },
  variants: {
    size: {
      xs: {
        root: "size-6 text-xs",
      },
      sm: {
        root: "size-7 text-sm",
      },
      md: {
        root: "size-8 text-base",
      },
      lg: {
        root: "size-9 text-lg",
      },
      xl: {
        root: "size-10 text-xl",
      },
    },
    color: {
      primary: {
        root: "bg-primary/10",
        fallback: "text-primary",
        icon: "text-primary",
      },
      secondary: {
        root: "bg-secondary/10",
        fallback: "text-secondary",
        icon: "text-secondary",
      },
      success: {
        root: "bg-success/10",
        fallback: "text-success",
        icon: "text-success",
      },
      info: {
        root: "bg-info/10",
        fallback: "text-info",
        icon: "text-info",
      },
      warning: {
        root: "bg-warning/10",
        fallback: "text-warning",
        icon: "text-warning",
      },
      error: {
        root: "bg-error/10",
        fallback: "text-error",
        icon: "text-error",
      },
      neutral: {
        root: "bg-elevated",
        fallback: "text-muted",
        icon: "text-muted",
      },
    },
    shape: {
      circle: {
        root: "rounded-full",
      },
      square: {
        root: "rounded-lg",
      },
    },
  },
  defaultVariants: {
    size: "md",
    color: "neutral",
    shape: "circle",
  },
});

type AvatarVariants = VariantProps<typeof avatar>;

export { avatar, type AvatarVariants };
