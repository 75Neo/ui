import { tv, type VariantProps } from "tailwind-variants";

const avatar = tv({
  slots: {
    root: "bg-muted relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full align-middle select-none",
    image: "size-full object-cover",
    fallback:
      "text-muted flex size-full items-center justify-center font-medium tracking-tight uppercase",
  },
  variants: {
    size: {
      xs: {
        root: "size-6",
        fallback: "text-[10px]",
      },
      sm: {
        root: "size-8",
        fallback: "text-xs",
      },
      md: {
        root: "size-10",
        fallback: "text-sm",
      },
      lg: {
        root: "size-12",
        fallback: "text-base",
      },
      xl: {
        root: "size-16",
        fallback: "text-lg",
      },
      "2xl": {
        root: "size-20",
        fallback: "text-xl",
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
    shape: "circle",
  },
});

type AvatarVariants = VariantProps<typeof avatar>;

export { avatar, type AvatarVariants };
