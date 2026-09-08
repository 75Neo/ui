import { tv } from "tailwind-variants/lite";

export const signaturePad = tv({
  slots: {
    root: "flex w-full min-w-0 flex-col gap-2",
    label: "text-sm font-medium text-default",
    control:
      "relative h-40 w-full cursor-crosshair overflow-hidden rounded-md bg-default ring ring-default data-disabled:pointer-events-none data-disabled:opacity-75",
    segment: "size-full",
    guide: "absolute inset-x-6 bottom-6 border-b border-dashed border-default",
    clearTrigger:
      "self-end text-sm font-medium text-muted transition-colors hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
  },
});
