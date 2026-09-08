import React from "react";
import { Splitter as Ark } from "@ark-ui/react/splitter";
import { cn } from "cn";
import { splitterStyles as styles } from "@/registry/shared/lib/splitter.styles";

export interface SplitterPanelProps extends React.ComponentPropsWithRef<typeof Ark.Panel> {}

export default function SplitterPanel({ className, children, ...props }: SplitterPanelProps) {
  return (
    <Ark.Panel className={cn(styles.panel(), className)} {...props}>
      {children}
    </Ark.Panel>
  );
}
