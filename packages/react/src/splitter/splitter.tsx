import { Fragment } from "react";
import type React from "react";
import { Splitter as Ark } from "@ark-ui/react/splitter";
import { cn, splitterDefaults, type SplitterRootProps as SplitterContract } from "@75neo/themes";
import { SplitterVariantsContext } from "./variants";
import { SplitterPanel } from "./panel";
import { SplitterResizeTrigger } from "./resize-trigger";

export interface SplitterProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "dir">,
    Pick<
      React.ComponentProps<typeof Ark.Root>,
      "onResize" | "onResizeStart" | "onResizeEnd" | "ids"
    >,
    SplitterContract {
  children?: React.ReactNode;
}

export function Splitter({
  size,
  orientation,
  panels,
  defaultSizes,
  sizes,
  keyboardResizeBy,
  onResize,
  onResizeStart,
  onResizeEnd,
  ids,
  className,
  children,
  ...rest
}: SplitterProps) {
  const resolved = { size: size ?? splitterDefaults.size };

  return (
    <SplitterVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        orientation={orientation}
        panels={panels ?? []}
        defaultSize={defaultSizes}
        size={sizes}
        keyboardResizeBy={keyboardResizeBy}
        onResize={onResize}
        onResizeStart={onResizeStart}
        onResizeEnd={onResizeEnd}
        ids={ids}
        data-slot="splitter"
        data-size={resolved.size}
        className={cn(
          "group/splitter flex min-h-0 min-w-0 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-col",
          className,
        )}
      >
        {children ??
          (panels != null &&
            panels.map((panel, index) => (
              <Fragment key={panel.id}>
                {index > 0 && (
                  <SplitterResizeTrigger
                    id={`${panels[index - 1].id}:${panel.id}`}
                    disabled={panel.disabled ?? panels[index - 1].disabled}
                  />
                )}
                <SplitterPanel id={panel.id}>{panel.content}</SplitterPanel>
              </Fragment>
            )))}
      </Ark.Root>
    </SplitterVariantsContext.Provider>
  );
}
