import type React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { cn } from "@75neo/themes";

export interface StepsListProps extends React.ComponentProps<typeof Ark.List> {
  children?: React.ReactNode;
}

export function StepsList({ className, children, ...rest }: StepsListProps) {
  return (
    <Ark.List
      {...rest}
      data-slot="steps-list"
      className={cn(
        "flex w-full items-center justify-between gap-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
        className,
      )}
    >
      {children}
    </Ark.List>
  );
}
