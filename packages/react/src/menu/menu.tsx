import type React from "react";
import { Menu as Ark, type MenuRootProps } from "@ark-ui/react/menu";
import { Check, ChevronRight } from "lucide-react";
import { menuDefaults, type MenuRootProps as MenuContract } from "@75neo/themes";
import { MenuVariantsContext } from "./variants";
import { MenuArrow } from "./arrow";
import { MenuContent } from "./content";
import { Rows } from "./rows";

/**
 * Props for the Menu.
 *
 * @remarks
 * `color` is dropped from the HTML attributes, because the legacy presentational
 * attribute would collide with the variant of the same name, and `onSelect` because
 * Ark's is called with the row that was chosen rather than with a DOM event.
 *
 * `children` is the trigger, not the rows: the rows are data, and the one element a
 * caller has to own is what opens the menu.
 */
export interface MenuProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "dir" | "onSelect">,
    Pick<MenuRootProps, "open" | "defaultOpen" | "onOpenChange" | "onSelect" | "ids">,
    MenuContract<React.ReactNode> {
  /** The element that opens the menu. It becomes the trigger and carries Ark's props. */
  children?: React.ReactNode;
}

export function Menu({
  color,
  size,
  items,
  arrow = false,
  placement = "bottom-start",
  offset = 8,
  closeOnSelect,
  loopFocus,
  typeahead,
  trailingIcon,
  checkedIcon,
  portal = true,
  lazyMount,
  unmountOnExit,
  children,
  open,
  defaultOpen,
  onOpenChange,
  onSelect,
  ids,
  className,
  ...rest
}: MenuProps) {
  const resolved = {
    color: color ?? menuDefaults.color,
    size: size ?? menuDefaults.size,
  };
  const glyphs = {
    trailingIcon: trailingIcon ?? <ChevronRight />,
    checkedIcon: checkedIcon ?? <Check />,
  };

  return (
    <MenuVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        onSelect={onSelect}
        closeOnSelect={closeOnSelect}
        loopFocus={loopFocus}
        typeahead={typeahead}
        positioning={{ placement, offset: { mainAxis: offset } }}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        ids={ids}
        data-slot="menu"
        data-color={resolved.color}
        data-size={resolved.size}
      >
        {children != null && <Ark.Trigger asChild>{children}</Ark.Trigger>}
        <MenuContent portal={portal} className={className}>
          {arrow && <MenuArrow />}
          <Rows rows={items} glyphs={glyphs} portal={portal} transition />
        </MenuContent>
      </Ark.Root>
    </MenuVariantsContext.Provider>
  );
}
