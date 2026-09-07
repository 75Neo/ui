import React from "react";
import { Toggle as Ark } from "@ark-ui/react/toggle";
import { cn } from "cn";
import { toggle, type ToggleSize } from "@/registry/shared/lib/toggle.styles";

export interface ToggleProps extends React.ComponentPropsWithRef<typeof Ark.Root> {
  size?: ToggleSize;
}

export default function Toggle({ size = "md", className, children, ...props }: ToggleProps) {
  const styles = toggle();

  return (
    <Ark.Root className={cn(styles.root(), className)} data-size={size} {...props}>
      {children}
    </Ark.Root>
  );
}
