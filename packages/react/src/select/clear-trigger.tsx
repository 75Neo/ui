import type React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn, selectDefaults, selectSizeData } from "@75neo/themes";
import { useSelectVariants } from "./variants";

const selectClearTrigger = cva(
  "pointer-events-auto inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-dimmed transition-colors outline-none hover:text-default disabled:cursor-not-allowed [&>svg]:size-full",
  {
    variants: { size: selectSizeData.clearTrigger },
    defaultVariants: selectDefaults,
  },
);

export interface SelectClearTriggerProps extends React.ComponentProps<typeof Ark.ClearTrigger> {}

export function SelectClearTrigger({ className, children, ...rest }: SelectClearTriggerProps) {
  const variants = useSelectVariants();

  return (
    <Ark.ClearTrigger
      {...rest}
      data-slot="select-clear-trigger"
      className={cn(selectClearTrigger(variants), className)}
    >
      {children ?? <X />}
    </Ark.ClearTrigger>
  );
}
