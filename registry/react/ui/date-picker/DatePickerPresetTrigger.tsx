import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerPresetTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.PresetTrigger
> {}

export default function DatePickerPresetTrigger({
  className,
  children,
  ...props
}: DatePickerPresetTriggerProps) {
  const styles = datePicker();

  return (
    <Ark.PresetTrigger className={cn(styles.presetTrigger(), className)} {...props}>
      {children}
    </Ark.PresetTrigger>
  );
}
