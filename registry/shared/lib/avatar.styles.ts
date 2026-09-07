import { tv } from "tailwind-variants/lite";

export const avatar = tv({
  slots: {
    root: "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted font-medium text-muted select-none data-[size=lg]:size-12 data-[size=lg]:text-base data-[size=md]:size-10 data-[size=md]:text-sm data-[size=sm]:size-8 data-[size=sm]:text-xs data-[size=xl]:size-14 data-[size=xl]:text-lg data-[size=xs]:size-6 data-[size=xs]:text-[0.625rem]",
    image: "size-full object-cover",
    fallback: "leading-none uppercase",
  },
});

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
