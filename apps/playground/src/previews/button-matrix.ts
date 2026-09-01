import type { ButtonProps } from "@75neo/themes";

type Props = ButtonProps<unknown>;

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
