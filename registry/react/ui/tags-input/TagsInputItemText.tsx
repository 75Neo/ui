import React from "react";
import { TagsInput as Ark } from "@ark-ui/react/tags-input";
import { cn } from "cn";
import { tagsInputStyles as styles } from "@/registry/shared/lib/tags-input.styles";

export interface TagsInputItemTextProps extends React.ComponentPropsWithRef<typeof Ark.ItemText> {}

export default function TagsInputItemText({
  className,
  children,
  ...props
}: TagsInputItemTextProps) {
  return (
    <Ark.ItemText className={cn(styles.itemText(), className)} {...props}>
      {children}
    </Ark.ItemText>
  );
}
