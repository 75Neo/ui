<script lang="ts">
export type AngleSliderUI = {
  root?: string | ((cls: string) => string);
  label?: string | ((cls: string) => string);
  control?: string | ((cls: string) => string);
  thumb?: string | ((cls: string) => string);
  markerGroup?: string | ((cls: string) => string);
  marker?: string | ((cls: string) => string);
  valueText?: string | ((cls: string) => string);
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import {
  AngleSliderRoot as ArkRoot,
  AngleSliderLabel as ArkLabel,
  AngleSliderControl as ArkControl,
  AngleSliderThumb as ArkThumb,
  AngleSliderMarkerGroup as ArkMarkerGroup,
  AngleSliderMarker as ArkMarker,
  AngleSliderValueText as ArkValueText,
  AngleSliderHiddenInput as ArkHiddenInput,
} from "@ark-ui/vue/angle-slider";
import { angleSlider, type SlotClass } from "@75neo/styles";
import { useComponentUI } from "../composables/useComponentUI";

const props = withDefaults(
  defineProps<{
    modelValue?: number;
    defaultValue?: number;
    disabled?: boolean;
    invalid?: boolean;
    readOnly?: boolean;
    step?: number;
    name?: string;
    id?: string;
    ids?: {
      root?: string;
      thumb?: string;
      hiddenInput?: string;
      control?: string;
      valueText?: string;
      label?: string;
    };
    ariaLabel?: string;
    ariaLabelledby?: string;
    size?: "sm" | "md" | "lg";
    label?: string;
    markers?: number[];
    showValueText?: boolean;
    ui?: AngleSliderUI;
  }>(),
  {
    modelValue: undefined,
    defaultValue: undefined,
    disabled: false,
    invalid: false,
    readOnly: false,
    step: undefined,
    name: undefined,
    id: undefined,
    ids: undefined,
    ariaLabel: undefined,
    ariaLabelledby: undefined,
    size: "md",
    label: undefined,
    markers: () => [0, 45, 90, 135, 180, 225, 270, 315],
    showValueText: true,
    ui: undefined,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: number];
  valueChange: [details: { value: number; valueAsDegree: string }];
  valueChangeEnd: [details: { value: number; valueAsDegree: string }];
}>();

const tvSlots = computed(() =>
  angleSlider({ size: props.size, disabled: props.disabled || undefined }),
);

const resolved = useComponentUI(
  "angleSlider",
  tvSlots,
  computed(() => props.ui as Record<string, SlotClass> | undefined),
);

function onUpdateModelValue(value: number) {
  emit("update:modelValue", value);
}

function onValueChange(details: { value: number; valueAsDegree: string }) {
  emit("valueChange", details);
}

function onValueChangeEnd(details: { value: number; valueAsDegree: string }) {
  emit("valueChangeEnd", details);
}
</script>

<template>
  <ArkRoot
    :model-value="modelValue"
    :default-value="defaultValue"
    :disabled="disabled"
    :invalid="invalid"
    :read-only="readOnly"
    :step="step"
    :name="name"
    :id="id"
    :ids="ids"
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
    data-slot="root"
    :class="resolved.root()"
    @update:model-value="onUpdateModelValue"
    @value-change="onValueChange"
    @value-change-end="onValueChangeEnd"
  >
    <slot>
      <ArkLabel v-if="label" data-slot="label" :class="resolved.label()">
        {{ label }}
      </ArkLabel>

      <ArkControl data-slot="control" :class="resolved.control()">
        <ArkMarkerGroup
          v-if="markers.length > 0"
          data-slot="markerGroup"
          :class="resolved.markerGroup()"
        >
          <ArkMarker
            v-for="value in markers"
            :key="value"
            :value="value"
            data-slot="marker"
            :class="resolved.marker()"
          />
        </ArkMarkerGroup>
        <ArkThumb data-slot="thumb" :class="resolved.thumb()" />
      </ArkControl>

      <ArkValueText v-if="showValueText" data-slot="valueText" :class="resolved.valueText()" />

      <ArkHiddenInput />
    </slot>
  </ArkRoot>
</template>
