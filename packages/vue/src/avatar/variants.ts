import { inject, type InjectionKey } from "vue";
import { avatarDefaults, type AvatarVariants } from "@75neo/themes";

export const avatarVariantsKey: InjectionKey<AvatarVariants> = Symbol("avatar-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useAvatarVariants(): AvatarVariants {
  return inject(avatarVariantsKey, avatarDefaults);
}
