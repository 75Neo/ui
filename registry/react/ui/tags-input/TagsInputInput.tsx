import React from "react";
import { TagsInput as Ark } from "@ark-ui/react/tags-input";
import { cn } from "cn";
import { tagsInput } from "@/registry/shared/lib/tags-input.styles";

export interface TagsInputInputProps extends React.ComponentPropsWithRef<typeof Ark.Input> {}

export default function TagsInputInput({ className, ...props }: TagsInputInputProps) {
  const styles = tagsInput();

  return <Ark.Input className={cn(styles.input(), className)} {...props} />;
}
