import { byColor, componentColors, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * AngleSlider styling data: plain class strings both adapters feed into their own
 * `cva` calls, one per anatomy part. Nothing here knows a framework.
 *
 * @remarks
 * The geometry is written in percentages and viewBox units, so a size only changes
 * the width of the control and everything else follows. Two consequences worth
 * knowing before editing: the range circle is drawn with a path length of 360 so its
 * dash array can read Ark's raw angle with no arithmetic, and the thumb and markers
 * are full-size overlays whose visible dot is a `::before`, so rotating the overlay
 * orbits the dot. The overlays stay click-through and only the dot takes pointer
 * events, which is what keeps dragging the thumb and clicking the ring both working.
 *
 * The focus ring is drawn on that dot rather than on the overlay, since the overlay
 * spans the whole control and would outline a square around the dial.
 */

export type AngleSliderSize = "sm" | "md" | "lg";
export type AngleSliderColor = ComponentColor;

/** What the root publishes and every part reads. Lives in each adapter. */
export interface AngleSliderVariants {
  size: AngleSliderSize;
  color: AngleSliderColor;
}

/** Ring radius, chosen so a 12-unit stroke sits flush inside the 100-unit viewBox. */
export const ANGLE_SLIDER_RADIUS = 44;

/** Path length both circles are normalized to, which makes one user unit one degree. */
export const ANGLE_SLIDER_PATH_LENGTH = 360;

export const angleSliderDefaults = { size: "md", color: "primary" } as const;

export const angleSliderSchema = {
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
  color: { values: componentColors, defaultValue: "primary" },
} as const satisfies ComponentSchema;

export const angleSliderParts = [
  { export: "AngleSlider", file: "angle-slider", contract: "AngleSliderRootProps" },
  { export: "AngleSliderControl", file: "control", contract: null },
  { export: "AngleSliderMarkerGroup", file: "marker-group", contract: null },
  { export: "AngleSliderMarker", file: "marker", contract: "AngleSliderMarkerProps" },
  { export: "AngleSliderThumb", file: "thumb", contract: null },
  { export: "AngleSliderValueText", file: "value-text", contract: null },
  { export: "AngleSliderLabel", file: "label", contract: null },
] as const satisfies readonly ComponentPart[];

export const angleSliderSizeData = {
  control: {
    sm: "w-24",
    md: "w-32",
    lg: "w-40",
  },
  valueText: {
    sm: "text-base/none",
    md: "text-2xl/none",
    lg: "text-3xl/none",
  },
  label: {
    sm: "mt-1 text-[0.625rem]/none",
    md: "mt-1.5 text-xs/none",
    lg: "mt-2 text-sm/none",
  },
} as const satisfies Record<string, Record<AngleSliderSize, string>>;

export const angleSliderColorData = {
  range: {
    ...byColor((color) => `stroke-${color}`),
    neutral: "stroke-inverted",
  },
  thumb: {
    ...byColor((color) => `before:bg-${color} before:outline-${color}/25`),
    neutral: "before:bg-inverted before:outline-inverted/25",
  },
  valueText: {
    ...byColor((color) => `text-${color}`),
    neutral: "text-highlighted",
  },
} as const satisfies Record<string, Record<AngleSliderColor, string>>;

/** Everything an AngleSlider marker accepts in both frameworks. */
export interface AngleSliderMarkerProps {
  /** Where the tick sits, in degrees. */
  value: number;
}

/**
 * Everything the AngleSlider root accepts in both frameworks.
 *
 * @remarks
 * The angle itself is not here: React spells it `value` with `onValueChange`, Vue
 * spells it `v-model`, so each adapter takes it from Ark's root instead.
 */
export interface AngleSliderRootProps {
  size?: AngleSliderSize;
  color?: AngleSliderColor;
  /** Caption under the readout, inside the ring. Clicking it focuses the thumb. */
  label?: string;
  /** Show the current angle in the middle of the ring. */
  showValue?: boolean;
  /** Tick values in degrees, drawn on the ring. */
  markers?: number[];
  /** Degrees per arrow-key press. */
  step?: number;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  /** Submits the angle under this name inside a form. */
  name?: string;
}
