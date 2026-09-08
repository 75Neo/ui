import { tv } from "tailwind-variants/lite";

export const container = tv({
  base: "mx-auto w-full max-w-(--ui-container) px-5 sm:px-8 lg:px-12",
});

export const containerStyles = container();
