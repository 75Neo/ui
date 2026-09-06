import type React from "react";
import { cn, menuSizeData, type MenuRow } from "@75neo/themes";
import { useMenuVariants } from "./variants";
import { MenuItemText } from "./item-text";

/**
 * The parts of a row that are the same whichever kind of row it is. Internal:
 * callers compose the exported parts, never this.
 */
export function Face({ row }: { row: MenuRow<React.ReactNode> }) {
  const variants = useMenuVariants();

  return (
    <>
      {row.icon != null && (
        <span
          data-slot="menu-leading-icon"
          className={cn(
            "shrink-0 text-dimmed [&>svg]:size-full",
            menuSizeData.leadingIcon[variants.size],
          )}
        >
          {row.icon}
        </span>
      )}
      <MenuItemText>{row.label}</MenuItemText>
      {row.shortcut != null && (
        <kbd
          data-slot="menu-shortcut"
          className={cn(
            "ms-auto shrink-0 font-mono text-dimmed tabular-nums",
            menuSizeData.shortcut[variants.size],
          )}
        >
          {row.shortcut}
        </kbd>
      )}
    </>
  );
}
