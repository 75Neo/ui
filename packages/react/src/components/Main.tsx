import type React from "react";
import { main, type MainProps as MainContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/** Props for the Main. */
export interface MainProps extends React.HTMLAttributes<HTMLElement>, MainContract {
  /** The page's own content. */
  children?: React.ReactNode;
}

/**
 * The page's content region, tall enough to push a Footer to the bottom of the screen.
 *
 * @remarks
 * Renders a `main`, which is the landmark a screen reader jumps to, so there should be
 * exactly one of these on a page.
 */
export function Main({ ui, className, children, ...rest }: MainProps) {
  const theme = useResolvedTheme(main, "main", { ui }, className);

  return (
    <main {...rest} data-slot="base" className={theme.class.base}>
      {children}
    </main>
  );
}
