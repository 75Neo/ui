import React from "react";
import { TagsInput as Ark } from "@ark-ui/react/tags-input";
import { cn } from "cn";
import { tagsInput } from "@/registry/shared/lib/tags-input.styles";

export interface TagsInputProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function TagsInput({ className, children, ...props }: TagsInputProps) {
  const styles = tagsInput();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
