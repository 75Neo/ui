import { tv } from "tailwind-variants/lite";

export const imageCropper = tv({
  slots: {
    root: "flex w-full min-w-0 flex-col gap-3",
    viewport:
      "relative w-full touch-none overflow-hidden rounded-md bg-inverted/80 select-none data-dragging:cursor-grabbing",
    image: "max-w-none select-none",
    selection:
      "absolute cursor-move shadow-[0_0_0_9999px_rgb(0_0_0/0.5)] outline-2 outline-white data-[shape=circle]:rounded-full",
    handle: "absolute size-3 rounded-full bg-white shadow-sm",
    grid: "pointer-events-none absolute inset-0 opacity-0 transition-opacity data-dragging:opacity-100",
  },
});
