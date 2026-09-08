import React from "react";
import { SignaturePad as Ark } from "@ark-ui/react/signature-pad";
import { cn } from "cn";
import { signaturePad } from "@/registry/shared/lib/signature-pad.styles";

export interface SignaturePadProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function SignaturePad({ className, children, ...props }: SignaturePadProps) {
  const styles = signaturePad();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
