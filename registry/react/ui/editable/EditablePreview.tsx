import React from "react";
import { Editable as Ark } from "@ark-ui/react/editable";
import { cn } from "cn";
import { editableStyles as styles } from "@/registry/shared/lib/editable.styles";

export interface EditablePreviewProps extends React.ComponentPropsWithRef<typeof Ark.Preview> {}

export default function EditablePreview({ className, ...props }: EditablePreviewProps) {
  return <Ark.Preview className={cn(styles.preview(), className)} {...props} />;
}
