import type React from "react";
import { NavigationMenu as Ark } from "@ark-ui/react/navigation-menu";
import {
  cn,
  navigationMenuDefaults,
  type NavigationMenuRootProps as NavigationMenuContract,
} from "@75neo/themes";
import { NavigationMenuVariantsContext } from "./variants";
import { NavigationMenuContent } from "./content";
import { NavigationMenuItem } from "./item";
import { NavigationMenuLink } from "./link";
import { NavigationMenuList } from "./list";
import { NavigationMenuTrigger } from "./trigger";

/**
 * Props for the NavigationMenu.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the axis of the same name. The open row comes from Ark, because
 * React and Vue spell a controlled value too differently to share one type.
 */
export interface NavigationMenuProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "color" | "defaultValue" | "dir">,
    Pick<React.ComponentProps<typeof Ark.Root>, "value" | "defaultValue" | "onValueChange" | "ids">,
    NavigationMenuContract<React.ReactNode> {
  children?: React.ReactNode;
}

export function NavigationMenu({
  color,
  size,
  orientation,
  items,
  trailingIcon,
  value,
  defaultValue,
  onValueChange,
  ids,
  className,
  children,
  ...rest
}: NavigationMenuProps) {
  const resolved = {
    color: color ?? navigationMenuDefaults.color,
    size: size ?? navigationMenuDefaults.size,
    orientation: orientation ?? navigationMenuDefaults.orientation,
  };

  return (
    <NavigationMenuVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        orientation={orientation}
        ids={ids}
        data-slot="navigation-menu"
        data-color={resolved.color}
        data-size={resolved.size}
        className={cn("relative flex w-full min-w-0", className)}
      >
        {children ??
          (items != null && (
            <NavigationMenuList>
              {items.map((item) => (
                <NavigationMenuItem key={item.value} value={item.value} disabled={item.disabled}>
                  {item.links != null ? (
                    <>
                      <NavigationMenuTrigger
                        disabled={item.disabled}
                        leadingIcon={item.icon}
                        trailingIcon={trailingIcon}
                      >
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent value={item.value}>
                        {item.links.map((link) => (
                          <NavigationMenuLink
                            key={link.href}
                            href={link.href}
                            title={link.title}
                            description={link.description}
                            leadingIcon={link.icon}
                            current={link.current}
                          />
                        ))}
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink href={item.href ?? "#"} current={item.current}>
                      {item.icon != null && (
                        <span
                          data-slot="navigation-menu-link-icon"
                          className="shrink-0 text-dimmed [&>svg]:size-full"
                        >
                          {item.icon}
                        </span>
                      )}
                      {item.label}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          ))}
      </Ark.Root>
    </NavigationMenuVariantsContext.Provider>
  );
}
