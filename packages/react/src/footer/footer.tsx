import type React from "react";
import { cn } from "@75neo/themes";
import { FooterBottom } from "./bottom";
import { FooterCenter } from "./center";
import { FooterEnd } from "./end";
import { FooterRow } from "./row";
import { FooterStart } from "./start";
import { FooterTop } from "./top";

/**
 * Props for the Footer.
 *
 * @remarks
 * The five regions are content the caller owns and each is a named prop, so
 * `children` is left free to compose the parts directly. Passing children replaces
 * the composed row rather than adding to it.
 */
export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** A full-width band above the row. */
  top?: React.ReactNode;
  /** The start of the row, usually a copyright line. */
  start?: React.ReactNode;
  /** The middle of the row, usually a short navigation. */
  center?: React.ReactNode;
  /** The end of the row, usually social or legal links. */
  end?: React.ReactNode;
  /** A full-width band below the row. */
  bottom?: React.ReactNode;
  children?: React.ReactNode;
}

export function Footer({
  top,
  start,
  center,
  end,
  bottom,
  className,
  children,
  ...rest
}: FooterProps) {
  return (
    <footer {...rest} data-slot="footer" className={cn(className)}>
      {children ?? (
        <>
          {top != null && <FooterTop>{top}</FooterTop>}
          <FooterRow>
            <FooterEnd>{end}</FooterEnd>
            <FooterCenter>{center}</FooterCenter>
            <FooterStart>{start}</FooterStart>
          </FooterRow>
          {bottom != null && <FooterBottom>{bottom}</FooterBottom>}
        </>
      )}
    </footer>
  );
}
