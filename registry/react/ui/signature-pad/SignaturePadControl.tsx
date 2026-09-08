import React from "react";
import { SignaturePad as Ark } from "@ark-ui/react/signature-pad";
import { cn } from "cn";
import { signaturePad } from "@/registry/shared/lib/signature-pad.styles";

export interface SignaturePadControlProps extends React.ComponentPropsWithRef<typeof Ark.Control> {}

export default function SignaturePadControl({
  className,
  children,
  ...props
}: SignaturePadControlProps) {
  const styles = signaturePad();

  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
