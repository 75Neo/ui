import React from "react";
import { ImageCropper as Ark } from "@ark-ui/react/image-cropper";
import { cn } from "cn";
import { imageCropperStyles as styles } from "@/registry/shared/lib/image-cropper.styles";

export interface ImageCropperViewportProps extends React.ComponentPropsWithRef<
  typeof Ark.Viewport
> {}

export default function ImageCropperViewport({
  className,
  children,
  ...props
}: ImageCropperViewportProps) {
  return (
    <Ark.Viewport className={cn(styles.viewport(), className)} {...props}>
      {children}
    </Ark.Viewport>
  );
}
