import type React from "react";
import { TagsInput as Ark } from "@ark-ui/react/tags-input";
import { cva } from "class-variance-authority";
import {
  cn,
  tagsInputControlCompoundData,
  tagsInputDefaults,
  tagsInputSizeData,
} from "@75neo/themes";
import { useTagsInputVariants } from "./variants";

const tagsInputControl = cva(
  "flex w-full min-w-0 flex-wrap items-center bg-default ring ring-accented ring-inset data-disabled:cursor-not-allowed data-disabled:opacity-75 data-invalid:ring-error",
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
      size: tagsInputSizeData.control,
    },
    compoundVariants: tagsInputControlCompoundData,
    defaultVariants: tagsInputDefaults,
  },
);

export interface TagsInputControlProps extends React.ComponentProps<typeof Ark.Control> {}

export function TagsInputControl({ className, children, ...rest }: TagsInputControlProps) {
  const variants = useTagsInputVariants();

  return (
    <Ark.Control
      {...rest}
      data-slot="tags-input-control"
      className={cn(tagsInputControl(variants), className)}
    >
      {children}
    </Ark.Control>
  );
}
