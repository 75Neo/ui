import React from "react";
import { Toc as Ark } from "@ark-ui/react/toc";
import { cn } from "cn";
import { toc } from "@/registry/shared/lib/toc.styles";

export interface TocLinkProps extends React.ComponentPropsWithRef<typeof Ark.Link> {
  href: string;
}

export default function TocLink({ className, children, ...props }: TocLinkProps) {
  const styles = toc();

  return (
    <Ark.Link className={cn(styles.link(), className)} {...props}>
      {children}
    </Ark.Link>
  );
}
