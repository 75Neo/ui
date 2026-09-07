import React from "react";
import { ToggleGroup as Ark } from "@ark-ui/react/toggle-group";
import { cn } from "cn";
import { toggleGroup, type ToggleGroupSize } from "@/registry/shared/lib/toggle-group.styles";

export interface ToggleGroupProps extends React.ComponentPropsWithRef<typeof Ark.Root> {
  size?: ToggleGroupSize;
}

export default function ToggleGroup({
  size = "md",
  className,
  children,
  ...props
}: ToggleGroupProps) {
  const styles = toggleGroup();

  return (
    <Ark.Root className={cn(styles.root(), className)} data-size={size} {...props}>
      {children}
    </Ark.Root>
  );
}
