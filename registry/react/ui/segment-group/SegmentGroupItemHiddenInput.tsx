import React from "react";
import { SegmentGroup as Ark } from "@ark-ui/react/segment-group";

export interface SegmentGroupItemHiddenInputProps extends React.ComponentPropsWithRef<
  typeof Ark.ItemHiddenInput
> {}

export default function SegmentGroupItemHiddenInput(props: SegmentGroupItemHiddenInputProps) {
  return <Ark.ItemHiddenInput {...props} />;
}
