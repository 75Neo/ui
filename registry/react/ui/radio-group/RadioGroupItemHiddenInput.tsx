import React from "react";
import { RadioGroup as Ark } from "@ark-ui/react/radio-group";

export interface RadioGroupItemHiddenInputProps extends React.ComponentPropsWithRef<
  typeof Ark.ItemHiddenInput
> {}

export default function RadioGroupItemHiddenInput(props: RadioGroupItemHiddenInputProps) {
  return <Ark.ItemHiddenInput {...props} />;
}
