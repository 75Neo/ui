import type { ThemeOverride } from "../types/theme";
import { cn } from "tailwind-variants";
import { defu } from "defu";

export function applyThemeOverrides<U extends string, P extends object>(
  a: ThemeOverride<U, P>,
  b: ThemeOverride<U, P>,
): ThemeOverride<U, P> {
  const result = structuredClone(a);

  result.props = defu(b.props, result.props) as Partial<P>;

  if (!result.ui) {
    result.ui = b.ui;
  } else if (b.ui) {
    for (const k of Object.keys(b.ui) as U[]) {
      result.ui[k] = cn(result.ui[k], b.ui[k]);
    }
  }

  return result;
}
