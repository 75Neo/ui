import type React from "react";
import { TagsInput as Ark } from "@ark-ui/react/tags-input";
import { cva } from "class-variance-authority";
import { cn, tagsInputDefaults, tagsInputSizeData } from "@75neo/themes";
import { useTagsInputVariants } from "./variants";

const tagsInputItemInput = cva(
  "min-w-0 rounded-sm bg-elevated text-highlighted ring-1 ring-accented outline-none ring-inset",
  {
    variants: { size: tagsInputSizeData.itemInput },
    defaultVariants: tagsInputDefaults,
  },
);

export interface TagsInputItemInputProps extends React.ComponentProps<typeof Ark.ItemInput> {}

export function TagsInputItemInput({ className, ...rest }: TagsInputItemInputProps) {
  const variants = useTagsInputVariants();

  return (
    <Ark.ItemInput
      {...rest}
      data-slot="tags-input-item-input"
      className={cn(tagsInputItemInput(variants), className)}
    />
  );
}
