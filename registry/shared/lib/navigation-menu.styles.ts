import { tv } from "tailwind-variants/lite";

export const navigationMenu = tv({
  slots: {
    root: "group/nav-menu relative flex w-full min-w-0",
    list: "flex min-w-0 items-center gap-1 data-[orientation=vertical]:w-full data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
    item: "relative flex min-w-0 shrink-0 data-disabled:pointer-events-none data-disabled:opacity-75 data-[orientation=vertical]:w-full",
    trigger:
      "group/nav-trigger inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 rounded-md font-medium text-muted transition-colors select-none group-data-[orientation=vertical]/nav-menu:w-full group-data-[orientation=vertical]/nav-menu:justify-between group-data-[size=lg]/nav-menu:h-10 group-data-[size=lg]/nav-menu:px-3.5 group-data-[size=lg]/nav-menu:text-sm group-data-[size=md]/nav-menu:h-9 group-data-[size=md]/nav-menu:px-3 group-data-[size=md]/nav-menu:text-sm group-data-[size=sm]/nav-menu:h-8 group-data-[size=sm]/nav-menu:px-2.5 group-data-[size=sm]/nav-menu:text-xs hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none data-[state=open]:bg-muted data-[state=open]:text-default",
    triggerLeading:
      "shrink-0 text-dimmed group-data-[size=lg]/nav-menu:size-5 group-data-[size=md]/nav-menu:size-4 group-data-[size=sm]/nav-menu:size-3.5 [&>svg]:size-full",
    triggerTrailing:
      "shrink-0 text-dimmed transition-transform duration-200 group-data-[size=lg]/nav-menu:size-5 group-data-[size=md]/nav-menu:size-4 group-data-[size=sm]/nav-menu:size-3.5 group-data-[state=open]/nav-trigger:rotate-180 [&>svg]:size-full",
    content:
      "absolute z-50 flex max-w-[min(26rem,calc(100vw-2rem))] min-w-52 flex-col gap-0.5 rounded-md bg-elevated p-1.5 shadow-lg ring ring-default data-[orientation=horizontal]:start-0 data-[orientation=horizontal]:top-full data-[orientation=horizontal]:mt-1.5 data-[orientation=vertical]:start-full data-[orientation=vertical]:top-0 data-[orientation=vertical]:ms-1.5 data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
    link: "flex min-w-0 cursor-pointer items-center gap-2.5 rounded-md text-muted no-underline transition-colors select-none group-data-[size=lg]/nav-menu:px-3 group-data-[size=lg]/nav-menu:py-2.5 group-data-[size=lg]/nav-menu:text-sm group-data-[size=md]/nav-menu:px-2.5 group-data-[size=md]/nav-menu:py-2 group-data-[size=md]/nav-menu:text-sm group-data-[size=sm]/nav-menu:px-2 group-data-[size=sm]/nav-menu:py-1.5 group-data-[size=sm]/nav-menu:text-xs hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-current:font-medium data-current:text-primary",
  },
});

export type NavigationMenuSize = "sm" | "md" | "lg";
