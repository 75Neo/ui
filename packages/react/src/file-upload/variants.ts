import { createContext, useContext } from "react";
import { fileUploadDefaults, type FileUploadVariants } from "@75neo/themes";

const FileUploadVariantsContext = createContext<FileUploadVariants | null>(null);

/** Read the root's design axes. Outside a root these are the defaults. */
export function useFileUploadVariants(): FileUploadVariants {
  return useContext(FileUploadVariantsContext) ?? fileUploadDefaults;
}

export { FileUploadVariantsContext };
