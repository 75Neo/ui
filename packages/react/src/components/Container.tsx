import type React from "react";
import { container, type ContainerProps as ContainerContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/** Props for the Container. */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement>, ContainerContract {
  /** The content held to the measure. */
  children?: React.ReactNode;
}

/**
 * Holds its content to the page's measure and keeps it off the edge of the screen.
 *
 * @remarks
 * A `div`, deliberately. The landmark elements are the Header, the Main and the Footer;
 * a Container is a measurement and carries no meaning of its own.
 */
export function Container({ ui, className, children, ...rest }: ContainerProps) {
  const theme = useResolvedTheme(container, "container", { ui }, className);

  return (
    <div {...rest} data-slot="base" className={theme.class.base}>
      {children}
    </div>
  );
}
