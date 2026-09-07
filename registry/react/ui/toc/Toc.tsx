import React from "react";
import { Toc as Ark } from "@ark-ui/react/toc";
import { cn } from "cn";
import { toc } from "@/registry/shared/lib/toc.styles";

export interface TocProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function Toc({ className, children, ...props }: TocProps) {
  const styles = toc();

  return (
    <Ark.Root asChild {...props}>
      <nav className={cn(styles.root(), className)}>{children}</nav>
    </Ark.Root>
  );
}
