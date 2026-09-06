import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * FileUpload styling data: plain class strings both adapters feed into their own
 * `cva` calls, one per anatomy part. Nothing here knows a framework.
 *
 * @remarks
 * The dropzone is the whole control, not a strip beside a button. It is focusable and
 * clickable in its own right, so a keyboard reaches it without the button, and the
 * button inside it is a second way in rather than the only one. Ark writes
 * `data-dragging` on it while a file is over the window, which is where the accent
 * goes — the one moment the component has something to say. The accent arrives as a
 * ring rather than a border colour, because a ring is one more prefix on lines the
 * safelist already carries.
 *
 * A file in the list is a row, whatever it is, and the thumbnail is the only part
 * that knows the difference, so the row's height comes from its text and does not
 * jump between kinds.
 *
 * The dropzone and the trigger are the two disabled surfaces. The trigger is a real
 * button and takes the attribute; the dropzone is a `div` and carries
 * `data-disabled`.
 */

export type FileUploadSize = "sm" | "md" | "lg";
export type FileUploadColor = ComponentColor;

/** What the root publishes and every part reads. Lives in each adapter. */
export interface FileUploadVariants {
  color: FileUploadColor;
  size: FileUploadSize;
}

export const fileUploadDefaults = { color: "primary", size: "md" } as const;

export const fileUploadSchema = {
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const fileUploadParts = [
  { export: "FileUpload", file: "file-upload", contract: "FileUploadRootProps" },
  { export: "FileUploadLabel", file: "label", contract: null },
  { export: "FileUploadDropzone", file: "dropzone", contract: "FileUploadDropzoneProps" },
  { export: "FileUploadTrigger", file: "trigger", contract: null },
  { export: "FileUploadItemGroup", file: "item-group", contract: null },
  { export: "FileUploadItem", file: "item", contract: "FileUploadItemProps" },
  { export: "FileUploadItemPreview", file: "item-preview", contract: null },
  { export: "FileUploadItemName", file: "item-name", contract: null },
  { export: "FileUploadItemSizeText", file: "item-size-text", contract: null },
  {
    export: "FileUploadItemDeleteTrigger",
    file: "item-delete-trigger",
    contract: null,
  },
] as const satisfies readonly ComponentPart[];

export const fileUploadSizeData = {
  label: {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
  },
  dropzone: {
    sm: "gap-1.5 p-4",
    md: "gap-2 p-6",
    lg: "gap-2.5 p-8",
  },
  leadingIcon: {
    sm: "size-6",
    md: "size-8",
    lg: "size-10",
  },
  title: {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  },
  description: {
    sm: "text-xs",
    md: "text-xs",
    lg: "text-sm",
  },
  trigger: {
    sm: "h-7 px-2.5 text-xs",
    md: "h-8 px-3 text-sm",
    lg: "h-9 px-3.5 text-sm",
  },
  itemGroup: {
    sm: "mt-1.5 gap-1.5",
    md: "mt-2 gap-2",
    lg: "mt-2.5 gap-2.5",
  },
  item: {
    sm: "gap-2 p-1.5",
    md: "gap-3 p-2",
    lg: "gap-3 p-2.5",
  },
  itemPreview: {
    sm: "size-8",
    md: "size-10",
    lg: "size-12",
  },
  itemName: {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
  },
  itemSizeText: {
    sm: "text-[0.6875rem]",
    md: "text-xs",
    lg: "text-xs",
  },
  itemDeleteTrigger: {
    sm: "size-6 p-1",
    md: "size-7 p-1.5",
    lg: "size-8 p-1.5",
  },
} as const satisfies Record<string, Record<FileUploadSize, string>>;

/** One colour row, as `cva` compound variants read it. */
export interface FileUploadColorCompound {
  color?: FileUploadColor;
  class: string;
}

export const fileUploadDropzoneCompoundData: FileUploadColorCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `focus-visible:ring-2 focus-visible:ring-${color} data-dragging:bg-${color}/10 data-dragging:ring-2 data-dragging:ring-${color}`,
  })),
  {
    color: "neutral",
    class:
      "focus-visible:ring-2 focus-visible:ring-inverted data-dragging:bg-elevated data-dragging:ring-2 data-dragging:ring-inverted",
  },
];

export const fileUploadTriggerCompoundData: FileUploadColorCompound[] = [
  ...eachColor((color) => ({ color, class: `focus-visible:ring-2 focus-visible:ring-${color}` })),
  { color: "neutral", class: "focus-visible:ring-2 focus-visible:ring-inverted" },
];

/**
 * The only part of a file this package is allowed to see.
 *
 * @remarks
 * `@75neo/themes` typechecks without the DOM library, which keeps it honest about
 * being Tailwind classes and rules rather than anything that touches a browser. So
 * the rule below takes the one field it reads rather than a `File`, which a real
 * `File` satisfies structurally.
 */
export interface FileLike {
  /** The MIME type the browser filled in. */
  type: string;
}

/**
 * Whether a file can be shown as a thumbnail.
 *
 * @param file - The file that landed.
 * @returns Whether it is an image the browser will draw.
 *
 * @remarks
 * Lives here rather than in either adapter because both need exactly this rule, and
 * a list whose halves disagreed about which rows get a picture would be two
 * components. It reads the MIME type rather than the extension, because that is what
 * the browser fills in and what a renamed file cannot lie about.
 */
export function isPreviewableFile(file: FileLike): boolean {
  return file.type.startsWith("image/");
}

/** Everything a FileUpload dropzone accepts in both frameworks. */
export interface FileUploadDropzoneProps<F> {
  /** The line inside the dropzone. @defaultValue `"Drop a file here"` */
  title?: string;
  /** The quieter line under it. */
  description?: string;
  /** Replaces the icon above the text. */
  icon?: F;
}

/**
 * Everything a FileUpload row accepts in both frameworks.
 *
 * @typeParam F - However the framework spells an icon.
 */
export interface FileUploadItemProps<F> {
  /** Draw a thumbnail beside an image. @defaultValue `true` */
  preview?: boolean;
  /** Replaces the cross that removes the file. */
  deleteIcon?: F;
}

/**
 * Everything the FileUpload root accepts in both frameworks.
 *
 * @remarks
 * The files are not here: React spells them `acceptedFiles` with `onFileChange`, Vue
 * spells them `v-model`, so each adapter takes them from Ark's root instead.
 */
export interface FileUploadRootProps<F> {
  color?: FileUploadColor;
  size?: FileUploadSize;
  /** Caption above the dropzone. */
  label?: string;
  /** The line inside the dropzone. @defaultValue `"Drop a file here"` */
  title?: string;
  /** The quieter line under it. */
  description?: string;
  /** What the button inside the dropzone says. @defaultValue `"Choose a file"` */
  triggerLabel?: string;
  /** Which files are allowed, as MIME types or extensions. */
  accept?: string | string[] | Record<string, string[]>;
  /** How many files may be held at once. @defaultValue `1` */
  maxFiles?: number;
  /** The largest a file may be, in bytes. */
  maxFileSize?: number;
  /** The smallest a file may be, in bytes. */
  minFileSize?: number;
  /** Accept files dragged onto the dropzone. @defaultValue `true` */
  allowDrop?: boolean;
  /** Accept a whole folder. Webkit browsers only. */
  directory?: boolean;
  /** Which camera to open on a phone. */
  capture?: "user" | "environment";
  /** Draw a thumbnail beside each image. @defaultValue `true` */
  preview?: boolean;
  /** Show the list of files that landed. @defaultValue `true` */
  list?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Submits the files under this name inside a form. */
  name?: string;
  /** The locale the file sizes are written in. */
  locale?: string;
  /** Replaces the icon above the dropzone's text. */
  icon?: F;
  /** Replaces the cross that removes a file from the list. */
  deleteIcon?: F;
}
