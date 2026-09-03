import type React from "react";
import { footer, type FooterProps as FooterContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the Footer.
 *
 * @remarks
 * `children` is the centre of the row, which is the region a footer with one thing in
 * it should use. The other four are named.
 */
export interface FooterProps extends React.HTMLAttributes<HTMLElement>, FooterContract {
  /** The middle of the row, usually a short navigation. */
  children?: React.ReactNode;
  /** The start of the row, usually a copyright line. */
  left?: React.ReactNode;
  /** The end of the row, usually social or legal links. */
  right?: React.ReactNode;
  /** A full-width band above the row. */
  top?: React.ReactNode;
  /** A full-width band below the row. */
  bottom?: React.ReactNode;
}

/**
 * The strip along the bottom of a page: three regions in a row, and two optional bands
 * above and below it.
 *
 * @remarks
 * The regions are written into the DOM in the order right, centre, left and put back in
 * reading order by the recipe, so a phone stacks the links above the copyright. Nothing
 * about that is visible from here; see the note on the recipe.
 */
export function Footer({
  ui,
  children,
  left,
  right,
  top,
  bottom,
  className,
  ...rest
}: FooterProps) {
  const theme = useResolvedTheme(footer, "footer", { ui }, className);

  return (
    <footer {...rest} data-slot="base" className={theme.class.base}>
      {top != null && (
        <div data-slot="top" className={theme.class.top}>
          {top}
        </div>
      )}

      <div data-slot="container" className={theme.class.container}>
        <div data-slot="right" className={theme.class.right}>
          {right}
        </div>
        <div data-slot="center" className={theme.class.center}>
          {children}
        </div>
        <div data-slot="left" className={theme.class.left}>
          {left}
        </div>
      </div>

      {bottom != null && (
        <div data-slot="bottom" className={theme.class.bottom}>
          {bottom}
        </div>
      )}
    </footer>
  );
}
