import type React from "react";
import { cva } from "class-variance-authority";
import {
  cn,
  sidebarClasses,
  sidebarDefaults,
  sidebarRailCompoundData,
  sidebarSideData,
  sidebarVariantData,
} from "@75neo/themes";
import { useSidebarVariants } from "./variants";

const sidebarRail = cva(sidebarClasses.rail, {
  variants: {
    side: sidebarSideData.rail,
    variant: sidebarVariantData.rail,
  },
  compoundVariants: sidebarRailCompoundData,
  defaultVariants: sidebarDefaults,
});

export interface SidebarRailProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/** The strip along the sidebar's outer edge that toggles it when clicked. */
export function SidebarRail({ className, ...rest }: SidebarRailProps) {
  const { side, variant, state, open, setOpen } = useSidebarVariants();

  return (
    <button
      {...rest}
      type="button"
      tabIndex={-1}
      aria-label="Toggle sidebar"
      data-slot="sidebar-rail"
      data-state={state}
      className={cn(sidebarRail({ side, variant }), className)}
      onClick={() => setOpen(!open)}
    />
  );
}
