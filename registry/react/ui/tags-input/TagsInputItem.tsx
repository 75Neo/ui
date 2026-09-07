import React from "react";
import { TagsInput as Ark } from "@ark-ui/react/tags-input";
import { cn } from "cn";
import { tagsInput } from "@/registry/shared/lib/tags-input.styles";

export interface TagsInputItemProps extends React.ComponentPropsWithRef<typeof Ark.Item> {}

export default function TagsInputItem({ className, children, ...props }: TagsInputItemProps) {
  const styles = tagsInput();

  return (
    <Ark.Item className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.Item>
  );
}
