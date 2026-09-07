import React from "react";
import { RatingGroup as Ark } from "@ark-ui/react/rating-group";

export interface RatingGroupHiddenInputProps extends React.ComponentPropsWithRef<
  typeof Ark.HiddenInput
> {}

export default function RatingGroupHiddenInput(props: RatingGroupHiddenInputProps) {
  return <Ark.HiddenInput {...props} />;
}
