import React from "react";
import { Checkbox as Ark } from "@ark-ui/react/checkbox";

export interface CheckboxHiddenInputProps extends React.ComponentPropsWithRef<
  typeof Ark.HiddenInput
> {}

export default function CheckboxHiddenInput(props: CheckboxHiddenInputProps) {
  return <Ark.HiddenInput {...props} />;
}
