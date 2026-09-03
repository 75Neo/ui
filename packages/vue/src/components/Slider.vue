<script setup lang="ts">
import { Slider as Ark } from "@ark-ui/vue/slider";
import { type SliderProps, slider } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The value lives outside the shared contract, because React and Vue spell a controlled
 * value too differently to share one type. Here it is `v-model`, with `defaultValue` as
 * the uncontrolled counterpart Ark's root already takes. It is an array in both, with
 * one entry per thumb.
 */
const props = defineProps<
  SliderProps & {
    class?: unknown;
    defaultValue?: number[];
    ids?: {
      root?: string;
      thumb?: (index: number) => string;
      hiddenInput?: (index: number) => string;
      control?: string;
      track?: string;
      range?: string;
      label?: string;
      output?: string;
      marker?: (index: number) => string;
    };
  }
>();

const emit = defineEmits<{
  /** Fired on every step as a thumb moves. */
  valueChange: [details: { value: number[] }];
  /** Fired once, when a thumb is let go. */
  valueChangeEnd: [details: { value: number[] }];
}>();

defineSlots<{
  /** Overrides the `label` prop. */
  label?: () => unknown;
}>();

/*
 * An array model needs no `default: undefined`: the cast that catches Boolean props
 * leaves everything else alone.
 */
const value = defineModel<number[] | undefined>({ default: undefined });

const theme = useResolvedTheme(
  slider,
  "slider",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model="value"
    data-slot="base"
    :class="theme.class.base"
    :default-value="props.defaultValue"
    :min="props.min"
    :max="props.max"
    :step="props.step"
    :orientation="props.orientation"
    :origin="props.origin"
    :min-steps-between-thumbs="props.minStepsBetweenThumbs"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :name="props.name"
    :form="props.form"
    :ids="props.ids"
    @value-change="emit('valueChange', $event)"
    @value-change-end="emit('valueChangeEnd', $event)"
  >
    <div
      v-if="props.label != null || $slots.label || props.showValue"
      data-slot="header"
      :class="theme.class.header"
    >
      <Ark.Label
        v-if="props.label != null || $slots.label"
        data-slot="label"
        :class="theme.class.label"
      >
        <slot name="label">{{ props.label }}</slot>
      </Ark.Label>
      <Ark.ValueText v-if="props.showValue" data-slot="valueText" :class="theme.class.valueText" />
    </div>

    <Ark.Control data-slot="control" :class="theme.class.control">
      <Ark.Track data-slot="track" :class="theme.class.track">
        <Ark.Range data-slot="range" :class="theme.class.range" />
      </Ark.Track>
      <!-- One thumb per value, which is the whole of what makes a range slider. -->
      <Ark.Context v-slot="api">
        <Ark.Thumb
          v-for="(_, index) in api.value"
          :key="index"
          :index="index"
          data-slot="thumb"
          :class="theme.class.thumb"
        >
          <Ark.HiddenInput />
        </Ark.Thumb>
      </Ark.Context>
    </Ark.Control>

    <Ark.MarkerGroup
      v-if="props.marks != null && props.marks.length > 0"
      data-slot="markerGroup"
      :class="theme.class.markerGroup"
    >
      <Ark.Marker
        v-for="mark in props.marks"
        :key="mark.value"
        :value="mark.value"
        data-slot="marker"
        :class="theme.class.marker"
      >
        {{ mark.label }}
      </Ark.Marker>
    </Ark.MarkerGroup>
  </Ark.Root>
</template>
