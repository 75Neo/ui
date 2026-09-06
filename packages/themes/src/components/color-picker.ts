import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * ColorPicker styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 *
 * @remarks
 * There is no color axis: a color picker edits every color, so none of its faces
 * takes one. The fixed neutral-looking classes the old recipe carried are structural
 * strings here, beside the parts that wear them.
 */

export type ColorPickerSize = "sm" | "md" | "lg";

/**
 * The formats a color can be edited and reported in.
 *
 * @remarks
 * Written out rather than imported from Ark, because `@75neo/themes` depends on no
 * framework and so on neither adapter's copy of it. The union is Zag's `ColorFormat`,
 * and a mismatch would fail the adapters' typecheck rather than go unnoticed.
 */
export type ColorPickerFormat = "rgba" | "hsla" | "hsba";

export const colorPickerDefaults = { size: "md" } as const;

export const colorPickerSchema = {
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const colorPickerParts = [
  { export: "ColorPicker", file: "color-picker", contract: "ColorPickerRootProps" },
  { export: "ColorPickerLabel", file: "label", contract: null },
  { export: "ColorPickerArea", file: "area", contract: null },
  { export: "ColorPickerAreaBackground", file: "area-background", contract: null },
  { export: "ColorPickerAreaThumb", file: "area-thumb", contract: null },
  { export: "ColorPickerSliders", file: "sliders", contract: null },
  { export: "ColorPickerPreview", file: "preview", contract: null },
  { export: "ColorPickerTransparencyGrid", file: "transparency-grid", contract: null },
  { export: "ColorPickerValueSwatch", file: "value-swatch", contract: null },
  { export: "ColorPickerChannelSlider", file: "channel-slider", contract: null },
  { export: "ColorPickerChannelSliderTrack", file: "channel-slider-track", contract: null },
  { export: "ColorPickerChannelSliderThumb", file: "channel-slider-thumb", contract: null },
  { export: "ColorPickerControl", file: "control", contract: null },
  { export: "ColorPickerInput", file: "input", contract: null },
  { export: "ColorPickerEyeDropperTrigger", file: "eye-dropper-trigger", contract: null },
  { export: "ColorPickerSwatches", file: "swatches", contract: null },
  { export: "ColorPickerSwatchTrigger", file: "swatch-trigger", contract: null },
] as const satisfies readonly ComponentPart[];

export const colorPickerSizeData = {
  label: {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
  },
  area: {
    sm: "h-28",
    md: "h-36",
    lg: "h-44",
  },
  sliders: {
    sm: "gap-2.5",
    md: "gap-3",
    lg: "gap-3.5",
  },
  preview: {
    sm: "size-7",
    md: "size-9",
    lg: "size-10",
  },
  channels: {
    sm: "gap-2",
    md: "gap-2.5",
    lg: "gap-3",
  },
  channelSlider: {
    sm: "h-2",
    md: "h-2.5",
    lg: "h-3",
  },
  channelSliderThumb: {
    sm: "size-3.5",
    md: "size-4",
    lg: "size-4.5",
  },
  input: {
    sm: "h-7 px-2 text-xs",
    md: "h-9 px-2.5 text-sm",
    lg: "h-10 px-3 text-sm",
  },
  eyeDropper: {
    sm: "size-7 [&>svg]:size-3.5",
    md: "size-9 [&>svg]:size-4",
    lg: "size-10 [&>svg]:size-5",
  },
  swatches: {
    sm: "gap-1.5",
    md: "gap-2",
    lg: "gap-2",
  },
  swatchTrigger: {
    sm: "size-5",
    md: "size-6",
    lg: "size-7",
  },
} as const satisfies Record<string, Record<ColorPickerSize, string>>;

/**
 * Everything a ColorPicker accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 */
export interface ColorPickerRootProps<F> {
  size?: ColorPickerSize;
  /** Caption above the picker. */
  label?: string;
  /** Show the hex field beside the sliders. @defaultValue `true` */
  showInput?: boolean;
  /** Show the alpha channel beside the hue. */
  alpha?: boolean;
  /** Show the eyedropper beside the field. */
  eyeDropper?: boolean;
  /** Preset swatches under the sliders. */
  swatches?: string[];
  /** Replaces the pipette. */
  eyeDropperIcon?: F;
  format?: ColorPickerFormat;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Submits the color under this name inside a form. */
  name?: string;
}
