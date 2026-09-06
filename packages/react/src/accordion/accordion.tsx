import type React from "react";
import { Accordion as Ark } from "@ark-ui/react/accordion";
import { cva } from "class-variance-authority";
import {
  accordionDefaults,
  accordionVariantData,
  cn,
  type AccordionRootProps as AccordionContract,
} from "@75neo/themes";
import { AccordionVariantsContext } from "./variants";

const accordionRoot = cva(
  "group/accordion flex min-w-0 flex-col data-[orientation=horizontal]:h-full data-[orientation=horizontal]:flex-row",
  {
    variants: { variant: accordionVariantData.root },
    defaultVariants: accordionDefaults,
  },
);

export interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "dir">, AccordionContract {
  /** Open rows up front, by value. */
  defaultValue?: string[];
}

export function Accordion({
  variant,
  size,
  defaultValue,
  multiple,
  collapsible,
  disabled,
  orientation,
  className,
  children,
  ...rest
}: AccordionProps) {
  const resolved = {
    variant: variant ?? accordionDefaults.variant,
    size: size ?? accordionDefaults.size,
  };

  return (
    <AccordionVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        defaultValue={defaultValue}
        multiple={multiple}
        collapsible={collapsible}
        disabled={disabled}
        orientation={orientation}
        data-slot="accordion"
        data-size={resolved.size}
        data-variant={resolved.variant}
        className={cn(accordionRoot(resolved), className)}
      >
        {children}
      </Ark.Root>
    </AccordionVariantsContext.Provider>
  );
}
