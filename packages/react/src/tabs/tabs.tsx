import type React from "react";
import { Tabs as Ark } from "@ark-ui/react/tabs";
import {
  cn,
  tabsDefaults,
  tabsSizeData,
  type TabsRootProps as TabsContract,
  type TabsTab,
} from "@75neo/themes";
import { TabsVariantsContext } from "./variants";
import { TabsContent } from "./content";
import { TabsIndicator } from "./indicator";
import { TabsList } from "./list";
import { TabsTrigger } from "./trigger";

/**
 * Props for the Tabs.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the variant of the same name. `defaultValue` goes with it, since
 * the attribute admits a string where Ark's root takes the tab, and `dir` because
 * direction belongs to the locale provider.
 *
 * The selected value comes from Ark, because React and Vue spell a controlled value
 * too differently to share one type.
 *
 * Either `items` or caller composition feeds the tabs. `items` renders the default
 * triggers and panels; anything richer composes `TabsTrigger` and `TabsContent`
 * directly, each naming its tab by `value`.
 */
export interface TabsProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir">,
    Pick<React.ComponentProps<typeof Ark.Root>, "value" | "defaultValue" | "onValueChange" | "ids">,
    TabsContract<React.ReactNode> {
  children?: React.ReactNode;
}

export function Tabs({
  variant,
  color,
  size,
  items,
  activationMode,
  orientation,
  unmountOnExit,
  lazyMount,
  value,
  defaultValue,
  onValueChange,
  ids,
  className,
  children,
  ...rest
}: TabsProps) {
  const resolved = {
    variant: variant ?? tabsDefaults.variant,
    color: color ?? tabsDefaults.color,
    size: size ?? tabsDefaults.size,
  };

  return (
    <TabsVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        data-slot="tabs"
        data-variant={resolved.variant}
        data-color={resolved.color}
        data-size={resolved.size}
        className={cn(
          "group/tabs flex min-w-0 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row",
          className,
        )}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        activationMode={activationMode}
        orientation={orientation}
        unmountOnExit={unmountOnExit}
        lazyMount={lazyMount}
        ids={ids}
      >
        {children ??
          (items != null && (
            <>
              <TabsList>
                {items.map((item) => (
                  <TabsTrigger key={item.value} value={item.value} disabled={item.disabled}>
                    {item.icon != null && (
                      <span
                        data-slot="tabs-leading-icon"
                        className={cn(
                          "shrink-0 [&>svg]:size-full",
                          tabsSizeData.leadingIcon[resolved.size],
                        )}
                      >
                        {item.icon}
                      </span>
                    )}
                    <span data-slot="tabs-label" className={cn("min-w-0 truncate")}>
                      {item.label}
                    </span>
                  </TabsTrigger>
                ))}
                <TabsIndicator />
              </TabsList>
              {items.map((item) => (
                <TabsContent key={item.value} value={item.value}>
                  {item.content}
                </TabsContent>
              ))}
            </>
          ))}
      </Ark.Root>
    </TabsVariantsContext.Provider>
  );
}

export type { TabsTab };
