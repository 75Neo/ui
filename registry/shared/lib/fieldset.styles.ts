import { tv } from "tailwind-variants/lite";

export const fieldset = tv({
  slots: {
    root: "flex w-full min-w-0 flex-col gap-4 rounded-md p-4 ring ring-default data-disabled:opacity-75",
    legend: "px-1 text-sm font-medium text-default data-invalid:text-error",
    helperText: "text-xs leading-5 text-muted",
    errorText: "flex items-center gap-1.5 text-xs leading-5 text-error [&>svg]:size-3.5",
  },
});
