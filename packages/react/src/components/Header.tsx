import type React from "react";
import { useState } from "react";
import { Dialog as Ark, type DialogRootProps } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { Menu, X } from "lucide-react";
import { header, type HeaderProps as HeaderContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the Header.
 *
 * @remarks
 * `title` is dropped from the HTML attributes, because the global attribute takes a
 * string for a tooltip where this component's is the wordmark.
 *
 * `children` is the centre of the bar, which is where a navigation goes on a wide
 * screen. It is hidden below `lg`, so anything in it that matters on a phone belongs in
 * `body` as well.
 */
export interface HeaderProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "title" | "dir">,
    Pick<DialogRootProps, "onOpenChange">,
    HeaderContract<React.ReactNode> {
  /** The middle of the bar, usually the primary navigation. */
  children?: React.ReactNode;
  /** Replaces the wordmark at the start of the bar. */
  left?: React.ReactNode;
  /** The end of the bar, usually actions. */
  right?: React.ReactNode;
  /** What the menu holds. Without it there is nothing to open and no toggle. */
  body?: React.ReactNode;
  /** Whether the menu is open. Leave it out to let the Header keep the state itself. */
  open?: boolean;
  /** The menu's starting state when the Header keeps it. */
  defaultOpen?: boolean;
}

/**
 * The bar across the top of a page, and the menu it opens where there is no room for a
 * navigation.
 *
 * @remarks
 * The wordmark and the actions are rendered twice, once in the bar and once at the top
 * of the menu, so the menu opens over the page without the page appearing to lose its
 * header. The toggle is in both and is the same button in both, which is why it is a
 * plain `button` driving this component's own state rather than one of Ark's triggers:
 * a trigger inside a modal panel is inert.
 */
export function Header({
  ui,
  toggleSide = "end",
  title,
  to,
  toggle = true,
  toggleIcon,
  toggleCloseIcon,
  overlay = true,
  portal = true,
  children,
  left,
  right,
  body,
  open,
  defaultOpen,
  onOpenChange,
  className,
  ...rest
}: HeaderProps) {
  const theme = useResolvedTheme(header, "header", { ui, toggleSide }, className);

  const [uncontrolled, setUncontrolled] = useState(defaultOpen ?? false);
  const isOpen = open ?? uncontrolled;

  /*
   * Ark reports its own dismissals through `onOpenChange`, so routing the toggle through
   * `setOpen` rather than through Ark keeps one path in and one path out: the button
   * writes the state, Ark reads it, and Escape or a click outside comes back here.
   */
  const setOpen = (next: boolean) => {
    if (open === undefined) setUncontrolled(next);
    onOpenChange?.({ open: next });
  };

  const hasMenu = toggle && body != null;

  const toggleButton = hasMenu && (
    <button
      type="button"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      data-slot="toggle"
      className={theme.class.toggle}
      onClick={() => setOpen(!isOpen)}
    >
      {isOpen ? (toggleCloseIcon ?? <X />) : (toggleIcon ?? <Menu />)}
    </button>
  );

  const wordmark =
    title != null &&
    (to != null ? (
      <a href={to} data-slot="title" className={theme.class.title}>
        {title}
      </a>
    ) : (
      <span data-slot="title" className={theme.class.title}>
        {title}
      </span>
    ));

  const start = (
    <div data-slot="left" className={theme.class.left}>
      {toggleSide === "start" && toggleButton}
      {left ?? wordmark}
    </div>
  );

  const end = (
    <div data-slot="right" className={theme.class.right}>
      {right}
      {toggleSide === "end" && toggleButton}
    </div>
  );

  const menu = (
    <>
      {overlay && <Ark.Backdrop data-slot="overlay" className={theme.class.overlay} />}
      <Ark.Positioner data-slot="positioner" className={theme.class.positioner}>
        <Ark.Content data-slot="menu" className={theme.class.menu}>
          <Ark.Title data-slot="menuTitle" className={theme.class.menuTitle}>
            {title ?? "Menu"}
          </Ark.Title>

          <div data-slot="menuHeader" className={theme.class.menuHeader}>
            {start}
            {end}
          </div>

          <div data-slot="menuBody" className={theme.class.menuBody}>
            {body}
          </div>
        </Ark.Content>
      </Ark.Positioner>
    </>
  );

  return (
    <Ark.Root open={isOpen} onOpenChange={(details) => setOpen(details.open)} lazyMount>
      <header {...rest} data-slot="base" className={theme.class.base}>
        <div data-slot="container" className={theme.class.container}>
          {start}
          <div data-slot="center" className={theme.class.center}>
            {children}
          </div>
          {end}
        </div>
      </header>

      {hasMenu && (portal ? <Portal>{menu}</Portal> : menu)}
    </Ark.Root>
  );
}
