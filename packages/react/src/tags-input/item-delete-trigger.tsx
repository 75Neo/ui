import type React from "react";
import { TagsInput as Ark } from "@ark-ui/react/tags-input";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn, tagsInputDefaults, tagsInputSizeData } from "@75neo/themes";
import { useTagsInputVariants } from "./variants";

const tagsInputItemDeleteTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-xs text-dimmed transition-colors outline-none hover:text-default disabled:cursor-not-allowed [&>svg]:size-full",
  {
    variants: { size: tagsInputSizeData.itemDeleteTrigger },
    defaultVariants: tagsInputDefaults,
  },
);

export interface TagsInputItemDeleteTriggerProps extends React.ComponentProps<
  typeof Ark.ItemDeleteTrigger
> {}

export function TagsInputItemDeleteTrigger({
  className,
  children,
  ...rest
}: TagsInputItemDeleteTriggerProps) {
  const variants = useTagsInputVariants();

  return (
    <Ark.ItemDeleteTrigger
      {...rest}
      data-slot="tags-input-item-delete-trigger"
      className={cn(tagsInputItemDeleteTrigger(variants), className)}
    >
      {children ?? <X />}
    </Ark.ItemDeleteTrigger>
  );
}
