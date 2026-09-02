<script setup lang="ts">
import type { Component } from "vue";
import { ColorPicker as Ark, type Color } from "@ark-ui/vue/color-picker";
import { Pipette } from "@lucide/vue";
import { type ColorPickerProps, colorPicker } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The color lives outside the shared contract, because React and Vue spell a controlled
 * value too differently to share one type. Here it is `v-model`, with `defaultValue` as
 * the uncontrolled counterpart Ark's root already takes. Both are `Color` objects
 * rather than strings; `parseColor`, re-exported from this package, builds one.
 */
const props = withDefaults(
  defineProps<
    ColorPickerProps<Component> & {
      defaultValue?: Color;
      class?: unknown;
      ids?: { root?: string; control?: string; area?: string; label?: string };
    }
  >(),
  /*
   * `showInput` is the one prop here whose default is `true`, and it is exactly the
   * prop Vue's Boolean casting would get wrong: an absent Boolean-typed prop arrives as
   * `false`, so the hex field would never render unless a caller asked for it by name.
   * Every other boolean below defaults to off, which is what the cast produces anyway.
   */
  { showInput: true },
);

const emit = defineEmits<{
  /** Fired on every change, including each frame of a drag. */
  valueChange: [details: { value: Color; valueAsString: string }];
  /** Fired once a drag ends. */
  valueChangeEnd: [details: { value: Color; valueAsString: string }];
}>();

defineSlots<{
  /** Replaces the label text. Falls back to `label`. */
  label?: () => unknown;
  /** Replaces the eyedropper icon. Falls back to `eyeDropperIcon`. */
  eyeDropperIcon?: () => unknown;
}>();

/*
 * `default: undefined` keeps an absent `v-model` absent. Without it the declared prop
 * would reach Ark as a value and pin the picker to a controlled color, which would
 * leave `defaultValue` with nothing to do.
 */
const value = defineModel<Color | undefined>({ default: undefined });

const theme = useResolvedTheme(
  colorPicker,
  "colorPicker",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model="value"
    inline
    data-slot="base"
    :class="theme.class.base"
    :default-value="props.defaultValue"
    :format="props.format"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :required="props.required"
    :name="props.name"
    :ids="props.ids"
    @value-change="emit('valueChange', $event)"
    @value-change-end="emit('valueChangeEnd', $event)"
  >
    <Ark.Label
      v-if="props.label != null || $slots.label"
      data-slot="label"
      :class="theme.class.label"
    >
      <slot name="label">{{ props.label }}</slot>
    </Ark.Label>

    <Ark.Area data-slot="area" :class="theme.class.area">
      <Ark.AreaBackground data-slot="areaBackground" :class="theme.class.areaBackground" />
      <Ark.AreaThumb data-slot="areaThumb" :class="theme.class.areaThumb" />
    </Ark.Area>

    <div data-slot="sliders" :class="theme.class.sliders">
      <!--
        Ark paints the swatch itself, so the checkerboard has to sit under it in source
        order rather than behind it with a z-index.
      -->
      <div data-slot="preview" :class="theme.class.preview">
        <Ark.TransparencyGrid
          v-if="props.alpha"
          data-slot="transparencyGrid"
          :class="theme.class.transparencyGrid"
        />
        <Ark.ValueSwatch data-slot="valueSwatch" :class="theme.class.valueSwatch" />
      </div>

      <div data-slot="channels" :class="theme.class.channels">
        <Ark.ChannelSlider
          channel="hue"
          data-slot="channelSlider"
          :class="theme.class.channelSlider"
        >
          <Ark.ChannelSliderTrack
            data-slot="channelSliderTrack"
            :class="theme.class.channelSliderTrack"
          />
          <Ark.ChannelSliderThumb
            data-slot="channelSliderThumb"
            :class="theme.class.channelSliderThumb"
          />
        </Ark.ChannelSlider>

        <Ark.ChannelSlider
          v-if="props.alpha"
          channel="alpha"
          data-slot="channelSlider"
          :class="theme.class.channelSlider"
        >
          <Ark.TransparencyGrid
            data-slot="transparencyGrid"
            :class="theme.class.transparencyGrid"
          />
          <Ark.ChannelSliderTrack
            data-slot="channelSliderTrack"
            :class="theme.class.channelSliderTrack"
          />
          <Ark.ChannelSliderThumb
            data-slot="channelSliderThumb"
            :class="theme.class.channelSliderThumb"
          />
        </Ark.ChannelSlider>
      </div>
    </div>

    <div
      v-if="props.showInput || props.eyeDropper"
      data-slot="control"
      :class="theme.class.control"
    >
      <Ark.ChannelInput
        v-if="props.showInput"
        channel="hex"
        data-slot="input"
        :class="theme.class.input"
      />
      <Ark.EyeDropperTrigger
        v-if="props.eyeDropper"
        data-slot="eyeDropper"
        :class="theme.class.eyeDropper"
      >
        <slot name="eyeDropperIcon">
          <component :is="props.eyeDropperIcon ?? Pipette" />
        </slot>
      </Ark.EyeDropperTrigger>
    </div>

    <Ark.SwatchGroup
      v-if="props.swatches && props.swatches.length > 0"
      data-slot="swatches"
      :class="theme.class.swatches"
    >
      <Ark.SwatchTrigger
        v-for="preset in props.swatches"
        :key="preset"
        :value="preset"
        data-slot="swatchTrigger"
        :class="theme.class.swatchTrigger"
      >
        <Ark.Swatch :value="preset" data-slot="swatch" :class="theme.class.swatch" />
      </Ark.SwatchTrigger>
    </Ark.SwatchGroup>

    <Ark.HiddenInput />
  </Ark.Root>
</template>
