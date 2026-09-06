import type React from "react";
import { TagsInput as Ark } from "@ark-ui/react/tags-input";
import { cn } from "@75neo/themes";

export interface TagsInputLabelProps extends React.ComponentProps<typeof Ark.Label> {}

export function TagsInputLabel({ className, children, ...rest }: TagsInputLabelProps) {
  return (
    <Ark.Label
      {...rest}
      data-slot="tags-input-label"
      className={cn("font-medium text-highlighted select-none", className)}
    >
      {children}
    </Ark.Label>
  );
}
