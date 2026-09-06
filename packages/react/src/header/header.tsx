import { useState } from "react";
import type React from "react";
import { Dialog as Ark } from "@ark-ui/react/dialog";
import {
  cn,
  headerClasses,
  headerDefaults,
  type HeaderRootProps as HeaderContract,
} from "@75neo/themes";
import { HeaderVariantsContext } from "./variants";
import { HeaderCenter } from "./center";
import { HeaderEnd } from "./end";
import { HeaderMenu } from "./menu";
import { HeaderRow } from "./row";
import { HeaderStart } from "./start";
import { HeaderTitle } from "./title";
import { HeaderToggle } from "./toggle";

/**
 * Props for the Header.
 *
 * @remarks
 * `title` is dropped from the HTML attributes, because the global attribute is a
 * tooltip where this one is the wordmark. `children` is the centre of the bar, which
 * is the region a header with one navigation in it should use.
 */
export interface HeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title">, HeaderContract<React.ReactNode> {
  /** The middle of the bar, usually a navigation. Hidden on a narrow viewport. */
  children?: React.ReactNode;
  /** The start of the bar. Falls back to the wordmark. */
  start?: React.ReactNode;
  /** The end of the bar, usually a set of actions. */
  end?: React.ReactNode;
  /** The menu's content on a narrow viewport. Without it there is no menu. */
  menu?: React.ReactNode;
  /** Whether the menu is open. Leave it out to let the Header keep the state. */
  open?: boolean;
  /** The starting state when the Header keeps it. */
  defaultOpen?: boolean;
  /** Fired whenever the menu opens or closes. */
  onOpenChange?: (details: { open: boolean }) => void;
}

/**
 * The bar across the top of a page, and the menu it opens where there is no room for
 * a navigation.
 *
 * @remarks
 * The wordmark and the actions render twice, once in the bar and once at the top of
 * the menu, so the menu opens over the page without the page appearing to lose its
 * header.
 */
export function Header({
  toggleSide = headerDefaults.toggleSide,
  title,
  href,
  toggle = true,
  toggleIcon,
  toggleCloseIcon,
  overlay = true,
  portal = true,
  children,
  start,
  end,
  menu,
  open,
  defaultOpen,
  onOpenChange,
  className,
  ...rest
}: HeaderProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen ?? false);
  const isOpen = open ?? uncontrolled;

  /*
   * Ark reports its own dismissals through `onOpenChange`, so routing the toggle
   * through one setter keeps a single path in and out: the button writes the state,
   * Ark reads it, and Escape or a click outside comes back here.
   */
  const setOpen = (next: boolean) => {
    if (open === undefined) setUncontrolled(next);
    onOpenChange?.({ open: next });
  };

  const hasMenu = toggle && menu != null;
  const toggleButton = hasMenu && (
    <HeaderToggle openIcon={toggleIcon} closeIcon={toggleCloseIcon} />
  );

  const startRegion = (
    <HeaderStart>
      {toggleSide === "start" && toggleButton}
      {start ?? (title != null && <HeaderTitle href={href}>{title}</HeaderTitle>)}
    </HeaderStart>
  );

  const endRegion = (
    <HeaderEnd>
      {end}
      {toggleSide === "end" && toggleButton}
    </HeaderEnd>
  );

  return (
    <HeaderVariantsContext.Provider value={{ toggleSide, open: isOpen, setOpen, title }}>
      <Ark.Root open={isOpen} onOpenChange={(details) => setOpen(details.open)} lazyMount>
        <header {...rest} data-slot="header" className={cn(headerClasses.root, className)}>
          <HeaderRow>
            {startRegion}
            <HeaderCenter>{children}</HeaderCenter>
            {endRegion}
          </HeaderRow>
        </header>

        {hasMenu && (
          <HeaderMenu
            overlay={overlay}
            portal={portal}
            label={title ?? "Menu"}
            header={
              <>
                {startRegion}
                {endRegion}
              </>
            }
          >
            {menu}
          </HeaderMenu>
        )}
      </Ark.Root>
    </HeaderVariantsContext.Provider>
  );
}
