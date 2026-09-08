import React from "react";
import { AngleSlider as Ark } from "@ark-ui/react/angle-slider";
import { cn } from "cn";
import { angleSliderStyles as styles } from "@/registry/shared/lib/angle-slider.styles";

export interface AngleSliderProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function AngleSlider({ className, children, ...props }: AngleSliderProps) {
  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
