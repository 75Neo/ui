import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the TagsInput: a field whose answers stay in it as chips.
 *
 * @remarks
 * The control wraps rather than scrolls, so a long list of tags makes the field taller
 * instead of hiding the ones that came first. That is why its height is a minimum and
 * not a height, and it is the one place this field's measurements differ from the
 * Combobox's, which they otherwise match.
 *
 * Every tag has two states of its own and they are two elements, not one. `itemPreview`
 * is the chip a reader sees; `itemInput` is the field it becomes when the tag is being
 * edited. Ark shows one or the other, so both carry the chip's measurements and the
 * swap does not move anything around it.
 *
 * The accent reaches the focus ring on the control and a tag under the arrow keys, and
 * nothing else. A chip is `bg-elevated` at rest whatever the accent, because a field
 * holding eight tags in the accent colour is a field nobody can read.
 *
 * The delete button and the clear button are real buttons and carry `disabled`. A tag
 * navigated to with the arrow keys carries `data-highlighted`, and the control carries
 * `data-invalid` when the tag count has passed `max` with overflow allowed.
 */
export const tagsInput = tv({
  slots: {
    base: "flex w-full min-w-0 flex-col gap-1.5",
    label: "font-medium text-highlighted select-none",
    control:
      "flex w-full min-w-0 flex-wrap items-center bg-default ring ring-accented ring-inset data-disabled:cursor-not-allowed data-disabled:opacity-75 data-invalid:ring-error",
    item: "inline-flex min-w-0",
    itemPreview:
      "inline-flex min-w-0 items-center rounded-sm bg-elevated text-toned select-none data-disabled:cursor-not-allowed data-disabled:opacity-75",
    itemText: "truncate",
    itemDeleteTrigger:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-xs text-dimmed transition-colors outline-none hover:text-default disabled:cursor-not-allowed [&>svg]:size-full",
    itemInput:
      "min-w-0 rounded-sm bg-elevated text-highlighted ring-1 ring-accented outline-none ring-inset",
    input:
      "min-w-24 flex-1 bg-transparent text-highlighted outline-none placeholder:text-dimmed disabled:cursor-not-allowed",
    clearTrigger:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-dimmed transition-colors outline-none hover:text-default disabled:cursor-not-allowed [&>svg]:size-full",
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
        control: "min-h-7 gap-1 rounded-md p-1 ps-1.5",
        itemPreview: "h-5 gap-1 px-1.5 text-xs",
        itemDeleteTrigger: "size-3",
        itemInput: "h-5 px-1.5 text-xs",
        input: "h-5 px-1 text-xs",
        clearTrigger: "size-3.5",
      },
      md: {
        label: "text-sm",
        control: "min-h-9 gap-1.5 rounded-md p-1.5 ps-2",
        itemPreview: "h-6 gap-1.5 px-2 text-sm",
        itemDeleteTrigger: "size-3.5",
        itemInput: "h-6 px-2 text-sm",
        input: "h-6 px-1 text-sm",
        clearTrigger: "size-4",
      },
      lg: {
        label: "text-sm",
        control: "min-h-10 gap-2 rounded-md p-2 ps-2.5",
        itemPreview: "h-7 gap-2 px-2.5 text-sm",
        itemDeleteTrigger: "size-4",
        itemInput: "h-7 px-2.5 text-sm",
        input: "h-7 px-1 text-sm",
        clearTrigger: "size-4",
      },
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: {
        control: `focus-within:ring-2 focus-within:ring-${color}`,
        itemPreview: `data-highlighted:bg-${color}/10 data-highlighted:text-${color}`,
      },
    })),
    {
      color: "neutral",
      class: {
        control: "focus-within:ring-2 focus-within:ring-inverted",
        itemPreview: "data-highlighted:bg-accented data-highlighted:text-highlighted",
      },
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

export type TagsInputVariants = VariantProps<typeof tagsInput>;
export type TagsInputSlots = keyof ReturnType<typeof tagsInput>;

export type TagsInputUI = TVSlot<TagsInputSlots>;

export type TagsInputTheme = ThemeOverride<TagsInputSlots, TagsInputVariants>;

/** What a tag is checked against before it is added. */
export interface TagsInputCandidate {
  /** The text that would become the tag. */
  inputValue: string;
  /** The tags already there. */
  value: string[];
}

/** What happens to half-typed text when the field loses focus. */
export type TagsInputBlurBehavior = "add" | "clear";

/**
 * Everything a TagsInput accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The tags are not here: React spells them `value` with `onValueChange`, Vue spells them
 * `v-model`, so each adapter takes them from Ark's root instead. They are a `string[]`
 * in both.
 *
 * The half-typed text is the component's own business, the same way the Combobox's query
 * is. It becomes a tag or it is thrown away, and a caller who needs to drive it drives
 * the tags instead.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface TagsInputProps<F> {
  /** Per-slot class overrides. */
  ui?: TagsInputUI;
  color?: TagsInputVariants["color"];
  size?: TagsInputVariants["size"];
  /** Caption above the control. */
  label?: string;
  /** Shown in the field while nothing is being typed. */
  placeholder?: string;
  /** How many tags are allowed. @defaultValue no limit */
  max?: number;
  /** How long one tag's text may be. */
  maxLength?: number;
  /** What ends a tag, and what a pasted string is split on. @defaultValue `","` */
  delimiter?: string | RegExp;
  /** Turn pasted text into tags rather than into half-typed text. */
  addOnPaste?: boolean;
  /** Accept a tag that is already there. */
  allowDuplicates?: boolean;
  /**
   * Accept more tags than `max`, and mark the field invalid instead of refusing them.
   */
  allowOverflow?: boolean;
  /** Let a tag be rewritten by double-clicking it or pressing Enter on it. @defaultValue `true` */
  editable?: boolean;
  /** What happens to half-typed text when the field loses focus. */
  blurBehavior?: TagsInputBlurBehavior;
  /** Put the caret in the field on mount. */
  autoFocus?: boolean;
  /** Show the button that removes every tag. @defaultValue `true` */
  clearable?: boolean;
  /** Decide whether a candidate may become a tag. */
  validate?: (details: TagsInputCandidate) => boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Submits the tags under this name inside a form. */
  name?: string;
  /** Replaces the cross on each tag. */
  deleteIcon?: F;
  /** Replaces the cross that removes every tag. */
  clearIcon?: F;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type TagsInputVariantsAreExposed = MustBeNever<
  Exclude<keyof TagsInputVariants, keyof TagsInputProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    tagsInput: ComponentContract<TagsInputSlots, TagsInputVariants>;
  }
}
