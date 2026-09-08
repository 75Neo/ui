import React from "react";
import { Slider as Ark } from "@ark-ui/react/slider";
import { cn } from "cn";
import { slider, type Intent } from "@/registry/shared/lib/slider.styles";

export interface SliderProps extends Omit<React.ComponentPropsWithRef<typeof Ark.Root>, "color"> {
  color?: Intent;
}

export default function Slider({ color, className, children, ...props }: SliderProps) {
  const styles = slider({ color });

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
