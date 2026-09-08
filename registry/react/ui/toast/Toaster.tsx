import React from "react";
import { Toaster as Ark } from "@ark-ui/react/toast";
import { cn } from "cn";
import { toast } from "@/registry/shared/lib/toast.styles";

export interface ToasterProps extends React.ComponentPropsWithRef<typeof Ark> {}

export default function Toaster({ className, children, ...props }: ToasterProps) {
  const styles = toast();

  return (
    <Ark className={cn(styles.group(), className)} {...props}>
      {children}
    </Ark>
  );
}
