import React from "react";
import { Splitter as Ark } from "@ark-ui/react/splitter";
import { cn } from "cn";
import { splitter } from "@/registry/shared/lib/splitter.styles";

export interface SplitterProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function Splitter({ className, children, ...props }: SplitterProps) {
  const styles = splitter();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
