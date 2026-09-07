import { tv } from "tailwind-variants/lite";

export const drawer = tv({
  slots: {
    backdrop: "fixed inset-0 z-50 bg-inverted/40",
    positioner:
      "fixed inset-0 z-50 flex data-[swipe-direction=down]:items-end data-[swipe-direction=left]:justify-start data-[swipe-direction=right]:justify-end data-[swipe-direction=up]:items-start",
    content:
      "relative flex flex-col gap-4 bg-default p-6 shadow-xl ring ring-default focus-visible:outline-none data-[swipe-direction=down]:h-auto data-[swipe-direction=down]:w-full data-[swipe-direction=left]:h-full data-[swipe-direction=left]:w-full data-[swipe-direction=left]:max-w-sm data-[swipe-direction=right]:h-full data-[swipe-direction=right]:w-full data-[swipe-direction=right]:max-w-sm data-[swipe-direction=up]:h-auto data-[swipe-direction=up]:w-full",
    title: "text-base font-semibold text-default",
    description: "text-sm leading-6 text-muted",
    grabber: "flex shrink-0 cursor-grab justify-center py-1",
    grabberIndicator: "h-1 w-10 rounded-full bg-accented",
    closeTrigger:
      "absolute end-4 top-4 inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&>svg]:size-4",
  },
});
