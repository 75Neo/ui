import React from "react";
import { ToggleGroup as Ark } from "@ark-ui/react/toggle-group";
import { cn } from "cn";
import {
  toggleGroup,
  type ToggleGroupSize,
  type Intent,
} from "@/registry/shared/lib/toggle-group.styles";

export interface ToggleGroupProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Root>,
  "color"
> {
  color?: Intent;
  size?: ToggleGroupSize;
}

export default function ToggleGroup({
  size = "md",
  color,
  className,
  children,
  ...props
}: ToggleGroupProps) {
  const styles = toggleGroup({ color });

  return (
    <Ark.Root className={cn(styles.root(), className)} data-size={size} {...props}>
      {children}
    </Ark.Root>
  );
}
