import { createContext, useContext } from "react";
import { avatarDefaults, type AvatarVariants } from "@75neo/themes";

const AvatarVariantsContext = createContext<AvatarVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useAvatarVariants(): AvatarVariants {
  return useContext(AvatarVariantsContext) ?? avatarDefaults;
}

export { AvatarVariantsContext };
