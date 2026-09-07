import React from "react";
import { Slider as Ark } from "@ark-ui/react/slider";
import { cn } from "cn";
import { slider } from "@/registry/shared/lib/slider.styles";

export interface SliderControlProps extends React.ComponentPropsWithRef<typeof Ark.Control> {}

export default function SliderControl({ className, children, ...props }: SliderControlProps) {
  const styles = slider();

  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
