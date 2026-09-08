import React from "react";
import { Select as Ark, type CollectionItem, type SelectRootProps } from "@ark-ui/react/select";
import { cn } from "cn";
import { selectStyles as styles } from "@/registry/shared/lib/select.styles";

export interface SelectProps<T extends CollectionItem>
  extends SelectRootProps<T>, React.RefAttributes<HTMLDivElement> {}

export default function Select<T extends CollectionItem>({
  className,
  children,
  ...props
}: SelectProps<T>) {
  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
