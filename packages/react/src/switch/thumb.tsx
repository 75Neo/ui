import type React from "react";
import { Switch as Ark } from "@ark-ui/react/switch";
import { cva } from "class-variance-authority";
import { cn, switchDefaults, switchSizeData } from "@75neo/themes";
import { useSwitchVariants } from "./variants";

const switchThumb = cva(
  "group/thumb pointer-events-none flex items-center justify-center rounded-full bg-default text-default shadow-sm",
  {
    variants: { size: switchSizeData.thumb },
    defaultVariants: switchDefaults,
  },
);

const switchCheckedIcon = cva(
  "hidden shrink-0 group-data-[state=checked]/thumb:block [&>svg]:size-full",
  {
    variants: {
      size: switchSizeData.checkedIcon,
      loading: { true: "animate-spin", false: "" },
    },
    defaultVariants: switchDefaults,
  },
);

const switchUncheckedIcon = cva(
  "block shrink-0 group-data-[state=checked]/thumb:hidden [&>svg]:size-full",
  {
    variants: {
      size: switchSizeData.uncheckedIcon,
      loading: { true: "animate-spin", false: "" },
    },
    defaultVariants: switchDefaults,
  },
);

export interface SwitchThumbProps extends React.ComponentProps<typeof Ark.Thumb> {
  /** Shown inside the thumb while on. Spins while loading. */
  checkedIcon?: React.ReactNode;
  /** Shown inside the thumb while off. Spins while loading. */
  uncheckedIcon?: React.ReactNode;
}

export function SwitchThumb({
  checkedIcon,
  uncheckedIcon,
  className,
  children,
  ...rest
}: SwitchThumbProps) {
  const variants = useSwitchVariants();

  return (
    <Ark.Thumb {...rest} data-slot="switch-thumb" className={cn(switchThumb(variants), className)}>
      {children ?? (
        <>
          <span data-slot="switch-checked-icon" className={cn(switchCheckedIcon(variants))}>
            {checkedIcon}
          </span>
          <span data-slot="switch-unchecked-icon" className={cn(switchUncheckedIcon(variants))}>
            {uncheckedIcon}
          </span>
        </>
      )}
    </Ark.Thumb>
  );
}
