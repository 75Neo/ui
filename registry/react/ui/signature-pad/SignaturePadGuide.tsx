import React from "react";
import { SignaturePad as Ark } from "@ark-ui/react/signature-pad";
import { cn } from "cn";
import { signaturePad } from "@/registry/shared/lib/signature-pad.styles";

export interface SignaturePadGuideProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Guide>,
  "children"
> {}

export default function SignaturePadGuide({ className, ...props }: SignaturePadGuideProps) {
  const styles = signaturePad();

  return <Ark.Guide className={cn(styles.guide(), className)} {...props} />;
}
