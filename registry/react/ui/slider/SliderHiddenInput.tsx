import React from "react";
import { Slider as Ark } from "@ark-ui/react/slider";

export interface SliderHiddenInputProps extends React.ComponentPropsWithRef<
  typeof Ark.HiddenInput
> {}

export default function SliderHiddenInput(props: SliderHiddenInputProps) {
  return <Ark.HiddenInput {...props} />;
}
