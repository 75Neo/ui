import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the FileUpload: the area files are dropped on, and the list of what landed.
 *
 * @remarks
 * The dropzone is the whole control, not a strip beside a button. It is focusable and
 * clickable in its own right, so a keyboard reaches it without the button, and the
 * button inside it is a second way in rather than the only one. Ark writes
 * `data-dragging` on it while a file is over the window, which is where the accent goes
 * — the one moment the component has something to say. The accent arrives as a ring
 * rather than as a border colour, because a ring is one more prefix on lines the
 * safelist already carries where a border colour would be a whole new family of them.
 *
 * A file in the list is a row, whatever it is, and the thumbnail is the only part that
 * knows the difference. `itemPreview` is drawn for an image and skipped for anything
 * else, so the row's height comes from its text and does not jump between kinds.
 *
 * The dropzone and the trigger are the two disabled surfaces. The trigger is a real
 * button and takes the attribute; the dropzone is a `div` and carries `data-disabled`,
 * which is the rule this library follows everywhere: read the part, do not infer from
 * the tag.
 */
export const fileUpload = tv({
  slots: {
    base: "flex w-full min-w-0 flex-col gap-1.5",
    label: "font-medium text-highlighted select-none",
    dropzone:
      "flex w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-accented bg-default text-center transition-colors outline-none hover:bg-elevated/50 data-disabled:cursor-not-allowed data-disabled:opacity-75 hover:data-disabled:bg-default data-invalid:border-error",
    leadingIcon: "shrink-0 text-dimmed [&>svg]:size-full",
    title: "font-medium text-highlighted",
    description: "text-muted",
    trigger:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md font-medium text-highlighted ring ring-accented transition-colors outline-none ring-inset hover:bg-elevated disabled:cursor-not-allowed disabled:opacity-75",
    list: "flex list-none flex-col",
    item: "flex min-w-0 items-center rounded-md bg-elevated/50 ring ring-muted ring-inset",
    itemPreview: "shrink-0 overflow-hidden rounded-sm bg-accented",
    itemPreviewImage: "size-full object-cover",
    wrapper: "flex min-w-0 flex-1 flex-col",
    itemName: "truncate font-medium text-highlighted",
    itemSizeText: "text-dimmed tabular-nums",
    itemDeleteTrigger:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-accented hover:text-default disabled:cursor-not-allowed [&>svg]:size-full",
  },
  variants: {
    color: {
      primary: "",
      secondary: "",
      success: "",
      info: "",
      warning: "",
      error: "",
      neutral: "",
    },
    size: {
      sm: {
        label: "text-xs",
        dropzone: "gap-1.5 p-4",
        leadingIcon: "size-6",
        title: "text-xs",
        description: "text-xs",
        trigger: "h-7 px-2.5 text-xs",
        list: "mt-1.5 gap-1.5",
        item: "gap-2 p-1.5",
        itemPreview: "size-8",
        itemName: "text-xs",
        itemSizeText: "text-[0.6875rem]",
        itemDeleteTrigger: "size-6 p-1",
      },
      md: {
        label: "text-sm",
        dropzone: "gap-2 p-6",
        leadingIcon: "size-8",
        title: "text-sm",
        description: "text-xs",
        trigger: "h-8 px-3 text-sm",
        list: "mt-2 gap-2",
        item: "gap-3 p-2",
        itemPreview: "size-10",
        itemName: "text-sm",
        itemSizeText: "text-xs",
        itemDeleteTrigger: "size-7 p-1.5",
      },
      lg: {
        label: "text-sm",
        dropzone: "gap-2.5 p-8",
        leadingIcon: "size-10",
        title: "text-base",
        description: "text-sm",
        trigger: "h-9 px-3.5 text-sm",
        list: "mt-2.5 gap-2.5",
        item: "gap-3 p-2.5",
        itemPreview: "size-12",
        itemName: "text-sm",
        itemSizeText: "text-xs",
        itemDeleteTrigger: "size-8 p-1.5",
      },
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: {
        dropzone: `focus-visible:ring-2 focus-visible:ring-${color} data-dragging:bg-${color}/10 data-dragging:ring-2 data-dragging:ring-${color}`,
        trigger: `focus-visible:ring-2 focus-visible:ring-${color}`,
      },
    })),
    {
      color: "neutral",
      class: {
        dropzone:
          "focus-visible:ring-2 focus-visible:ring-inverted data-dragging:bg-elevated data-dragging:ring-2 data-dragging:ring-inverted",
        trigger: "focus-visible:ring-2 focus-visible:ring-inverted",
      },
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

export type FileUploadVariants = VariantProps<typeof fileUpload>;
export type FileUploadSlots = keyof ReturnType<typeof fileUpload>;

export type FileUploadUI = TVSlot<FileUploadSlots>;

export type FileUploadTheme = ThemeOverride<FileUploadSlots, FileUploadVariants>;

/**
 * The only part of a file this package is allowed to see.
 *
 * @remarks
 * `@75neo/themes` typechecks without the DOM library, which is what keeps it honest
 * about being Tailwind classes and rules rather than anything that touches a browser.
 * So the rule below takes the one field it reads rather than a `File`, which a real
 * `File` satisfies structurally and which costs the adapters nothing.
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
 * Lives here rather than in either adapter because both need exactly this rule, and a
 * list whose React and Vue halves disagreed about which rows get a picture would be two
 * components. It reads the MIME type rather than the extension, because that is what
 * the browser fills in and what a renamed file cannot lie about.
 */
export function isPreviewableFile(file: FileLike): boolean {
  return file.type.startsWith("image/");
}

/**
 * Everything a FileUpload accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The files are not here: React spells them `acceptedFiles` with `onFileChange`, Vue
 * spells them `v-model`, so each adapter takes them from Ark's root instead. They are
 * `File[]` in both, which is what a form body wants and what a thumbnail can be read
 * from without a round trip.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface FileUploadProps<F> {
  /** Per-slot class overrides. */
  ui?: FileUploadUI;
  color?: FileUploadVariants["color"];
  size?: FileUploadVariants["size"];
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
  /** The locale the file sizes are written in. Falls back to the one the App publishes. */
  locale?: string;
  /** Replaces the icon above the dropzone's text. */
  icon?: F;
  /** Replaces the cross that removes a file from the list. */
  deleteIcon?: F;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type FileUploadVariantsAreExposed = MustBeNever<
  Exclude<keyof FileUploadVariants, keyof FileUploadProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    fileUpload: ComponentContract<FileUploadSlots, FileUploadVariants>;
  }
}
