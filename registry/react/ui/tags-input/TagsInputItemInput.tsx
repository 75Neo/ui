import React from "react";
import { TagsInput as Ark } from "@ark-ui/react/tags-input";
import { cn } from "cn";
import { tagsInputStyles as styles } from "@/registry/shared/lib/tags-input.styles";

export interface TagsInputItemInputProps extends React.ComponentPropsWithRef<
  typeof Ark.ItemInput
> {}

export default function TagsInputItemInput({ className, ...props }: TagsInputItemInputProps) {
  return <Ark.ItemInput className={cn(styles.itemInput(), className)} {...props} />;
}
