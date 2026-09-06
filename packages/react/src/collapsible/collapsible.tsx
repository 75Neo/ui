import type React from "react";
import { Collapsible as Ark } from "@ark-ui/react/collapsible";
import { cva } from "class-variance-authority";
import {
  cn,
  collapsibleDefaults,
  collapsibleVariantData,
  type CollapsibleRootProps as CollapsibleContract,
} from "@75neo/themes";
import { CollapsibleVariantsContext } from "./variants";

const collapsibleRoot = cva("flex min-w-0 flex-col", {
  variants: { variant: collapsibleVariantData.root },
  defaultVariants: collapsibleDefaults,
});

/**
 * Props for the Collapsible.
 *
 * @remarks
 * The open state comes from Ark, because React and Vue spell a controlled value too
 * differently to share one type.
 */
export interface CollapsibleProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    Pick<
      React.ComponentProps<typeof Ark.Root>,
      "open" | "defaultOpen" | "onOpenChange" | "onExitComplete" | "ids"
    >,
    CollapsibleContract {}

export function Collapsible({
  variant,
  size,
  disabled,
  collapsedHeight,
  unmountOnExit,
  lazyMount,
  open,
  defaultOpen,
  onOpenChange,
  onExitComplete,
  ids,
  className,
  children,
  ...rest
}: CollapsibleProps) {
  const resolved = {
    variant: variant ?? collapsibleDefaults.variant,
    size: size ?? collapsibleDefaults.size,
  };

  return (
    <CollapsibleVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        onExitComplete={onExitComplete}
        disabled={disabled}
        collapsedHeight={collapsedHeight}
        unmountOnExit={unmountOnExit}
        lazyMount={lazyMount}
        ids={ids}
        data-slot="collapsible"
        data-variant={resolved.variant}
        data-size={resolved.size}
        className={cn(collapsibleRoot(resolved), className)}
      >
        {children}
      </Ark.Root>
    </CollapsibleVariantsContext.Provider>
  );
}
