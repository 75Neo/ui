import type React from "react";
import { cva } from "class-variance-authority";
import { Menu, X } from "lucide-react";
import { cn, headerClasses, headerDefaults, headerToggleSideData } from "@75neo/themes";
import { useHeaderVariants } from "./variants";

const headerToggle = cva(headerClasses.toggle, {
  variants: { toggleSide: headerToggleSideData.toggle },
  defaultVariants: headerDefaults,
});

export interface HeaderToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Replaces the icon shown while the menu is closed. */
  openIcon?: React.ReactNode;
  /** Replaces the icon shown while the menu is open. */
  closeIcon?: React.ReactNode;
}

/**
 * The button that opens the menu on a narrow viewport.
 *
 * @remarks
 * A plain button driving the header's own state rather than one of Ark's triggers: the
 * same button is rendered inside the menu too, and a trigger inside a modal panel is
 * inert.
 */
export function HeaderToggle({ openIcon, closeIcon, className, ...rest }: HeaderToggleProps) {
  const { open, setOpen, toggleSide } = useHeaderVariants();

  return (
    <button
      {...rest}
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      data-slot="header-toggle"
      className={cn(headerToggle({ toggleSide }), className)}
      onClick={() => setOpen(!open)}
    >
      {open ? (closeIcon ?? <X />) : (openIcon ?? <Menu />)}
    </button>
  );
}
