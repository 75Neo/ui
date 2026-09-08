import React from "react";
import { ImageCropper as Ark } from "@ark-ui/react/image-cropper";
import { cn } from "cn";
import { imageCropperStyles as styles } from "@/registry/shared/lib/image-cropper.styles";

export interface ImageCropperHandleProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Handle>,
  "children"
> {}

export default function ImageCropperHandle({ className, ...props }: ImageCropperHandleProps) {
  return <Ark.Handle className={cn(styles.handle(), className)} {...props} />;
}
