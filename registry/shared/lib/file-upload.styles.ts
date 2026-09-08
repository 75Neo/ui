import { tv } from "tailwind-variants/lite";

export const fileUpload = tv({
  slots: {
    root: "flex w-full min-w-0 flex-col gap-3",
    label: "text-sm font-medium text-default",
    dropzone:
      "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-default px-6 py-10 text-center text-sm text-muted transition-colors hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-dragging:border-primary data-dragging:bg-primary-soft data-invalid:border-error",
    trigger:
      "inline-flex h-9 cursor-pointer items-center justify-center rounded-md px-3 text-sm font-medium text-muted ring ring-default transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
    itemGroup: "flex flex-col gap-2",
    item: "flex items-center gap-3 rounded-md p-2 ring ring-default",
    itemPreview:
      "flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-muted text-dimmed [&>svg]:size-4",
    itemPreviewImage: "size-full object-cover",
    itemName: "min-w-0 flex-1 truncate text-sm text-default",
    itemSizeText: "shrink-0 text-xs text-dimmed tabular-nums",
    itemDeleteTrigger:
      "inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors hover:bg-muted hover:text-error focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&>svg]:size-4",
    clearTrigger:
      "self-start text-sm font-medium text-muted transition-colors hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
  },
});

export const fileUploadStyles = fileUpload();
