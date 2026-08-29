import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import type { SlotClass, ComponentUI } from "@75neo/styles";
import { useThemeContext } from "../context/ThemeContext";

function applySlotClass(resolved: string, override: SlotClass | undefined): string {
  if (!override) return resolved;
  if (typeof override === "function") return override(resolved);
  return twMerge(resolved, override);
}

type TVSlotFn = (...args: unknown[]) => string;
type TVSlots = Record<string, TVSlotFn>;

export function useComponentUI<T extends Record<string, unknown>>(
  name: string,
  slots: T,
  uiProp?: ComponentUI,
): T {
  const { ui: themeUi } = useThemeContext();

  return useMemo(() => {
    const contextUi = (themeUi[name] ?? {}) as Record<string, SlotClass>;
    const resolved: Record<string, TVSlotFn> = {};
    const slotsRecord = slots as unknown as TVSlots;

    for (const [slotName, slotFn] of Object.entries(slotsRecord)) {
      resolved[slotName] = (...args: unknown[]) => {
        const base = (slotFn as TVSlotFn)(...args);
        const override = uiProp?.[slotName] ?? contextUi[slotName];
        return applySlotClass(base, override);
      };
    }

    return resolved as unknown as T;
  }, [name, slots, uiProp, themeUi]);
}
