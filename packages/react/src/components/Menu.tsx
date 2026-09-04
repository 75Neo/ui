import type React from "react";
import { Menu as Ark, type MenuRootProps } from "@ark-ui/react/menu";
import { Portal } from "@ark-ui/react/portal";
import { Check, ChevronRight } from "lucide-react";
import type { ResolvedTheme } from "@75neo/core";
import {
  groupMenuItems,
  menu,
  type MenuItem,
  menuItemValue,
  type MenuProps as MenuContract,
} from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/** The item shape this adapter draws. */
type Item = MenuItem<React.ReactNode>;

/** What every level of the menu needs in order to draw itself the same way. */
interface Level {
  theme: ResolvedTheme<typeof menu>;
  trailingIcon: React.ReactNode;
  checkedIcon: React.ReactNode;
  portal: boolean;
}

/**
 * Props for the Menu.
 *
 * @remarks
 * `color` is dropped from the HTML attributes, because the legacy presentational
 * attribute would collide with the variant of the same name, and `onSelect` because
 * Ark's is called with the row that was chosen rather than with a DOM event.
 *
 * `children` is the trigger, not the rows. See the note on `MenuProps` in
 * `@75neo/themes` for why the default slot is spent on the one element a caller has to
 * own.
 */
export interface MenuProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "dir" | "onSelect">,
    Pick<MenuRootProps, "open" | "defaultOpen" | "onOpenChange" | "onSelect" | "ids">,
    MenuContract<React.ReactNode> {
  /** The element that opens the menu. It becomes the trigger and carries Ark's props. */
  children?: React.ReactNode;
}

/** The parts of a row that are the same whichever kind of row it is. */
function Face({ item, level }: { item: Item; level: Level }) {
  return (
    <>
      {item.icon != null && (
        <span data-slot="leadingIcon" className={level.theme.class.leadingIcon}>
          {item.icon}
        </span>
      )}
      <Ark.ItemText data-slot="itemText" className={level.theme.class.itemText}>
        {item.label}
      </Ark.ItemText>
      {item.shortcut != null && (
        <kbd data-slot="shortcut" className={level.theme.class.shortcut}>
          {item.shortcut}
        </kbd>
      )}
    </>
  );
}

function Row({ item, index, level }: { item: Item; index: number; level: Level }) {
  const { theme } = level;
  const value = menuItemValue(item, index);

  if (item.type === "separator") {
    return <Ark.Separator data-slot="separator" className={theme.class.separator} />;
  }

  /*
   * A submenu is another Menu, nested inside this one's panel, with a row for its
   * trigger. That is Ark's own shape, and it is why one recipe styles every level: the
   * panel a submenu opens is the same `base` slot as the panel above it.
   */
  if (item.children != null && item.children.length > 0) {
    const panel = (
      <Ark.Positioner data-slot="positioner" className={theme.class.positioner}>
        <Ark.Content data-slot="base" className={theme.class.base}>
          <Rows items={item.children} level={level} />
        </Ark.Content>
      </Ark.Positioner>
    );

    return (
      <Ark.Root>
        <Ark.TriggerItem data-slot="item" className={theme.class.item}>
          <Face item={item} level={level} />
          <span data-slot="trailingIcon" className={theme.class.trailingIcon}>
            {level.trailingIcon}
          </span>
        </Ark.TriggerItem>
        {level.portal ? <Portal>{panel}</Portal> : panel}
      </Ark.Root>
    );
  }

  if (item.type === "checkbox") {
    return (
      <Ark.CheckboxItem
        value={value}
        checked={item.checked ?? false}
        onCheckedChange={item.onCheckedChange}
        disabled={item.disabled}
        closeOnSelect={item.closeOnSelect}
        data-slot="item"
        className={theme.class.item}
      >
        <Face item={item} level={level} />
        <Ark.ItemIndicator data-slot="itemIndicator" className={theme.class.itemIndicator}>
          {level.checkedIcon}
        </Ark.ItemIndicator>
      </Ark.CheckboxItem>
    );
  }

  /*
   * A link row is the anchor itself rather than an anchor inside a row, so the whole
   * width is clickable and a middle click opens a tab. `asChild` is what moves Ark's
   * own props onto it, which means the classes have to move with them.
   */
  if (item.href != null) {
    return (
      <Ark.Item
        value={value}
        disabled={item.disabled}
        onSelect={item.onSelect}
        closeOnSelect={item.closeOnSelect}
        asChild
      >
        <a href={item.href} target={item.target} data-slot="item" className={theme.class.item}>
          <Face item={item} level={level} />
        </a>
      </Ark.Item>
    );
  }

  return (
    <Ark.Item
      value={value}
      disabled={item.disabled}
      onSelect={item.onSelect}
      closeOnSelect={item.closeOnSelect}
      data-slot="item"
      className={theme.class.item}
    >
      <Face item={item} level={level} />
    </Ark.Item>
  );
}

function Rows({ items, level }: { items: Item[]; level: Level }) {
  const { theme } = level;

  return (
    <>
      {groupMenuItems(items).map((section, index) => (
        <Ark.ItemGroup key={section.label ?? index} data-slot="group" className={theme.class.group}>
          {section.label != null && (
            <Ark.ItemGroupLabel data-slot="groupLabel" className={theme.class.groupLabel}>
              {section.label}
            </Ark.ItemGroupLabel>
          )}
          {section.items.map((item, position) => (
            <Row key={menuItemValue(item, position)} item={item} index={position} level={level} />
          ))}
        </Ark.ItemGroup>
      ))}
    </>
  );
}

export function Menu({
  ui,
  color,
  size,
  transition,
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
  const theme = useResolvedTheme(menu, "menu", { ui, color, size, transition }, className);

  const level: Level = {
    theme,
    trailingIcon: trailingIcon ?? <ChevronRight />,
    checkedIcon: checkedIcon ?? <Check />,
    portal,
  };

  const panel = (
    <Ark.Positioner data-slot="positioner" className={theme.class.positioner}>
      <Ark.Content {...rest} data-slot="base" className={theme.class.base}>
        {arrow && (
          <Ark.Arrow data-slot="arrow" className={theme.class.arrow}>
            <Ark.ArrowTip data-slot="arrowTip" className={theme.class.arrowTip} />
          </Ark.Arrow>
        )}
        <Rows items={items} level={level} />
      </Ark.Content>
    </Ark.Positioner>
  );

  return (
    <Ark.Root
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
    >
      {children != null && <Ark.Trigger asChild>{children}</Ark.Trigger>}
      {portal ? <Portal>{panel}</Portal> : panel}
    </Ark.Root>
  );
}
