import React from "react";
import { TagsInput as Ark } from "@ark-ui/react/tags-input";
import { cn } from "cn";
import { tagsInput } from "@/registry/shared/lib/tags-input.styles";

export interface TagsInputItemPreviewProps extends React.ComponentPropsWithRef<
  typeof Ark.ItemPreview
> {}

export default function TagsInputItemPreview({
  className,
  children,
  ...props
}: TagsInputItemPreviewProps) {
  const styles = tagsInput();

  return (
    <Ark.ItemPreview className={cn(styles.itemPreview(), className)} {...props}>
      {children}
    </Ark.ItemPreview>
  );
}
