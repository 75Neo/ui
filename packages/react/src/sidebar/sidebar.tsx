import { useEffect, useRef, useState } from "react";
import type React from "react";
import { cva } from "class-variance-authority";
import {
  cn,
  sidebarClasses,
  sidebarCollapsibleData,
  sidebarDefaults,
  sidebarGapCompoundData,
  sidebarMobileQuery,
  sidebarPanelCompoundData,
  sidebarSideData,
  sidebarVariantData,
  type SidebarRootProps as SidebarContract,
  type SidebarState,
} from "@75neo/themes";
import { useMediaQuery } from "./use-media-query";
import { SidebarVariantsContext } from "./variants";
import { SidebarActions } from "./actions";
import { SidebarBody } from "./body";
import { SidebarCloseTrigger } from "./close-trigger";
import { SidebarDescription } from "./description";
import { SidebarFooter } from "./footer";
import { SidebarHeader } from "./header";
import { SidebarRail } from "./rail";
import { SidebarTitle } from "./title";

const sidebarRoot = cva(sidebarClasses.root, {
  variants: { collapsible: sidebarCollapsibleData.root },
  defaultVariants: sidebarDefaults,
});

const sidebarGap = cva(sidebarClasses.gap, {
  variants: {
    variant: { sidebar: "", floating: "", inset: "" },
    collapsible: sidebarCollapsibleData.gap,
  },
  compoundVariants: sidebarGapCompoundData,
  defaultVariants: sidebarDefaults,
});

const sidebarPanel = cva(sidebarClasses.panel, {
  variants: {
    side: sidebarSideData.panel,
    variant: sidebarVariantData.panel,
    collapsible: sidebarCollapsibleData.panel,
  },
  compoundVariants: sidebarPanelCompoundData,
  defaultVariants: sidebarDefaults,
});

const sidebarInner = cva(sidebarClasses.inner, {
  variants: { variant: sidebarVariantData.inner },
  defaultVariants: sidebarDefaults,
});

/**
 * Props for the Sidebar.
 *
 * @remarks
 * `title` is dropped from the HTML attributes, because the global attribute is a
 * tooltip where this one heads the column. `children` is the body, not a trigger: a
 * Sidebar is part of the page rather than something summoned onto it.
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
 * crosses: entering the narrow one remembers where the wide one was and closes the
 * panel, and leaving it puts the remembered value back. Without that, a sidebar that
 * is expanded by design would cover a phone's content the moment the page loaded.
 */
export function Sidebar({
  side = sidebarDefaults.side,
  variant = sidebarDefaults.variant,
  collapsible = sidebarDefaults.collapsible,
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
  const mobile = useMediaQuery(sidebarMobileQuery);
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const isOpen = open ?? uncontrolled;

  const setOpen = (next: boolean) => {
    if (open === undefined) setUncontrolled(next);
    onOpenChange?.({ open: next });
  };

  /*
   * The viewport effect reads the state and writes it, and must run only when the
   * viewport crosses — listing either as a dependency would run it on every toggle.
   * Both are parked in a ref by an effect declared first, so the ref is current by the
   * time the second one reads it.
   */
  const latest = useRef({ isOpen, setOpen });
  useEffect(() => {
    latest.current = { isOpen, setOpen };
  });

  const wide = useRef(defaultOpen);
  const wasMobile = useRef<boolean | null>(null);

  useEffect(() => {
    if (wasMobile.current === mobile) return;
    const first = wasMobile.current === null;
    wasMobile.current = mobile;

    if (mobile) {
      wide.current = latest.current.isOpen;
      latest.current.setOpen(false);
    } else if (!first) {
      latest.current.setOpen(wide.current);
    }
  }, [mobile]);

  const collapses = collapsible !== "none";
  const state: SidebarState = isOpen || !collapses ? "expanded" : "collapsed";
  const closable = collapses && (close || mobile);
  const hasHeader = title != null || description != null || actions != null || closable;
  const axes = { side, variant, collapsible };

  return (
    <SidebarVariantsContext.Provider value={{ ...axes, state, open: isOpen, setOpen, mobile }}>
      <aside
        {...rest}
        data-slot="sidebar"
        data-state={state}
        data-side={side}
        data-variant={variant}
        className={cn(sidebarRoot({ collapsible }), className)}
      >
        {/* Reserves the column the fixed panel beside it occupies. */}
        <div data-slot="sidebar-gap" data-state={state} className={sidebarGap(axes)} />

        <div data-slot="sidebar-panel" data-state={state} className={sidebarPanel(axes)}>
          <div data-slot="sidebar-inner" className={sidebarInner(axes)}>
            {hasHeader && (
              <SidebarHeader>
                {(title != null || description != null) && (
                  <div data-slot="sidebar-heading" className={sidebarClasses.heading}>
                    {title != null && <SidebarTitle>{title}</SidebarTitle>}
                    {description != null && <SidebarDescription>{description}</SidebarDescription>}
                  </div>
                )}
                {(actions != null || closable) && (
                  <SidebarActions>
                    {actions}
                    {closable && <SidebarCloseTrigger>{closeIcon}</SidebarCloseTrigger>}
                  </SidebarActions>
                )}
              </SidebarHeader>
            )}

            <SidebarBody>{children}</SidebarBody>
            {footer != null && <SidebarFooter>{footer}</SidebarFooter>}
          </div>

          {rail && collapses && <SidebarRail />}
        </div>
      </aside>

      {overlay && collapses && mobile && isOpen && (
        <div
          data-slot="sidebar-backdrop"
          className={sidebarClasses.backdrop}
          onClick={() => setOpen(false)}
        />
      )}
    </SidebarVariantsContext.Provider>
  );
}
