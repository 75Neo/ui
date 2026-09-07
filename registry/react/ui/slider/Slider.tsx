import React from "react";
import { Slider as Ark } from "@ark-ui/react/slider";
import { cn } from "cn";
import { slider } from "@/registry/shared/lib/slider.styles";

export interface SliderProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function Slider({ className, children, ...props }: SliderProps) {
  const styles = slider();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
