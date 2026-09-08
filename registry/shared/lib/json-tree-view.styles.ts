import { tv } from "tailwind-variants/lite";

export const jsonTreeView = tv({
  slots: {
    root: "w-full min-w-0 overflow-x-auto rounded-md bg-muted/40 p-3 ring ring-default",
    tree: "font-mono text-xs leading-6 text-muted [&_[data-kind=boolean]]:text-warning [&_[data-kind=function]]:text-secondary [&_[data-kind=null]]:text-dimmed [&_[data-kind=number]]:text-info [&_[data-kind=string]]:text-success [&_[data-kind=undefined]]:text-dimmed [&_[data-part=branch-text]]:text-default [&_[data-part=item-text]]:text-default",
  },
});
