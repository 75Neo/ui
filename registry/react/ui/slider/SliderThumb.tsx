import React from "react";
import { Slider as Ark } from "@ark-ui/react/slider";
import { cn } from "cn";
import { slider } from "@/registry/shared/lib/slider.styles";

export interface SliderThumbProps extends React.ComponentPropsWithRef<typeof Ark.Thumb> {}

export default function SliderThumb({ className, children, ...props }: SliderThumbProps) {
  const styles = slider();

  return (
    <Ark.Thumb className={cn(styles.thumb(), className)} {...props}>
      {children}
    </Ark.Thumb>
  );
}
