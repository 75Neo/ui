import React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cn } from "cn";
import { tourStyles as styles } from "@/registry/shared/lib/tour.styles";

export interface TourBackdropProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Backdrop>,
  "children"
> {}

export default function TourBackdrop({ className, ...props }: TourBackdropProps) {
  return <Ark.Backdrop className={cn(styles.backdrop(), className)} {...props} />;
}
