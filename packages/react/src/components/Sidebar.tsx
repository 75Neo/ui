import type React from "react";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import {
  sidebar,
  sidebarMobileQuery,
  type SidebarProps as SidebarContract,
  type SidebarState,
} from "@75neo/themes";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the Sidebar.
 *
 * @remarks
 * `title` is dropped from the HTML attributes, because the global attribute takes a
 * string for a tooltip where this component's heads the column.
 *
 * `children` is the body, not a trigger. A Sidebar has no trigger — it is part of the
 * page rather than something summoned onto it — so the default slot goes to the one
 * region that is always there.
 */
export interface SidebarProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title">, SidebarContract<React.ReactNode> {
  /** The scrolling middle of the column, usually a navigation. */
  children?: React.ReactNode;
  /** A row along the bottom, usually an account or a theme switch. */
  footer?: React.ReactNode;
  /** Buttons in the header, beside the close button. */
  actions?: React.ReactNode;
  /** Whether the sidebar is expanded. Leave it out to let the Sidebar keep the state. */
  open?: boolean;
  /** The starting state when the Sidebar keeps it. @defaultValue `true` */
  defaultOpen?: boolean;
  /** Fired whenever the sidebar expands or collapses, from either viewport. */
  onOpenChange?: (details: { open: boolean }) => void;
}

/**
 * A column beside the page that collapses to a strip or disappears, and slides in over
 * the page where there is no room beside it.
 *
 * @remarks
 * One state serves both viewports and the component moves it across when the viewport
 * crosses `lg`: entering the narrow one remembers where the wide one was and closes the
 * panel, and leaving it puts the remembered value back. Without that, a sidebar that is
 * expanded by design would cover a phone's content the moment the page loaded.
 *
 * The narrow panel is the same DOM as the wide column, moved. It is not a focus trap
 * and does not try to be; see the note on the recipe for why a layout element can
 * afford that and a Dialog cannot.
 */
export function Sidebar({
  ui,
  side = "start",
  variant = "sidebar",
  collapsible = "offcanvas",
  transition = true,
  title,
  description,
  close,
  closeIcon,
  rail,
  overlay = true,
  children,
  footer,
  actions,
  open,
  defaultOpen = true,
  onOpenChange,
  className,
  ...rest
}: SidebarProps) {
  const theme = useResolvedTheme(
    sidebar,
    "sidebar",
    { ui, side, variant, collapsible, transition },
    className,
  );

  const isMobile = useMediaQuery(sidebarMobileQuery);
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const isOpen = open ?? uncontrolled;

  const setOpen = (next: boolean) => {
    if (open === undefined) setUncontrolled(next);
    onOpenChange?.({ open: next });
  };

  /*
   * The viewport effect below has to read the state and write it, and must run only
   * when the viewport crosses — listing either as a dependency would run it on every
   * toggle instead. Both are parked in a ref by an effect declared first, so the ref is
   * already current by the time the second one reads it.
   */
  const latest = useRef({ isOpen, setOpen });
  useEffect(() => {
    latest.current = { isOpen, setOpen };
  });

  const wide = useRef(defaultOpen);
  const wasMobile = useRef<boolean | null>(null);

  useEffect(() => {
    if (wasMobile.current === isMobile) return;
    const first = wasMobile.current === null;
    wasMobile.current = isMobile;

    if (isMobile) {
      wide.current = latest.current.isOpen;
      latest.current.setOpen(false);
    } else if (!first) {
      latest.current.setOpen(wide.current);
    }
  }, [isMobile]);

  const collapses = collapsible !== "none";
  const state: SidebarState = isOpen || !collapses ? "expanded" : "collapsed";
  const closable = collapses && (close || isMobile);
  const hasHeader = title != null || description != null || actions != null || closable;

  const content = (
    <div data-slot="inner" className={theme.class.inner}>
      {hasHeader && (
        <div data-slot="header" className={theme.class.header}>
          {(title != null || description != null) && (
            <div data-slot="wrapper" className={theme.class.wrapper}>
              {title != null && (
                <p data-slot="title" className={theme.class.title}>
                  {title}
                </p>
              )}
              {description != null && (
                <p data-slot="description" className={theme.class.description}>
                  {description}
                </p>
              )}
            </div>
          )}

          {(actions != null || closable) && (
            <div data-slot="actions" className={theme.class.actions}>
              {actions}
              {closable && (
                <button
                  type="button"
                  aria-label="Collapse sidebar"
                  data-slot="close"
                  className={theme.class.close}
                  onClick={() => setOpen(false)}
                >
                  {closeIcon ?? <X />}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      <div data-slot="body" className={theme.class.body}>
        {children}
      </div>

      {footer != null && (
        <div data-slot="footer" className={theme.class.footer}>
          {footer}
        </div>
      )}
    </div>
  );

  return (
    <>
      <aside
        {...rest}
        data-slot="base"
        data-state={state}
        data-side={side}
        data-variant={variant}
        className={theme.class.base}
      >
        {/* Reserves the column the fixed panel beside it occupies. */}
        <div data-slot="gap" data-state={state} className={theme.class.gap} />

        <div data-slot="container" data-state={state} className={theme.class.container}>
          {content}

          {rail && collapses && (
            <button
              type="button"
              tabIndex={-1}
              aria-label="Toggle sidebar"
              data-slot="rail"
              data-state={state}
              className={theme.class.rail}
              onClick={() => setOpen(!isOpen)}
            />
          )}
        </div>
      </aside>

      {overlay && collapses && isMobile && isOpen && (
        <div data-slot="overlay" className={theme.class.overlay} onClick={() => setOpen(false)} />
      )}
    </>
  );
}
