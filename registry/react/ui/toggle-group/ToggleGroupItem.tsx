import React from "react";
import { ToggleGroup as Ark } from "@ark-ui/react/toggle-group";
import { cn } from "cn";
import { toggleGroup } from "@/registry/shared/lib/toggle-group.styles";

export interface ToggleGroupItemProps extends React.ComponentPropsWithRef<typeof Ark.Item> {}

export default function ToggleGroupItem({ className, children, ...props }: ToggleGroupItemProps) {
  const styles = toggleGroup();

  return (
    <Ark.Item className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.Item>
  );
}
