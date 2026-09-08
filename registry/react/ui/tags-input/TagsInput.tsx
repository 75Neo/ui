import React from "react";
import { TagsInput as Ark } from "@ark-ui/react/tags-input";
import { cn } from "cn";
import {
  tagsInputStyles as styles,
  type TagsInputSize,
} from "@/registry/shared/lib/tags-input.styles";

export interface TagsInputProps extends React.ComponentPropsWithRef<typeof Ark.Root> {
  size?: TagsInputSize;
}

export default function TagsInput({ size = "md", className, children, ...props }: TagsInputProps) {
  return (
    <Ark.Root className={cn(styles.root(), className)} data-size={size} {...props}>
      {children}
    </Ark.Root>
  );
}
