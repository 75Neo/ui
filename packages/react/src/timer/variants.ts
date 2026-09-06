import { createContext, useContext } from "react";
import { timerDefaults, type TimerVariants } from "@75neo/themes";

const TimerVariantsContext = createContext<TimerVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useTimerVariants(): TimerVariants {
  return useContext(TimerVariantsContext) ?? timerDefaults;
}

export { TimerVariantsContext };
