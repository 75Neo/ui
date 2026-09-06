import { createContext, useContext } from "react";
import { tagsInputDefaults, type TagsInputColor, type TagsInputSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface TagsInputVariants {
  color: TagsInputColor;
  size: TagsInputSize;
}

const TagsInputVariantsContext = createContext<TagsInputVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useTagsInputVariants(): TagsInputVariants {
  return useContext(TagsInputVariantsContext) ?? tagsInputDefaults;
}

export { TagsInputVariantsContext };
