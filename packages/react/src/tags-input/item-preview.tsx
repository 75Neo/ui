import type React from "react";
import { TagsInput as Ark } from "@ark-ui/react/tags-input";
import { cva } from "class-variance-authority";
import {
  cn,
  tagsInputDefaults,
  tagsInputItemPreviewCompoundData,
  tagsInputSizeData,
} from "@75neo/themes";
import { useTagsInputVariants } from "./variants";

const tagsInputItemPreview = cva(
  "inline-flex min-w-0 items-center rounded-sm bg-elevated text-toned select-none data-disabled:cursor-not-allowed data-disabled:opacity-75",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: tagsInputSizeData.itemPreview,
    },
    compoundVariants: tagsInputItemPreviewCompoundData,
    defaultVariants: tagsInputDefaults,
  },
);

export interface TagsInputItemPreviewProps extends React.ComponentProps<typeof Ark.ItemPreview> {}

export function TagsInputItemPreview({ className, children, ...rest }: TagsInputItemPreviewProps) {
  const variants = useTagsInputVariants();

  return (
    <Ark.ItemPreview
      {...rest}
      data-slot="tags-input-item-preview"
      className={cn(tagsInputItemPreview(variants), className)}
    >
      {children}
    </Ark.ItemPreview>
  );
}
