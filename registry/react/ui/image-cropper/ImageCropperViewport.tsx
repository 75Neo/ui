import React from "react";
import { ImageCropper as Ark } from "@ark-ui/react/image-cropper";
import { cn } from "cn";
import { imageCropper } from "@/registry/shared/lib/image-cropper.styles";

export interface ImageCropperViewportProps extends React.ComponentPropsWithRef<
  typeof Ark.Viewport
> {}

export default function ImageCropperViewport({
  className,
  children,
  ...props
}: ImageCropperViewportProps) {
  const styles = imageCropper();

  return (
    <Ark.Viewport className={cn(styles.viewport(), className)} {...props}>
      {children}
    </Ark.Viewport>
  );
}
