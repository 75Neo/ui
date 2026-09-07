import { tv } from "tailwind-variants/lite";

export const pinInput = tv({
  slots: {
    root: "flex flex-col gap-1.5",
    label: "text-sm font-medium text-default",
    control: "flex items-center gap-2",
    input:
      "size-10 rounded-md bg-default text-center font-mono text-sm text-default ring ring-default transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-disabled:pointer-events-none data-disabled:opacity-75 data-invalid:ring-error",
  },
});
