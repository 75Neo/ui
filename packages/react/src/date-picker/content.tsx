import type React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cva } from "class-variance-authority";
import { Portal } from "@ark-ui/react/portal";
import { cn, datePickerDefaults, datePickerSizeData } from "@75neo/themes";
import { useDatePickerVariants } from "./variants";

const datePickerContent = cva("rounded-md bg-default shadow-lg ring ring-accented outline-none", {
  variants: { size: datePickerSizeData.content },
  defaultVariants: datePickerDefaults,
});

export interface DatePickerContentProps extends React.ComponentProps<typeof Ark.Content> {
  /** Render the panel at the end of `body`. @defaultValue `true` */
  portal?: boolean;
}

export function DatePickerContent({
  portal,
  className,
  children,
  ...rest
}: DatePickerContentProps) {
  const variants = useDatePickerVariants();
  const panel = (
    <Ark.Positioner data-slot="date-picker-positioner" className="z-50">
      <Ark.Content
        {...rest}
        data-slot="date-picker-content"
        className={cn(datePickerContent(variants), className)}
      >
        {children}
      </Ark.Content>
    </Ark.Positioner>
  );

  if (portal ?? true) return <Portal>{panel}</Portal>;
  return panel;
}
