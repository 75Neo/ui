import { tv } from "tailwind-variants/lite";

export const pinInput = tv({
  slots: {
    root: "group/pin-input flex flex-col gap-1.5",
    label: "text-sm font-medium text-default",
    control: "flex items-center gap-2",
    input:
      "rounded-md bg-default text-center font-mono text-default ring ring-default transition-colors outline-none group-data-[size=lg]/pin-input:size-12 group-data-[size=lg]/pin-input:text-base group-data-[size=md]/pin-input:size-10 group-data-[size=md]/pin-input:text-sm group-data-[size=sm]/pin-input:size-8 group-data-[size=sm]/pin-input:text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-disabled:pointer-events-none data-disabled:opacity-75 data-invalid:ring-error",
  },
});

export type PinInputSize = "sm" | "md" | "lg";
