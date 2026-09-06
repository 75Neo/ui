export { default as ColorPicker } from "./color-picker.vue";
export { default as ColorPickerLabel } from "./label.vue";
export { default as ColorPickerArea } from "./area.vue";
export { default as ColorPickerAreaBackground } from "./area-background.vue";
export { default as ColorPickerAreaThumb } from "./area-thumb.vue";
export { default as ColorPickerSliders } from "./sliders.vue";
export { default as ColorPickerPreview } from "./preview.vue";
export { default as ColorPickerTransparencyGrid } from "./transparency-grid.vue";
export { default as ColorPickerValueSwatch } from "./value-swatch.vue";
export { default as ColorPickerChannelSlider } from "./channel-slider.vue";
export { default as ColorPickerChannelSliderTrack } from "./channel-slider-track.vue";
export { default as ColorPickerChannelSliderThumb } from "./channel-slider-thumb.vue";
export { default as ColorPickerControl } from "./control.vue";
export { default as ColorPickerInput } from "./input.vue";
export { default as ColorPickerEyeDropperTrigger } from "./eye-dropper-trigger.vue";
export { default as ColorPickerSwatches } from "./swatches.vue";
export { default as ColorPickerSwatchTrigger } from "./swatch-trigger.vue";
export { colorPickerVariantsKey, useColorPickerVariants } from "./variants";

/*
 * A ColorPicker edits a `Color` rather than a string, so a caller needs the parser to
 * hand it a starting value. Re-exported here so that reaching for one does not mean
 * adding Ark UI to an application's own dependencies.
 */
export { type Color, parseColor } from "@ark-ui/vue/color-picker";
