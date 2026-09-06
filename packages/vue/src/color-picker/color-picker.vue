<script setup lang="ts">
import { type Component, computed, provide, reactive } from "vue";
import { ColorPicker as Ark, type Color } from "@ark-ui/vue/color-picker";
import { Pipette as PipetteIcon } from "@lucide/vue";
import {
  cn,
  colorPickerDefaults,
  colorPickerSizeData,
  type ColorPickerRootProps,
} from "@75neo/themes";
import { colorPickerVariantsKey } from "./variants";
import ColorPickerArea from "./area.vue";
import ColorPickerAreaBackground from "./area-background.vue";
import ColorPickerAreaThumb from "./area-thumb.vue";
import ColorPickerChannelSlider from "./channel-slider.vue";
import ColorPickerChannelSliderThumb from "./channel-slider-thumb.vue";
import ColorPickerChannelSliderTrack from "./channel-slider-track.vue";
import ColorPickerControl from "./control.vue";
import ColorPickerEyeDropperTrigger from "./eye-dropper-trigger.vue";
import ColorPickerInput from "./input.vue";
import ColorPickerLabel from "./label.vue";
import ColorPickerPreview from "./preview.vue";
import ColorPickerSliders from "./sliders.vue";
import ColorPickerSwatches from "./swatches.vue";
import ColorPickerSwatchTrigger from "./swatch-trigger.vue";
import ColorPickerTransparencyGrid from "./transparency-grid.vue";
import ColorPickerValueSwatch from "./value-swatch.vue";

const props = defineProps<
  ColorPickerRootProps<Component> & {
    class?: unknown;
  }
>();

const emit = defineEmits<{
  /** Fired when the color changes. */
  valueChange: [details: { value: Color; valueAsString: string }];
  /** Fired when the color settles after a drag. */
  valueChangeEnd: [details: { value: Color; valueAsString: string }];
}>();

defineSlots<{
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the picker, leaving `defaultValue` idle.
 */
const value = defineModel<Color | undefined>({ default: undefined });

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get size() {
    return props.size ?? colorPickerDefaults.size;
  },
});
provide(colorPickerVariantsKey, resolved);

const rootClass = computed(() =>
  cn(
    "flex w-full flex-col data-disabled:pointer-events-none data-disabled:opacity-75",
    props.class as string | undefined,
  ),
);
const channelsClass = computed(() =>
  cn("flex min-w-0 flex-1 flex-col", colorPickerSizeData.channels[resolved.size]),
);
</script>

<template>
  <Ark.Root
    data-slot="color-picker"
    :class="rootClass"
    :data-size="resolved.size"
    v-model="value"
    @value-change="emit('valueChange', $event)"
    @value-change-end="emit('valueChangeEnd', $event)"
    :format="props.format"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :required="props.required"
    :name="props.name"
  >
    <ColorPickerLabel v-if="props.label != null">{{ props.label }}</ColorPickerLabel>
    <ColorPickerArea>
      <ColorPickerAreaBackground />
      <ColorPickerAreaThumb />
    </ColorPickerArea>
    <ColorPickerSliders>
      <ColorPickerPreview>
        <ColorPickerTransparencyGrid v-if="props.alpha ?? false" />
        <ColorPickerValueSwatch />
      </ColorPickerPreview>
      <div data-slot="color-picker-channels" :class="channelsClass">
        <ColorPickerChannelSlider channel="hue">
          <ColorPickerChannelSliderTrack />
          <ColorPickerChannelSliderThumb />
        </ColorPickerChannelSlider>
        <ColorPickerChannelSlider v-if="props.alpha ?? false" channel="alpha">
          <ColorPickerTransparencyGrid />
          <ColorPickerChannelSliderTrack />
          <ColorPickerChannelSliderThumb />
        </ColorPickerChannelSlider>
      </div>
    </ColorPickerSliders>
    <ColorPickerControl v-if="(props.showInput ?? true) || (props.eyeDropper ?? false)">
      <ColorPickerInput v-if="props.showInput ?? true" />
      <ColorPickerEyeDropperTrigger v-if="props.eyeDropper ?? false">
        <component :is="props.eyeDropperIcon ?? PipetteIcon" />
      </ColorPickerEyeDropperTrigger>
    </ColorPickerControl>
    <ColorPickerSwatches v-if="props.swatches != null && props.swatches.length > 0">
      <ColorPickerSwatchTrigger v-for="preset in props.swatches" :key="preset" :value="preset" />
    </ColorPickerSwatches>
  </Ark.Root>
</template>
