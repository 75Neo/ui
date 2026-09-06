import type React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { cn } from "@75neo/themes";

export interface StepsItemProps extends React.ComponentProps<typeof Ark.Item> {
  children?: React.ReactNode;
}

export function StepsItem({ index, className, children, ...rest }: StepsItemProps) {
  return (
    <Ark.Item
      {...rest}
      index={index}
      data-slot="steps-item"
      className={cn(
        "flex min-w-0 flex-1 items-center gap-2 last:flex-none data-[orientation=vertical]:items-start",
        className,
      )}
    >
      {children}
    </Ark.Item>
  );
}
