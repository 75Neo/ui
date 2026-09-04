import type React from "react";
import { NavigationMenu as Ark, type NavigationMenuRootProps } from "@ark-ui/react/navigation-menu";
import { ChevronDown } from "lucide-react";
import {
  navigationMenu,
  type NavigationMenuItem,
  type NavigationMenuProps as NavigationMenuContract,
} from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the NavigationMenu.
 *
 * @remarks
 * `color` is dropped from the HTML attributes, because the legacy presentational
 * attribute would collide with the variant of the same name. `defaultValue` goes with
 * it, since the attribute admits a string where Ark's root takes the open row's
 * value.
 *
 * The open row comes from Ark, because React and Vue spell a controlled value too
 * differently to share one type.
 */
export interface NavigationMenuProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "color" | "defaultValue" | "dir">,
    Pick<NavigationMenuRootProps, "value" | "defaultValue" | "onValueChange" | "ids">,
    NavigationMenuContract<React.ReactNode> {}

export function NavigationMenu({
  ui,
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
  ...rest
}: NavigationMenuProps) {
  const theme = useResolvedTheme(
    navigationMenu,
    "navigationMenu",
    { ui, color, size, orientation },
    className,
  );

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      orientation={orientation}
      ids={ids}
    >
      <Ark.List data-slot="list" className={theme.class.list}>
        {items.map((item: NavigationMenuItem<React.ReactNode>) =>
          item.links != null ? (
            <Ark.Item
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              data-slot="item"
              className={theme.class.item}
            >
              <Ark.Trigger
                disabled={item.disabled}
                data-slot="trigger"
                className={theme.class.trigger}
              >
                {item.icon != null && (
                  <span data-slot="leadingIcon" className={theme.class.leadingIcon}>
                    {item.icon}
                  </span>
                )}
                {item.label}
                <span data-slot="trailingIcon" className={theme.class.trailingIcon}>
                  {trailingIcon ?? <ChevronDown />}
                </span>
              </Ark.Trigger>

              <Ark.Content value={item.value} data-slot="content" className={theme.class.content}>
                {item.links.map((link) => (
                  <Ark.Link
                    key={link.href}
                    href={link.href}
                    data-slot="link"
                    className={theme.class.link}
                    closeOnClick={link.closeOnClick}
                    current={link.current}
                    onSelect={link.onSelect}
                  >
                    {link.icon != null && (
                      <span data-slot="linkIcon" className={theme.class.linkIcon}>
                        {link.icon}
                      </span>
                    )}
                    <span data-slot="linkContent" className={theme.class.linkContent}>
                      <span data-slot="linkTitle" className={theme.class.linkTitle}>
                        {link.title}
                      </span>
                      {link.description != null && (
                        <span data-slot="linkDescription" className={theme.class.linkDescription}>
                          {link.description}
                        </span>
                      )}
                    </span>
                  </Ark.Link>
                ))}
              </Ark.Content>
            </Ark.Item>
          ) : (
            <Ark.Item
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              data-slot="item"
              className={theme.class.item}
            >
              <Ark.Link
                href={item.href}
                data-slot="link"
                className={theme.class.link}
                current={item.current}
              >
                {item.icon != null && (
                  <span data-slot="linkIcon" className={theme.class.linkIcon}>
                    {item.icon}
                  </span>
                )}
                {item.label}
              </Ark.Link>
            </Ark.Item>
          ),
        )}
      </Ark.List>
    </Ark.Root>
  );
}
