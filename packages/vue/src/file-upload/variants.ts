import { inject, type InjectionKey } from "vue";
import { fileUploadDefaults, type FileUploadVariants } from "@75neo/themes";

export const fileUploadVariantsKey: InjectionKey<FileUploadVariants> =
  Symbol("file-upload-variants");

/** Read the root's design axes. Outside a root these are the defaults. */
export function useFileUploadVariants(): FileUploadVariants {
  return inject(fileUploadVariantsKey, fileUploadDefaults);
}
