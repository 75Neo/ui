import { tv } from "tailwind-variants/lite";

export const passwordInput = tv({
  slots: {
    root: "flex w-full min-w-0 flex-col gap-1.5",
    label: "text-sm font-medium text-default",
    control: "relative flex w-full min-w-0 items-center",
    input:
      "h-9 w-full min-w-0 rounded-md bg-default ps-3 pe-10 text-sm text-default ring ring-default transition-colors outline-none placeholder:text-dimmed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-disabled:pointer-events-none data-disabled:opacity-75 data-invalid:ring-error",
    visibilityTrigger:
      "absolute end-1 inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
    indicator: "[&>svg]:size-4",
  },
});

export const passwordInputStyles = passwordInput();
