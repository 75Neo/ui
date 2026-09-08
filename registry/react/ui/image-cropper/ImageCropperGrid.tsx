import React from "react";
import { ImageCropper as Ark } from "@ark-ui/react/image-cropper";
import { cn } from "cn";
import { imageCropper } from "@/registry/shared/lib/image-cropper.styles";

export interface ImageCropperGridProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Grid>,
  "children"
> {}

export default function ImageCropperGrid({ className, ...props }: ImageCropperGridProps) {
  const styles = imageCropper();

  return <Ark.Grid className={cn(styles.grid(), className)} {...props} />;
}
