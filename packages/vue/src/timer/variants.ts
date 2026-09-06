import { inject, type InjectionKey } from "vue";
import { timerDefaults, type TimerVariants } from "@75neo/themes";

export const timerVariantsKey: InjectionKey<TimerVariants> = Symbol("timer-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useTimerVariants(): TimerVariants {
  return inject(timerVariantsKey, timerDefaults);
}
