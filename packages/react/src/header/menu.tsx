import type React from "react";
import { Dialog as Ark } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { cn, headerClasses, type HeaderMenuProps as HeaderMenuContract } from "@75neo/themes";

export interface HeaderMenuProps
  extends React.HTMLAttributes<HTMLDivElement>, HeaderMenuContract<React.ReactNode> {
  /** What the bar shows at the top of the menu, usually the two end regions. */
  header?: React.ReactNode;
  /** The scrolling body of the menu, usually a navigation. */
  children?: React.ReactNode;
}

/**
 * The panel the toggle opens on a narrow viewport.
 *
 * @remarks
 * Ark's Dialog rather than this library's, so everything a Header draws stays
 * reachable through the header's own parts. Every class here is hidden at the wide
 * breakpoint, so a wide viewport never renders it even if it were left open.
 */
export function HeaderMenu({
  overlay = true,
  portal = true,
  label = "Menu",
  header,
  className,
  children,
  ...rest
}: HeaderMenuProps) {
  const menu = (
    <>
      {overlay && <Ark.Backdrop data-slot="header-backdrop" className={headerClasses.backdrop} />}
      <Ark.Positioner data-slot="header-positioner" className={headerClasses.positioner}>
        <Ark.Content
          {...rest}
          data-slot="header-menu"
          className={cn(headerClasses.menu, className)}
        >
          <Ark.Title data-slot="header-menu-title" className={headerClasses.menuTitle}>
            {label}
          </Ark.Title>
          {header != null && (
            <div data-slot="header-menu-header" className={headerClasses.menuHeader}>
              {header}
            </div>
          )}
          <div data-slot="header-menu-body" className={headerClasses.menuBody}>
            {children}
          </div>
        </Ark.Content>
      </Ark.Positioner>
    </>
  );

  if (portal) return <Portal>{menu}</Portal>;
  return menu;
}
