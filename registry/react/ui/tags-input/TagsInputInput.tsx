import React from "react";
import { TagsInput as Ark } from "@ark-ui/react/tags-input";
import { cn } from "cn";
import { tagsInputStyles as styles } from "@/registry/shared/lib/tags-input.styles";

export interface TagsInputInputProps extends React.ComponentPropsWithRef<typeof Ark.Input> {}

export default function TagsInputInput({ className, ...props }: TagsInputInputProps) {
  return <Ark.Input className={cn(styles.input(), className)} {...props} />;
}
