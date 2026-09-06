import type React from "react";
import { Switch as Ark } from "@ark-ui/react/switch";
import { cva } from "class-variance-authority";
import { cn, switchControlCompoundData, switchDefaults, switchSizeData } from "@75neo/themes";
import { useSwitchVariants } from "./variants";

const switchControl = cva(
  "inline-flex shrink-0 items-center rounded-full bg-accented p-0.5 ring ring-transparent transition-colors ring-inset data-focus-visible:outline-3 data-invalid:ring-error hover:data-[state=unchecked]:bg-accented/75",
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
      size: switchSizeData.control,
    },
    compoundVariants: switchControlCompoundData,
    defaultVariants: switchDefaults,
  },
);

export interface SwitchControlProps extends React.ComponentProps<typeof Ark.Control> {}

export function SwitchControl({ className, children, ...rest }: SwitchControlProps) {
  const variants = useSwitchVariants();

  return (
    <Ark.Control
      {...rest}
      data-slot="switch-control"
      className={cn(switchControl(variants), className)}
    >
      {children}
    </Ark.Control>
  );
}
