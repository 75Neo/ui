import React from "react";
import { AngleSlider as Ark } from "@ark-ui/react/angle-slider";

export interface AngleSliderHiddenInputProps extends React.ComponentPropsWithRef<
  typeof Ark.HiddenInput
> {}

export default function AngleSliderHiddenInput(props: AngleSliderHiddenInputProps) {
  return <Ark.HiddenInput {...props} />;
}
