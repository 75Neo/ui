import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the Editable: a sentence that becomes a field when it is touched.
 *
 * @remarks
 * The area is a grid with the text in the first column and the buttons in the
 * second, so the input and the preview stack in the same cell. Only one of them is
 * ever visible — Ark hides the other with the `hidden` attribute — except under
 * `autoResize`, where both stay mounted so the preview can measure the text and the
 * input keeps its size. The grid means that case needs no second layout.
 *
 * The accent reaches the input's focus ring and nothing else, which is the PinInput's
 * arrangement: a field that lights up while it is being written in, and quiet
 * buttons beside it.
 *
 * Ark spells disabled three ways here, and each is styled where it is written. The
 * three triggers are real buttons and carry the attribute, so they style with
 * `disabled:`. The input is a real input carrying both the attribute and
 * `data-disabled`; the attribute is what is styled. The preview is a `span` and
 * carries only `data-disabled`, alongside `data-placeholder-shown` while it has no
 * value, and the label carries `data-focus` while the field is being edited.
 */
export const editable = tv({
  slots: {
    base: "flex w-full min-w-0 flex-col gap-1.5",
    label: "font-medium text-highlighted select-none",
    area: "grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2",
    preview:
      "col-start-1 row-start-1 min-w-0 cursor-text truncate rounded-md text-toned hover:bg-elevated data-disabled:cursor-not-allowed data-disabled:opacity-75 data-[placeholder-shown]:text-dimmed",
    input:
      "col-start-1 row-start-1 min-w-0 rounded-md bg-default text-highlighted ring ring-accented outline-none ring-inset placeholder:text-dimmed disabled:cursor-not-allowed data-invalid:ring-error",
    control: "col-start-2 row-start-1 flex items-center gap-1",
    editTrigger:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-elevated hover:text-default disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-full",
    submitTrigger:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-elevated hover:text-default disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-full",
    cancelTrigger:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-elevated hover:text-default disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-full",
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
        preview: "px-2.5 py-1.5 text-xs",
        input: "px-2.5 py-1.5 text-xs",
        editTrigger: "size-7 p-1.5",
        submitTrigger: "size-7 p-1.5",
        cancelTrigger: "size-7 p-1.5",
      },
      md: {
        label: "text-sm",
        preview: "px-3 py-2 text-sm",
        input: "px-3 py-2 text-sm",
        editTrigger: "size-9 p-2",
        submitTrigger: "size-9 p-2",
        cancelTrigger: "size-9 p-2",
      },
      lg: {
        label: "text-sm",
        preview: "px-3.5 py-2 text-sm",
        input: "px-3.5 py-2 text-sm",
        editTrigger: "size-10 p-2.5",
        submitTrigger: "size-10 p-2.5",
        cancelTrigger: "size-10 p-2.5",
      },
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: { input: `focus-visible:ring-2 focus-visible:ring-${color}` },
    })),
    {
      color: "neutral",
      class: { input: "focus-visible:ring-2 focus-visible:ring-inverted" },
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

export type EditableVariants = VariantProps<typeof editable>;
export type EditableSlots = keyof ReturnType<typeof editable>;

export type EditableUI = TVSlot<EditableSlots>;

export type EditableTheme = ThemeOverride<EditableSlots, EditableVariants>;

/** What touching the preview does. Written out rather than imported from Ark. */
export type EditableActivationMode = "click" | "dblclick" | "focus" | "none";

/** What commits the value while editing. Written out rather than imported from Ark. */
export type EditableSubmitMode = "blur" | "enter" | "none" | "both";

/**
 * Everything an Editable accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The text and the edit state are not here: React spells them `value` with
 * `onValueChange` and `edit` with `onEditChange`, Vue spells them `v-model` and
 * `v-model:edit`, so each adapter takes them from Ark's root instead.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface EditableProps<F> {
  /** Per-slot class overrides. */
  ui?: EditableUI;
  color?: EditableVariants["color"];
  size?: EditableVariants["size"];
  /** Caption above the field. */
  label?: string;
  /** Shown while there is no value, in the preview, the field, or each on its own. */
  placeholder?: string | { edit: string; preview: string };
  /** What touching the preview does. @defaultValue `"focus"` */
  activationMode?: EditableActivationMode;
  /** What commits the value while editing. @defaultValue `"both"` */
  submitMode?: EditableSubmitMode;
  /** Grow the field with the text instead of keeping its size. */
  autoResize?: boolean;
  /** How many characters the value may hold. */
  maxLength?: number;
  /** Select the text when the field is entered. @defaultValue `true` */
  selectOnFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Submits the value under this name inside a form. */
  name?: string;
  /** Id of the form to submit with, for a field rendered outside it. */
  form?: string;
  /** Replaces the pencil that starts editing. */
  editIcon?: F;
  /** Replaces the tick that commits the value. */
  submitIcon?: F;
  /** Replaces the cross that reverts the value. */
  cancelIcon?: F;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type EditableVariantsAreExposed = MustBeNever<
  Exclude<keyof EditableVariants, keyof EditableProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    editable: ComponentContract<EditableSlots, EditableVariants>;
  }
}
