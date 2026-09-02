import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the Clipboard: a read-only field holding a value, and a button that copies
 * it.
 *
 * @remarks
 * The value is shown rather than hidden behind the button, because the thing a reader
 * is about to paste is worth reading first. The field is an input rather than a `<p>`
 * so the text can still be selected a word at a time.
 *
 * Copied state is signalled by swapping the icon, which Ark does through its own
 * indicator, so no `data-copied` class is needed and no seventh color strength is
 * spent on the confirmation.
 *
 * The color variant reaches the trigger only. The field around it is furniture, and a
 * command box that changed color with the accent would compete with whatever it sits
 * next to.
 */
export const clipboard = tv({
  slots: {
    base: "flex min-w-0 flex-col gap-1.5",
    label: "font-medium text-highlighted",
    control: "flex min-w-0 items-center gap-2 rounded-md bg-default ring ring-accented ring-inset",
    input: "min-w-0 flex-1 truncate bg-transparent font-mono text-toned outline-none",
    trigger:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm transition-colors focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75",
    indicator: "shrink-0 [&>svg]:size-full",
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
        control: "py-1 ps-2.5 pe-1",
        input: "text-xs",
        trigger: "size-6 p-1",
        indicator: "size-4",
      },
      md: {
        label: "text-sm",
        control: "py-1.5 ps-3 pe-1.5",
        input: "text-xs",
        trigger: "size-7 p-1.5",
        indicator: "size-4",
      },
      lg: {
        label: "text-sm",
        control: "py-2 ps-3.5 pe-2",
        input: "text-sm",
        trigger: "size-8 p-1.5",
        indicator: "size-5",
      },
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: {
        trigger: `text-${color} outline-${color}/25 hover:bg-${color}/10 active:bg-${color}/10`,
      },
    })),
    {
      color: "neutral",
      class: {
        trigger:
          "text-muted outline-inverted/25 hover:bg-elevated hover:text-default active:bg-elevated",
      },
    },
  ],
  defaultVariants: {
    color: "neutral",
    size: "md",
  },
});

export type ClipboardVariants = VariantProps<typeof clipboard>;
export type ClipboardSlots = keyof ReturnType<typeof clipboard>;

export type ClipboardUI = TVSlot<ClipboardSlots>;

export type ClipboardTheme = ThemeOverride<ClipboardSlots, ClipboardVariants>;

/**
 * Everything a Clipboard accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * `value` is required and uncontrolled from the component's side. Ark takes a
 * controlled value, but nothing here writes one back: the field is read-only, so the
 * only thing that can change the value is the caller passing a new one.
 */
export interface ClipboardProps<F> {
  /** Per-slot class overrides. */
  ui?: ClipboardUI;
  color?: ClipboardVariants["color"];
  size?: ClipboardVariants["size"];
  /** The text to copy. */
  value: string;
  /** Caption above the field. Clicking it focuses the field. */
  label?: string;
  /** How long the copied icon stays, in milliseconds. @defaultValue `3000` */
  timeout?: number;
  /** Replaces the copy icon. */
  copyIcon?: F;
  /** Replaces the icon shown just after a copy. */
  copiedIcon?: F;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type ClipboardVariantsAreExposed = MustBeNever<
  Exclude<keyof ClipboardVariants, keyof ClipboardProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    clipboard: ComponentContract<ClipboardSlots, ClipboardVariants>;
  }
}
