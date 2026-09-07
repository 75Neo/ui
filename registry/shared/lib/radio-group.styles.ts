import { tv } from "tailwind-variants/lite";

export const radioGroup = tv({
  slots: {
    root: "group/radio-group flex flex-col gap-2.5 data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:gap-5",
    label: "text-sm font-medium text-default",
    item: "inline-flex cursor-pointer items-center gap-2.5 text-default group-data-[size=lg]/radio-group:text-base group-data-[size=md]/radio-group:text-sm group-data-[size=sm]/radio-group:text-xs data-disabled:cursor-not-allowed data-disabled:opacity-75",
    itemControl:
      "relative flex shrink-0 rounded-full ring ring-default transition-colors group-data-[size=lg]/radio-group:size-6 group-data-[size=md]/radio-group:size-5 group-data-[size=sm]/radio-group:size-4 after:absolute after:inset-[27%] after:rounded-full after:bg-default after:opacity-0 after:transition-opacity data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary data-invalid:ring-error data-[state=checked]:bg-primary data-[state=checked]:ring-primary data-[state=checked]:after:opacity-100",
    itemText: "leading-tight select-none",
  },
});

export type RadioGroupSize = "sm" | "md" | "lg";
