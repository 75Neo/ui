import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";

export interface ColorPickerHiddenInputProps extends React.ComponentPropsWithRef<
  typeof Ark.HiddenInput
> {}

export default function ColorPickerHiddenInput(props: ColorPickerHiddenInputProps) {
  return <Ark.HiddenInput {...props} />;
}
