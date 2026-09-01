import type { ButtonProps } from "@75neo/core";

/** The generic is the framework's icon/node type; the preview only needs the plain variants. */
type Props = ButtonProps<unknown>;

/* Kept in one place so the React and Vue previews can never drift out of sync — the point of
   the side-by-side layout is that a difference on screen means a difference in a component. */

export const variants = [
  "solid",
  "soft",
  "outline",
  "ghost",
] as const satisfies readonly NonNullable<Props["variant"]>[];

export const sizes = ["xs", "sm", "md", "lg", "xl"] as const satisfies readonly NonNullable<
  Props["size"]
>[];

export const colors = [
  "primary",
  "secondary",
  "neutral",
  "success",
  "info",
  "warning",
  "error",
] as const satisfies readonly NonNullable<Props["color"]>[];
