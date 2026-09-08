import React from "react";
import { SignaturePad as Ark } from "@ark-ui/react/signature-pad";
import { cn } from "cn";
import { signaturePad } from "@/registry/shared/lib/signature-pad.styles";

export interface SignaturePadClearTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.ClearTrigger
> {}

export default function SignaturePadClearTrigger({
  className,
  children,
  ...props
}: SignaturePadClearTriggerProps) {
  const styles = signaturePad();

  return (
    <Ark.ClearTrigger className={cn(styles.clearTrigger(), className)} {...props}>
      {children}
    </Ark.ClearTrigger>
  );
}
