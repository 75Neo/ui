import React from "react";
import { ImageCropper as Ark } from "@ark-ui/react/image-cropper";
import { cn } from "cn";
import { imageCropperStyles as styles } from "@/registry/shared/lib/image-cropper.styles";

export interface ImageCropperImageProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Image>,
  "children"
> {}

export default function ImageCropperImage({ className, ...props }: ImageCropperImageProps) {
  return <Ark.Image className={cn(styles.image(), className)} {...props} />;
}
