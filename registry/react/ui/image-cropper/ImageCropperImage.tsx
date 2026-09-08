import React from "react";
import { ImageCropper as Ark } from "@ark-ui/react/image-cropper";
import { cn } from "cn";
import { imageCropper } from "@/registry/shared/lib/image-cropper.styles";

export interface ImageCropperImageProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Image>,
  "children"
> {}

export default function ImageCropperImage({ className, ...props }: ImageCropperImageProps) {
  const styles = imageCropper();

  return <Ark.Image className={cn(styles.image(), className)} {...props} />;
}
