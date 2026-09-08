import React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cn } from "cn";
import { tourStyles as styles } from "@/registry/shared/lib/tour.styles";

export interface TourDescriptionProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Description>,
  "children"
> {}

export default function TourDescription({ className, ...props }: TourDescriptionProps) {
  return <Ark.Description className={cn(styles.description(), className)} {...props} />;
}
