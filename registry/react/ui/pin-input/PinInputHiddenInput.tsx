import React from "react";
import { PinInput as Ark } from "@ark-ui/react/pin-input";

export interface PinInputHiddenInputProps extends React.ComponentPropsWithRef<
  typeof Ark.HiddenInput
> {}

export default function PinInputHiddenInput(props: PinInputHiddenInputProps) {
  return <Ark.HiddenInput {...props} />;
}
