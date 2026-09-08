import React from "react";
import { SignaturePad as Ark } from "@ark-ui/react/signature-pad";
import { cn } from "cn";
import { signaturePadStyles as styles } from "@/registry/shared/lib/signature-pad.styles";

export interface SignaturePadControlProps extends React.ComponentPropsWithRef<typeof Ark.Control> {}

export default function SignaturePadControl({
  className,
  children,
  ...props
}: SignaturePadControlProps) {
  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
