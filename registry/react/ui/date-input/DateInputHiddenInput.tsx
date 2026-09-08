import React from "react";
import { DateInput as Ark } from "@ark-ui/react/date-input";

export interface DateInputHiddenInputProps extends React.ComponentPropsWithRef<
  typeof Ark.HiddenInput
> {}

export default function DateInputHiddenInput(props: DateInputHiddenInputProps) {
  return <Ark.HiddenInput {...props} />;
}
