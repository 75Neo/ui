import { tv } from "tailwind-variants/lite";

export const field = tv({
  slots: {
    root: "flex w-full min-w-0 flex-col gap-1.5",
    label:
      "flex items-center gap-1 text-sm font-medium text-default data-disabled:opacity-75 data-invalid:text-error",
    requiredIndicator: "text-error",
    input:
      "h-9 w-full min-w-0 rounded-md bg-default px-3 text-sm text-default ring ring-default transition-colors outline-none placeholder:text-dimmed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-disabled:pointer-events-none data-disabled:opacity-75 data-invalid:ring-error",
    textarea:
      "min-h-20 w-full min-w-0 rounded-md bg-default px-3 py-2 text-sm leading-6 text-default ring ring-default transition-colors outline-none placeholder:text-dimmed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-disabled:pointer-events-none data-disabled:opacity-75 data-invalid:ring-error",
    select:
      "h-9 w-full min-w-0 cursor-pointer appearance-none rounded-md bg-default px-3 text-sm text-default ring ring-default transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-disabled:pointer-events-none data-disabled:opacity-75 data-invalid:ring-error",
    helperText: "text-xs leading-5 text-muted",
    errorText: "flex items-center gap-1.5 text-xs leading-5 text-error [&>svg]:size-3.5",
  },
});
