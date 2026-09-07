import { tv } from "tailwind-variants/lite";

export const editable = tv({
  slots: {
    root: "flex w-full min-w-0 flex-col gap-1.5",
    label: "text-sm font-medium text-default",
    area: "inline-flex w-full min-w-0",
    preview:
      "w-full cursor-text rounded-md px-2 py-1 text-sm text-default transition-colors hover:bg-muted data-placeholder-shown:text-dimmed",
    input:
      "w-full rounded-md bg-default px-2 py-1 text-sm text-default ring ring-default outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-invalid:ring-error",
    control: "flex items-center gap-1",
    editTrigger:
      "inline-flex h-7 cursor-pointer items-center rounded-md px-2 text-xs font-medium text-muted transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    submitTrigger:
      "inline-flex h-7 cursor-pointer items-center rounded-md px-2 text-xs font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    cancelTrigger:
      "inline-flex h-7 cursor-pointer items-center rounded-md px-2 text-xs font-medium text-muted transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  },
});
