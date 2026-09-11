import { tv } from "tailwind-variants/lite";

export const toc = tv({
  slots: {
    root: "flex w-full min-w-0 flex-col gap-2.5 text-sm",
    title: "font-medium text-default",
    list: "relative flex min-w-0 flex-col border-s border-default",
    item: "flex min-w-0 ps-[calc(0.75rem*(var(--depth)-2))]",
    link: "block w-full rounded-md py-1 ps-3 pe-2 text-muted no-underline transition-colors hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted data-active:font-medium data-active:text-primary",
    indicator:
      "absolute -start-px top-(--top) h-(--height) w-px bg-primary transition-[top,height] duration-200 ease-out",
  },
});

export const tocStyles = toc();
