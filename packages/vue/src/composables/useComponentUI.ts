import { computed, type MaybeRef, toValue } from "vue";
import { twMerge } from "tailwind-merge";
import type { SlotClass, ComponentUI } from "@75neo/styles";
import { injectThemeContext } from "./useTheme";

function applySlotClass(resolved: string, override: SlotClass | undefined): string {
  if (!override) return resolved;
  if (typeof override === "function") return override(resolved);
  return twMerge(resolved, override);
}

type TVSlotFn = (...args: unknown[]) => string;
type TVSlots = Record<string, TVSlotFn>;

export function useComponentUI<T extends Record<string, unknown>>(
  name: string,
  slots: MaybeRef<T>,
  uiProp?: MaybeRef<ComponentUI | undefined>,
) {
  const { ui: themeUi } = injectThemeContext();

  return computed(() => {
    const propUi = toValue(uiProp) ?? {};
    const contextUi = (themeUi.value[name] ?? {}) as Record<string, SlotClass>;
    const currentSlots = toValue(slots) as unknown as TVSlots;

    const resolved: Record<string, TVSlotFn> = {};

    for (const [slotName, slotFn] of Object.entries(currentSlots)) {
      resolved[slotName] = (...args: unknown[]) => {
        const base = (slotFn as TVSlotFn)(...args);
        const override = propUi[slotName] ?? contextUi[slotName];
        return applySlotClass(base, override);
      };
    }

    return resolved as unknown as T;
  });
}
