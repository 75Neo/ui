import React from "react";
import { TagsInput as Ark } from "@ark-ui/react/tags-input";

export interface TagsInputHiddenInputProps extends React.ComponentPropsWithRef<
  typeof Ark.HiddenInput
> {}

export default function TagsInputHiddenInput(props: TagsInputHiddenInputProps) {
  return <Ark.HiddenInput {...props} />;
}
