import React from "react";
import { SignaturePad as Ark } from "@ark-ui/react/signature-pad";

export interface SignaturePadHiddenInputProps extends React.ComponentPropsWithRef<
  typeof Ark.HiddenInput
> {}

export default function SignaturePadHiddenInput(props: SignaturePadHiddenInputProps) {
  return <Ark.HiddenInput {...props} />;
}
