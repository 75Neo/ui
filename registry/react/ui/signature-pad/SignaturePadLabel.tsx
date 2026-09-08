import React from "react";
import { SignaturePad as Ark } from "@ark-ui/react/signature-pad";
import { cn } from "cn";
import { signaturePad } from "@/registry/shared/lib/signature-pad.styles";

export interface SignaturePadLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function SignaturePadLabel({
  className,
  children,
  ...props
}: SignaturePadLabelProps) {
  const styles = signaturePad();

  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
