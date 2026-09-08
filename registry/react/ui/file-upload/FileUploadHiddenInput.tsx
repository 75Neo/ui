import React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";

export interface FileUploadHiddenInputProps extends React.ComponentPropsWithRef<
  typeof Ark.HiddenInput
> {}

export default function FileUploadHiddenInput(props: FileUploadHiddenInputProps) {
  return <Ark.HiddenInput {...props} />;
}
