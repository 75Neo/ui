import React from "react";
import { Switch as Ark } from "@ark-ui/react/switch";

export interface SwitchHiddenInputProps extends React.ComponentPropsWithRef<
  typeof Ark.HiddenInput
> {}

export default function SwitchHiddenInput(props: SwitchHiddenInputProps) {
  return <Ark.HiddenInput {...props} />;
}
