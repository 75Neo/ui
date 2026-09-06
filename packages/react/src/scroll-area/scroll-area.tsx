import type React from "react";
import { ScrollArea as Ark } from "@ark-ui/react/scroll-area";
import {
  cn,
  scrollAreaDefaults,
  type ScrollAreaRootProps as ScrollAreaContract,
} from "@75neo/themes";
import { ScrollAreaVariantsContext } from "./variants";
import { ScrollAreaContent } from "./content";
import { ScrollAreaCorner } from "./corner";
import { ScrollAreaScrollbar } from "./scrollbar";
import { ScrollAreaViewport } from "./viewport";

export interface ScrollAreaProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "dir">,
    Pick<React.ComponentProps<typeof Ark.Root>, "ids">,
    ScrollAreaContract {
  children?: React.ReactNode;
}

export function ScrollArea({
  size,
  orientation = "vertical",
  ids,
  className,
  children,
  ...rest
}: ScrollAreaProps) {
  const resolved = { size: size ?? scrollAreaDefaults.size };
  const both = orientation === "both";

  return (
    <ScrollAreaVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        ids={ids}
        data-slot="scroll-area"
        data-size={resolved.size}
        className={cn("group/scroll-area relative min-w-0 overflow-hidden", className)}
      >
        <ScrollAreaViewport>
          <ScrollAreaContent>{children}</ScrollAreaContent>
        </ScrollAreaViewport>
        {(both || orientation === "vertical") && <ScrollAreaScrollbar orientation="vertical" />}
        {(both || orientation === "horizontal") && <ScrollAreaScrollbar orientation="horizontal" />}
        {both && <ScrollAreaCorner />}
      </Ark.Root>
    </ScrollAreaVariantsContext.Provider>
  );
}
