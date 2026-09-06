import { createContext, useContext } from "react";
import { editableDefaults, type EditableColor, type EditableSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface EditableVariants {
  color: EditableColor;
  size: EditableSize;
}

const EditableVariantsContext = createContext<EditableVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useEditableVariants(): EditableVariants {
  return useContext(EditableVariantsContext) ?? editableDefaults;
}

export { EditableVariantsContext };
