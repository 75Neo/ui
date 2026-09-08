import React from "react";
import { NumberInput as Ark } from "@ark-ui/react/number-input";
import { cn } from "cn";
import { numberInputStyles as styles } from "@/registry/shared/lib/number-input.styles";

export interface NumberInputScrubberProps extends React.ComponentPropsWithRef<
  typeof Ark.Scrubber
> {}

export default function NumberInputScrubber({ className, ...props }: NumberInputScrubberProps) {
  return <Ark.Scrubber className={cn(styles.scrubber(), className)} {...props} />;
}
