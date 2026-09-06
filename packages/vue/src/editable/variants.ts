import { inject, type InjectionKey } from "vue";
import { editableDefaults, type EditableColor, type EditableSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface EditableVariants {
  color: EditableColor;
  size: EditableSize;
}

export const editableVariantsKey: InjectionKey<EditableVariants> = Symbol("editable-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useEditableVariants(): EditableVariants {
  return inject(editableVariantsKey, editableDefaults);
}
