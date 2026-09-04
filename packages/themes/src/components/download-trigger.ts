import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the DownloadTrigger: a button that saves data to a file.
 *
 * @remarks
 * This is the Button's outline with one job: where the Button is every action, this is
 * the one that hands the caller a file. The variant and color rows repeat the Button's
 * solid, outline, soft and ghost rather than composing its recipe, because a recipe
 * that reached into another one would make either component's `ui` prop able to
 * reshape the other, and the cascade has no way to express that.
 *
 * Only four of the Button's six variants come along. A download is never a link and
 * never a subtle ring — it is an action, so it dresses like one.
 */
export const downloadTrigger = tv({
  slots: {
    base: "inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75",
    label: "truncate",
    leadingIcon: "shrink-0 [&>svg]:size-full",
    trailingIcon: "shrink-0 [&>svg]:size-full",
  },
  variants: {
    variant: {
      solid: "",
      outline: "",
      soft: "",
      ghost: "",
    },
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
        base: "gap-1.5 px-2.5 py-1.5 text-xs",
        leadingIcon: "size-4",
        trailingIcon: "size-4",
      },
      md: {
        base: "gap-1.5 px-2.5 py-1.5 text-sm",
        leadingIcon: "size-5",
        trailingIcon: "size-5",
      },
      lg: {
        base: "gap-2 px-3 py-2 text-sm",
        leadingIcon: "size-5",
        trailingIcon: "size-5",
      },
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      variant: "solid" as const,
      class: `bg-${color} text-inverted outline-${color}/25 hover:bg-${color}/75 active:bg-${color}/75 disabled:bg-${color} aria-disabled:bg-${color}`,
    })),
    ...eachColor((color) => ({
      color,
      variant: "outline" as const,
      class: `text-${color} ring ring-${color}/50 outline-${color}/25 ring-inset hover:bg-${color}/10 focus-visible:ring-${color} active:bg-${color}/10`,
    })),
    ...eachColor((color) => ({
      color,
      variant: "soft" as const,
      class: `bg-${color}/10 text-${color} outline-${color}/25 hover:bg-${color}/15 active:bg-${color}/15 disabled:bg-${color}/10 aria-disabled:bg-${color}/10`,
    })),
    ...eachColor((color) => ({
      color,
      variant: "ghost" as const,
      class: `text-${color} outline-${color}/25 hover:bg-${color}/10 active:bg-${color}/10`,
    })),
    {
      color: "neutral",
      variant: "solid",
      class:
        "bg-inverted text-inverted outline-inverted/25 hover:bg-inverted/90 active:bg-inverted/90 disabled:bg-inverted aria-disabled:bg-inverted",
    },
    {
      color: "neutral",
      variant: "outline",
      class:
        "bg-default text-default ring ring-accented outline-inverted/25 ring-inset hover:bg-elevated focus-visible:ring-inverted active:bg-elevated",
    },
    {
      color: "neutral",
      variant: "soft",
      class:
        "bg-elevated text-default outline-inverted/25 hover:bg-accented/75 active:bg-accented/75",
    },
    {
      color: "neutral",
      variant: "ghost",
      class: "text-default outline-inverted/25 hover:bg-elevated active:bg-elevated",
    },
  ],
  defaultVariants: {
    variant: "solid",
    color: "primary",
    size: "md",
  },
});

export type DownloadTriggerVariants = VariantProps<typeof downloadTrigger>;
export type DownloadTriggerSlots = keyof ReturnType<typeof downloadTrigger>;

export type DownloadTriggerUI = TVSlot<DownloadTriggerSlots>;

export type DownloadTriggerTheme = ThemeOverride<DownloadTriggerSlots, DownloadTriggerVariants>;

/**
 * The only parts of a blob this package is allowed to see.
 *
 * @remarks
 * `@75neo/themes` typechecks without the DOM library, which is what keeps it honest
 * about being Tailwind classes and rules rather than anything that touches a browser.
 * So this names the two fields a download reads rather than a `Blob`, which a real
 * `Blob` — and a `File`, which extends it — satisfies structurally. Each adapter casts
 * it back at the Ark boundary, where the DOM types exist.
 */
export interface DownloadBlobLike {
  readonly size: number;
  readonly type: string;
}

/** The bytes to save: text, or a blob carrying them. */
export type DownloadData = string | DownloadBlobLike;

/** The bytes to save, or a function returning them, read when the button is pressed. */
export type DownloadDataInput = DownloadData | (() => DownloadData | Promise<DownloadData>);

/**
 * Everything a DownloadTrigger accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The button's text is not here. It is whatever the framework calls children —
 * `children` in React, the default slot in Vue — because a download button usually
 * names its own file, and a string prop would only get in the way.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface DownloadTriggerProps<F> {
  /** Per-slot class overrides. */
  ui?: DownloadTriggerUI;
  variant?: DownloadTriggerVariants["variant"];
  color?: DownloadTriggerVariants["color"];
  size?: DownloadTriggerVariants["size"];
  /** The data to download. A function is read when the button is pressed. */
  data: DownloadDataInput;
  /** The name of the file to save. */
  fileName: string;
  /** The MIME type of the data to download. */
  mimeType: string;
  /** Icon shown before the label. */
  leadingIcon?: F;
  /** Icon shown after the label. */
  trailingIcon?: F;
  disabled?: boolean;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type DownloadTriggerVariantsAreExposed = MustBeNever<
  Exclude<keyof DownloadTriggerVariants, keyof DownloadTriggerProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    downloadTrigger: ComponentContract<DownloadTriggerSlots, DownloadTriggerVariants>;
  }
}
