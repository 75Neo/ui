import type React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { byColor, cn } from "@75neo/themes";
import { useStepsVariants } from "./variants";

const stepsProgressFill = {
  ...byColor((color) => `bg-${color}`),
  neutral: "bg-inverted",
} as const;

export interface StepsProgressProps extends React.ComponentProps<typeof Ark.Progress> {}

export function StepsProgress({ className, ...rest }: StepsProgressProps) {
  const variants = useStepsVariants();

  return (
    <Ark.Progress
      {...rest}
      data-slot="steps-progress"
      className={cn("h-1 w-full overflow-hidden rounded-full bg-elevated", className)}
    >
      <span
        data-slot="steps-progress-fill"
        data-color={variants.color}
        style={{ width: "calc(var(--percent) * 1%)" }}
        className={cn("block h-full rounded-full", stepsProgressFill[variants.color])}
      />
    </Ark.Progress>
  );
}
