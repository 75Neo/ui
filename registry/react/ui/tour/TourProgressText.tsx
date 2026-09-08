import React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cn } from "cn";
import { tourStyles as styles } from "@/registry/shared/lib/tour.styles";

export interface TourProgressTextProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.ProgressText>,
  "children"
> {}

export default function TourProgressText({ className, ...props }: TourProgressTextProps) {
  return <Ark.ProgressText className={cn(styles.progressText(), className)} {...props} />;
}
