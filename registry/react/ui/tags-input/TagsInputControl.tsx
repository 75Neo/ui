import React from "react";
import { TagsInput as Ark } from "@ark-ui/react/tags-input";
import { cn } from "cn";
import { tagsInput } from "@/registry/shared/lib/tags-input.styles";

export interface TagsInputControlProps extends React.ComponentPropsWithRef<typeof Ark.Control> {}

export default function TagsInputControl({ className, children, ...props }: TagsInputControlProps) {
  const styles = tagsInput();

  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
