import type React from "react";
import { TagsInput as Ark } from "@ark-ui/react/tags-input";
import { cn } from "@75neo/themes";

export interface TagsInputItemProps extends React.ComponentProps<typeof Ark.Item> {
  children?: React.ReactNode;
}

export function TagsInputItem({ className, children, ...rest }: TagsInputItemProps) {
  return (
    <Ark.Item
      {...rest}
      data-slot="tags-input-item"
      className={cn("inline-flex min-w-0", className)}
    >
      {children}
    </Ark.Item>
  );
}
