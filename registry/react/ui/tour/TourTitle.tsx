import React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cn } from "cn";
import { tourStyles as styles } from "@/registry/shared/lib/tour.styles";

export interface TourTitleProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Title>,
  "children"
> {}

export default function TourTitle({ className, ...props }: TourTitleProps) {
  return <Ark.Title className={cn(styles.title(), className)} {...props} />;
}
