import React from "react";
import { TagsInput as Ark } from "@ark-ui/react/tags-input";
import { cn } from "cn";
import { tagsInput } from "@/registry/shared/lib/tags-input.styles";

export interface TagsInputItemDeleteTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.ItemDeleteTrigger
> {}

export default function TagsInputItemDeleteTrigger({
  className,
  children,
  ...props
}: TagsInputItemDeleteTriggerProps) {
  const styles = tagsInput();

  return (
    <Ark.ItemDeleteTrigger className={cn(styles.itemDeleteTrigger(), className)} {...props}>
      {children}
    </Ark.ItemDeleteTrigger>
  );
}
