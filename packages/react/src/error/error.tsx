import type React from "react";
import {
  cn,
  errorDefaults,
  errorRootClass,
  type ErrorRootProps as ErrorContract,
} from "@75neo/themes";
import { ErrorVariantsContext } from "./variants";
import { ErrorIcon } from "./icon";
import { ErrorLinks } from "./links";
import { ErrorMessage } from "./message";
import { ErrorStatusCode } from "./status-code";
import { ErrorStatusMessage } from "./status-message";

/**
 * Props for the Error.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the axis of the same name. `children` is the row of links under
 * the message, which is the one region a caller has to own.
 */
export interface ErrorProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">, ErrorContract<React.ReactNode> {
  /** Links under the message, usually a way back. */
  children?: React.ReactNode;
}

export function Error({
  color,
  icon,
  statusCode,
  statusMessage,
  message,
  className,
  children,
  ...rest
}: ErrorProps) {
  const resolved = { color: color ?? errorDefaults.color };
  // A server that sends the same string twice renders one line.
  const body = message != null && message !== statusMessage ? message : undefined;

  return (
    <ErrorVariantsContext.Provider value={resolved}>
      <main
        {...rest}
        data-slot="error"
        data-color={resolved.color}
        className={cn(errorRootClass, className)}
      >
        {icon != null && <ErrorIcon>{icon}</ErrorIcon>}
        {statusCode != null && <ErrorStatusCode>{statusCode}</ErrorStatusCode>}
        {statusMessage != null && <ErrorStatusMessage>{statusMessage}</ErrorStatusMessage>}
        {body != null && <ErrorMessage>{body}</ErrorMessage>}
        {children != null && <ErrorLinks>{children}</ErrorLinks>}
      </main>
    </ErrorVariantsContext.Provider>
  );
}
