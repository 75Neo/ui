import React from "react";
import { SignaturePad as Ark } from "@ark-ui/react/signature-pad";
import { cn } from "cn";
import { signaturePadStyles as styles } from "@/registry/shared/lib/signature-pad.styles";

export interface SignaturePadSegmentProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Segment>,
  "children"
> {}

export default function SignaturePadSegment({ className, ...props }: SignaturePadSegmentProps) {
  return <Ark.Segment className={cn(styles.segment(), className)} {...props} />;
}
