import type React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cn, groupMenuItems, menuRowValue, menuSizeData, type MenuRow } from "@75neo/themes";
import { useMenuVariants } from "./variants";
import { MenuCheckboxItem } from "./checkbox-item";
import { MenuContent } from "./content";
import { MenuItem } from "./item";
import { MenuTriggerItem } from "./trigger-item";

/** Glyphs the root hands down: the submenu chevron and the checkbox tick. */
export interface RowGlyphs {
  trailingIcon: React.ReactNode;
  checkedIcon: React.ReactNode;
}

function Row({
  row,
  glyphs,
  portal,
  transition,
}: {
  row: MenuRow<React.ReactNode>;
  glyphs: RowGlyphs;
  portal: boolean;
  transition: boolean;
}) {
  if (row.type === "separator") {
    return (
      <Ark.Separator
        data-slot="menu-separator"
        className={cn("-mx-1 my-1 h-px border-0 bg-border")}
      />
    );
  }

  /*
   * A submenu is another Menu, nested inside this one's panel, with a row for its
   * trigger. That is Ark's own shape, and it is why one set of classes styles every
   * level: the nested tree reads the same context as the panel above it.
   */
  if (row.children != null && row.children.length > 0) {
    return (
      <Ark.Root>
        <MenuTriggerItem row={row} trailingIcon={glyphs.trailingIcon} />
        <MenuContent transition={transition} portal={portal}>
          <Rows rows={row.children} glyphs={glyphs} portal={portal} transition={transition} />
        </MenuContent>
      </Ark.Root>
    );
  }

  if (row.type === "checkbox") {
    return <MenuCheckboxItem row={row} checkedIcon={glyphs.checkedIcon} />;
  }

  return <MenuItem row={row} />;
}

export function Rows({
  rows,
  glyphs,
  portal,
  transition,
}: {
  rows: MenuRow<React.ReactNode>[];
  glyphs: RowGlyphs;
  portal: boolean;
  transition: boolean;
}) {
  const variants = useMenuVariants();

  return (
    <>
      {groupMenuItems(rows).map((section, index) => (
        <Ark.ItemGroup
          key={section.label ?? index}
          data-slot="menu-item-group"
          className={cn("flex flex-col")}
        >
          {section.label != null && (
            <Ark.ItemGroupLabel
              data-slot="menu-item-group-label"
              className={cn(
                "font-medium text-dimmed select-none",
                menuSizeData.groupLabel[variants.size],
              )}
            >
              {section.label}
            </Ark.ItemGroupLabel>
          )}
          {section.items.map((row, position) => (
            <Row
              key={menuRowValue(row, position)}
              row={row}
              glyphs={glyphs}
              portal={portal}
              transition={transition}
            />
          ))}
        </Ark.ItemGroup>
      ))}
    </>
  );
}
