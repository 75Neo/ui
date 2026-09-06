import type React from "react";
import { TagsInput as Ark } from "@ark-ui/react/tags-input";
import { cva } from "class-variance-authority";
import { cn, tagsInputDefaults, tagsInputSizeData } from "@75neo/themes";
import { useTagsInputVariants } from "./variants";

const tagsInputInput = cva(
  "min-w-24 flex-1 bg-transparent text-highlighted outline-none placeholder:text-dimmed disabled:cursor-not-allowed",
  {
    variants: { size: tagsInputSizeData.input },
    defaultVariants: tagsInputDefaults,
  },
);

export interface TagsInputInputProps extends React.ComponentProps<typeof Ark.Input> {
  /** Shown in the field while nothing is being typed. */
  placeholder?: string;
}

export function TagsInputInput({ placeholder, className, ...rest }: TagsInputInputProps) {
  const variants = useTagsInputVariants();

  return (
    <Ark.Input
      {...rest}
      data-slot="tags-input-input"
      placeholder={placeholder}
      className={cn(tagsInputInput(variants), className)}
    />
  );
}
