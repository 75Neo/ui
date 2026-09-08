import React from "react";
import { Select as Ark } from "@ark-ui/react/select";

export interface SelectHiddenSelectProps extends React.ComponentPropsWithRef<
  typeof Ark.HiddenSelect
> {}

export default function SelectHiddenSelect(props: SelectHiddenSelectProps) {
  return <Ark.HiddenSelect {...props} />;
}
