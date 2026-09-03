import type React from "react";
import { error, type ErrorProps as ErrorContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the Error.
 *
 * @remarks
 * `color` is dropped from the HTML attributes, where the legacy presentational
 * attribute would collide with the variant.
 */
export interface ErrorProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">, ErrorContract<React.ReactNode> {
  /** Whatever should follow the message, usually a button back to somewhere useful. */
  children?: React.ReactNode;
}

/**
 * The page shown when there is nothing else to show: a status, a headline, a sentence,
 * and whatever way out the caller offers.
 *
 * @remarks
 * Renders a `main`, because on an error page this is the page. A message identical to
 * the status message is dropped rather than printed twice, which is what a server that
 * sends both fields the same way produces.
 */
export function Error({
  ui,
  color,
  icon,
  statusCode,
  statusMessage,
  message,
  children,
  className,
  ...rest
}: ErrorProps) {
  const theme = useResolvedTheme(error, "error", { ui, color }, className);
  const body = message != null && message !== statusMessage ? message : undefined;

  return (
    <main {...rest} data-slot="base" className={theme.class.base}>
      {icon != null && (
        <div data-slot="leading" className={theme.class.leading}>
          <span data-slot="leadingIcon" className={theme.class.leadingIcon}>
            {icon}
          </span>
        </div>
      )}

      {statusCode != null && (
        <p data-slot="statusCode" className={theme.class.statusCode}>
          {statusCode}
        </p>
      )}

      {statusMessage != null && (
        <h1 data-slot="statusMessage" className={theme.class.statusMessage}>
          {statusMessage}
        </h1>
      )}

      {body != null && (
        <p data-slot="message" className={theme.class.message}>
          {body}
        </p>
      )}

      {children != null && (
        <div data-slot="links" className={theme.class.links}>
          {children}
        </div>
      )}
    </main>
  );
}
