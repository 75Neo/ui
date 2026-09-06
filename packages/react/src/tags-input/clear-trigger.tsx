import type React from "react";
import { TagsInput as Ark } from "@ark-ui/react/tags-input";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn, tagsInputDefaults, tagsInputSizeData } from "@75neo/themes";
import { useTagsInputVariants } from "./variants";

const tagsInputClearTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-dimmed transition-colors outline-none hover:text-default disabled:cursor-not-allowed [&>svg]:size-full",
  {
    variants: { size: tagsInputSizeData.clearTrigger },
    defaultVariants: tagsInputDefaults,
  },
);

export interface TagsInputClearTriggerProps extends React.ComponentProps<typeof Ark.ClearTrigger> {}

export function TagsInputClearTrigger({
  className,
  children,
  ...rest
}: TagsInputClearTriggerProps) {
  const variants = useTagsInputVariants();

  return (
    <Ark.ClearTrigger
      {...rest}
      data-slot="tags-input-clear-trigger"
      className={cn(tagsInputClearTrigger(variants), className)}
    >
      {children ?? <X />}
    </Ark.ClearTrigger>
  );
}
