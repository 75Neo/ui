import React from "react";
import { ImageCropper as Ark } from "@ark-ui/react/image-cropper";
import { cn } from "cn";
import { imageCropperStyles as styles } from "@/registry/shared/lib/image-cropper.styles";

export interface ImageCropperSelectionProps extends React.ComponentPropsWithRef<
  typeof Ark.Selection
> {}

export default function ImageCropperSelection({
  className,
  children,
  ...props
}: ImageCropperSelectionProps) {
  return (
    <Ark.Selection className={cn(styles.selection(), className)} {...props}>
      {children}
    </Ark.Selection>
  );
}
