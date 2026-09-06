import type React from "react";
import { TagsInput as Ark } from "@ark-ui/react/tags-input";
import { cn } from "@75neo/themes";

export interface TagsInputItemTextProps extends React.ComponentProps<typeof Ark.ItemText> {}

export function TagsInputItemText({ className, children, ...rest }: TagsInputItemTextProps) {
  return (
    <Ark.ItemText {...rest} data-slot="tags-input-item-text" className={cn("truncate", className)}>
      {children}
    </Ark.ItemText>
  );
}
