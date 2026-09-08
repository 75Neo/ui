import React from "react";
import { ImageCropper as Ark } from "@ark-ui/react/image-cropper";
import { cn } from "cn";
import { imageCropperStyles as styles } from "@/registry/shared/lib/image-cropper.styles";

export interface ImageCropperProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function ImageCropper({ className, children, ...props }: ImageCropperProps) {
  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
