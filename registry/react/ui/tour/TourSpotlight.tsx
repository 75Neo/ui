import React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cn } from "cn";
import { tourStyles as styles } from "@/registry/shared/lib/tour.styles";

export interface TourSpotlightProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Spotlight>,
  "children"
> {}

export default function TourSpotlight({ className, ...props }: TourSpotlightProps) {
  return <Ark.Spotlight className={cn(styles.spotlight(), className)} {...props} />;
}
