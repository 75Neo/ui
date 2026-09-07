import React from "react";
import { Toc as Ark } from "@ark-ui/react/toc";
import { cn } from "cn";
import { toc } from "@/registry/shared/lib/toc.styles";

export interface TocTitleProps extends React.ComponentPropsWithRef<typeof Ark.Title> {}

export default function TocTitle({ className, children, ...props }: TocTitleProps) {
  const styles = toc();

  return (
    <Ark.Title className={cn(styles.title(), className)} {...props}>
      {children}
    </Ark.Title>
  );
}
