import type React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import {
  cn,
  selectDefaults,
  selectSizeData,
  type SelectIndicatorProps as SelectIndicatorContract,
} from "@75neo/themes";
import { useSelectVariants } from "./variants";

const selectIndicator = cva(
  "inline-flex shrink-0 items-center justify-center text-dimmed transition-transform [&>svg]:size-full",
  {
    variants: {
      size: selectSizeData.indicator,
      spin: { true: "data-[state=open]:rotate-180", false: "" },
    },
    defaultVariants: { ...selectDefaults, spin: true },
  },
);

export interface SelectIndicatorProps
  extends React.ComponentProps<typeof Ark.Indicator>, SelectIndicatorContract {}

export function SelectIndicator({ spin, className, children, ...rest }: SelectIndicatorProps) {
  const variants = useSelectVariants();

  return (
    <Ark.Indicator
      {...rest}
      data-slot="select-indicator"
      className={cn(selectIndicator({ ...variants, spin }), className)}
    >
      {children ?? <ChevronDown />}
    </Ark.Indicator>
  );
}
