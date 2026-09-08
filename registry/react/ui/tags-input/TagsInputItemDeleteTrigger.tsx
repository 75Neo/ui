import React from "react";
import { TagsInput as Ark } from "@ark-ui/react/tags-input";
import { cn } from "cn";
import { tagsInputStyles as styles } from "@/registry/shared/lib/tags-input.styles";

export interface TagsInputItemDeleteTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.ItemDeleteTrigger
> {}

export default function TagsInputItemDeleteTrigger({
  className,
  children,
  ...props
}: TagsInputItemDeleteTriggerProps) {
  return (
    <Ark.ItemDeleteTrigger className={cn(styles.itemDeleteTrigger(), className)} {...props}>
      {children}
    </Ark.ItemDeleteTrigger>
  );
}
