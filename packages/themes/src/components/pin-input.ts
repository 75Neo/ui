import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the PinInput: a row of one-character boxes holding a short code.
 *
 * @remarks
 * Each box is its own `input`, which is what makes the caret land in one of them and
 * the arrow keys move between them. So the ring is drawn on the box with
 * `focus-visible` rather than on a control with `focus-within` — unlike every other
 * field here, there is no single box that has to read as one control, and drawing a
 * ring around the whole row would say the opposite of what is true.
 *
 * Ark writes three states onto every box, and the recipe styles only the one it needs.
 * `data-invalid` colours the ring red. `data-filled` says the box has a character and
 * `data-complete` says every box does; neither is styled here, and both are left for a
 * caller who wants a code to light up as it lands. They are on the boxes rather than
 * only on the root for exactly that reason.
 */
export const pinInput = tv({
  slots: {
    base: "flex flex-col gap-1.5",
    label: "font-medium text-highlighted select-none",
    control: "flex items-center",
    input:
      "bg-default text-center font-medium text-highlighted tabular-nums ring ring-accented outline-none ring-inset placeholder:text-dimmed disabled:cursor-not-allowed disabled:opacity-75 data-invalid:ring-error",
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
        control: "gap-1.5",
        input: "size-8 rounded-md text-sm",
      },
      md: {
        label: "text-sm",
        control: "gap-2",
        input: "size-10 rounded-md text-base",
      },
      lg: {
        label: "text-sm",
        control: "gap-2.5",
        input: "size-12 rounded-md text-lg",
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

export type PinInputVariants = VariantProps<typeof pinInput>;
export type PinInputSlots = keyof ReturnType<typeof pinInput>;

export type PinInputUI = TVSlot<PinInputSlots>;

export type PinInputTheme = ThemeOverride<PinInputSlots, PinInputVariants>;

/** What a box will accept. */
export type PinInputType = "numeric" | "alphanumeric" | "alphabetic";

/** How many boxes a PinInput draws when it is not told. */
export const defaultPinInputLength = 6;

/**
 * Everything a PinInput accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @remarks
 * The value is not here: React spells it `value` with `onValueChange`, Vue spells it
 * `v-model`, so each adapter takes it from Ark's root instead. It is a `string[]`, one
 * entry per box and `""` for an empty one, rather than the joined code, because a box is
 * addressed by its index. The code itself stays contiguous: removing a character in the
 * middle pulls the ones after it back, since a code with a gap in it is not a code.
 *
 * `length` is this library's name for what Ark calls `count`, because it is Nuxt UI's,
 * and because the adapters have to draw that many boxes themselves rather than hand the
 * number to Ark and walk away.
 *
 * There is no icon parameter on this type. Nothing in a row of one-character boxes is
 * an icon, and the Container and the Footer are not generic either for the same reason.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface PinInputProps {
  /** Per-slot class overrides. */
  ui?: PinInputUI;
  color?: PinInputVariants["color"];
  size?: PinInputVariants["size"];
  /** How many boxes to draw. @defaultValue `6` */
  length?: number;
  /** Caption above the row. */
  label?: string;
  /** Shown in an empty box. @defaultValue `"○"` */
  placeholder?: string;
  /** What a box will accept. @defaultValue `"numeric"` */
  type?: PinInputType;
  /** Tell the browser this is a one-time code, so it can offer one. */
  otp?: boolean;
  /** Hide each character, the way a password field does. */
  mask?: boolean;
  /** Put the caret in the first box on mount. */
  autoFocus?: boolean;
  /** Leave the row once the last box is filled. */
  blurOnComplete?: boolean;
  /** Select a box's character when the caret lands in it. */
  selectOnFocus?: boolean;
  /** What a character is checked against, on top of `type`. */
  pattern?: string;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Submits the joined code under this name inside a form. */
  name?: string;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type PinInputVariantsAreExposed = MustBeNever<
  Exclude<keyof PinInputVariants, keyof PinInputProps>
>;

declare global {
  interface Neo75ComponentThemes {
    pinInput: ComponentContract<PinInputSlots, PinInputVariants>;
  }
}
