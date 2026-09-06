import { inject, type InjectionKey } from "vue";
import { tagsInputDefaults, type TagsInputColor, type TagsInputSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface TagsInputVariants {
  color: TagsInputColor;
  size: TagsInputSize;
}

export const tagsInputVariantsKey: InjectionKey<TagsInputVariants> = Symbol("tags-input-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useTagsInputVariants(): TagsInputVariants {
  return inject(tagsInputVariantsKey, tagsInputDefaults);
}
