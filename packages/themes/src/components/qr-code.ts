import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * Recipe for the QrCode: a code to scan, on a card carrying its quiet zone.
 *
 * @remarks
 * There is no `color` variant. A code is a surface, and the library spends a hue on
 * things that carry meaning; the modules are drawn in the inverted tone and the card
 * behind them is the page, so the code scans the same in either theme. This is the
 * Dialog's rule, and every surface after it reads the same way.
 *
 * The card's padding is the quiet zone the scanner needs, so it grows with the size
 * rather than staying fixed: a bigger code wants a wider margin of page around it.
 *
 * Only the value, its encoding size and its changes are wrapped. An overlay logo and
 * a download button need positioning opinions of their own, so callers reaching for
 * those compose Ark's own parts around this one.
 */
export const qrCode = tv({
  slots: {
    base: "inline-flex w-fit rounded-xl bg-default ring ring-default ring-inset",
    frame: "block fill-inverted",
  },
  variants: {
    size: {
      sm: {
        base: "p-2",
        frame: "size-24",
      },
      md: {
        base: "p-2.5",
        frame: "size-32",
      },
      lg: {
        base: "p-3",
        frame: "size-40",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type QrCodeVariants = VariantProps<typeof qrCode>;
export type QrCodeSlots = keyof ReturnType<typeof qrCode>;

export type QrCodeUI = TVSlot<QrCodeSlots>;

export type QrCodeTheme = ThemeOverride<QrCodeSlots, QrCodeVariants>;

/**
 * Everything a QrCode accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @remarks
 * The value is not here: React spells it `value` with `onValueChange`, Vue spells it
 * `v-model`, so each adapter takes it from Ark's root instead. What stays is the
 * uncontrolled starting value both frameworks spell the same.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface QrCodeProps {
  /** Per-slot class overrides. */
  ui?: QrCodeUI;
  size?: QrCodeVariants["size"];
  /**
   * The value encoded when rendered. Use when the code never changes afterwards.
   */
  defaultValue?: string;
  /** The encoded image's own resolution, in pixels. A sharper source scans better. */
  pixelSize?: number;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type QrCodeVariantsAreExposed = MustBeNever<
  Exclude<keyof QrCodeVariants, keyof QrCodeProps>
>;

declare global {
  interface Neo75ComponentThemes {
    qrCode: ComponentContract<QrCodeSlots, QrCodeVariants>;
  }
}
