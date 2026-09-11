import { tv } from "tailwind-variants/lite";

export const toast = tv({
  slots: {
    group: "z-50 outline-none",
    root: "flex w-(--width) flex-col gap-1 rounded-md bg-elevated p-4 shadow-lg ring ring-default transition-[translate,scale,opacity] duration-200 ease-out",
    title: "text-sm font-medium text-default",
    description: "text-sm leading-5 text-muted",
    actionTrigger:
      "mt-1 self-start rounded-md text-sm font-medium text-primary transition-colors hover:text-primary/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    closeTrigger:
      "absolute end-2 top-2 inline-flex size-6 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted [&>svg]:size-3.5",
  },
});

export const toastStyles = toast();
