import { byColor, componentColors, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Steps styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 *
 * @remarks
 * Ark marks every item with `data-complete`, `data-current` and `data-incomplete`,
 * and the safelist already carries the `data-complete:bg-*` and
 * `data-current:ring-*` combinations the indicator and the separator interpolate.
 * Orientation stays structural: parts read Ark's `data-orientation` straight off
 * the DOM, so it is not a variant.
 */

export type StepsSize = "sm" | "md" | "lg";
export type StepsColor = ComponentColor;

/** One row of the stepper. The adapter turns the array back into Ark's markup. */
export interface StepsItemData<F> {
  /** The row's heading. */
  title: string;
  /** A quieter line under the heading. */
  description?: string;
  /** Replaces the step number inside the indicator. */
  icon?: F;
}

export const stepsDefaults = { size: "md", color: "primary" } as const;

export const stepsSchema = {
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
  color: { values: componentColors, defaultValue: "primary" },
} as const satisfies ComponentSchema;

export const stepsParts = [
  { export: "Steps", file: "steps", contract: "StepsRootProps" },
  { export: "StepsList", file: "list", contract: null },
  { export: "StepsItem", file: "item", contract: "StepsItemProps" },
  { export: "StepsTrigger", file: "trigger", contract: null },
  { export: "StepsIndicator", file: "indicator", contract: null },
  { export: "StepsSeparator", file: "separator", contract: null },
  { export: "StepsContent", file: "content", contract: "StepsContentProps" },
  { export: "StepsCompletedContent", file: "completed-content", contract: null },
  { export: "StepsProgress", file: "progress", contract: null },
  { export: "StepsPrevTrigger", file: "prev-trigger", contract: null },
  { export: "StepsNextTrigger", file: "next-trigger", contract: null },
] as const satisfies readonly ComponentPart[];

export const stepsSizeData = {
  indicator: {
    sm: "size-7 text-xs",
    md: "size-9 text-sm",
    lg: "size-11 text-base",
  },
  title: {
    sm: "text-sm",
    md: "text-sm",
    lg: "text-base",
  },
  description: {
    sm: "text-xs",
    md: "text-xs",
    lg: "text-sm",
  },
  content: {
    sm: "p-3 text-sm/6",
    md: "p-4 text-sm/6",
    lg: "p-5 text-base/7",
  },
  triggerButton: {
    sm: "h-7 px-2.5 text-xs",
    md: "h-8 px-3 text-sm",
    lg: "h-9 px-3.5 text-sm",
  },
} as const satisfies Record<string, Record<StepsSize, string>>;

export const stepsColorData = {
  indicator: {
    ...byColor(
      (color) =>
        `data-current:bg-${color}/10 data-current:text-${color} data-current:ring-${color} data-complete:bg-${color} data-complete:text-inverted`,
    ),
    neutral:
      "data-current:bg-elevated data-current:text-default data-current:ring-accented data-complete:bg-inverted data-complete:text-inverted data-complete:ring-inverted",
  },
  separator: {
    ...byColor((color) => `data-complete:bg-${color}`),
    neutral: "data-complete:bg-inverted",
  },
} as const satisfies Record<string, Record<StepsColor, string>>;

/** Everything a Steps row accepts in both frameworks. */
export interface StepsItemProps {
  /** Which row this is, counting from zero. */
  index: number;
}

/** Everything a Steps panel accepts in both frameworks. */
export interface StepsContentProps {
  /** Which panel this is, counting from zero. */
  index: number;
}

/**
 * Everything a Steps accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The step state is not here: React spells it `step` with `onStepChange`, Vue
 * spells it `v-model:step`, so each adapter takes it from Ark's root instead.
 */
export interface StepsRootProps<F> {
  size?: StepsSize;
  color?: StepsColor;
  /** The rows, in order. The count follows from the array. */
  items: StepsItemData<F>[];
  /** What shows once the last step completes. */
  completedContent?: F;
  /** Walk the steps in order, no skipping ahead. */
  linear?: boolean;
  /** @defaultValue `"horizontal"` */
  orientation?: "horizontal" | "vertical";
  /** Label the way back. @defaultValue `"Back"` */
  prevLabel?: string;
  /** Label the way forward. @defaultValue `"Next"` */
  nextLabel?: string;
}
