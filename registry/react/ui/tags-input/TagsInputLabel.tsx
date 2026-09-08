import React from "react";
import { TagsInput as Ark } from "@ark-ui/react/tags-input";
import { cn } from "cn";
import { tagsInputStyles as styles } from "@/registry/shared/lib/tags-input.styles";

export interface TagsInputLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function TagsInputLabel({ className, children, ...props }: TagsInputLabelProps) {
  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
