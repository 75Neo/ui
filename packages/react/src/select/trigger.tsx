import type React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cva } from "class-variance-authority";
import { cn, selectDefaults, selectSizeData, selectTriggerCompoundData } from "@75neo/themes";
import { useSelectVariants } from "./variants";

const selectTrigger = cva(
  "flex w-full min-w-0 cursor-pointer items-center bg-default text-start text-highlighted ring ring-accented outline-none ring-inset disabled:cursor-not-allowed disabled:opacity-75 data-invalid:ring-error data-[placeholder-shown]:text-dimmed",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: selectSizeData.trigger,
    },
    compoundVariants: selectTriggerCompoundData,
    defaultVariants: selectDefaults,
  },
);

export interface SelectTriggerProps extends React.ComponentProps<typeof Ark.Trigger> {}

export function SelectTrigger({ className, children, ...rest }: SelectTriggerProps) {
  const variants = useSelectVariants();

  return (
    <Ark.Trigger
      {...rest}
      data-slot="select-trigger"
      className={cn(selectTrigger(variants), className)}
    >
      {children}
    </Ark.Trigger>
  );
}
