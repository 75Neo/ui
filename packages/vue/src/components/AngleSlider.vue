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
  AngleSliderContext as ArkContext,
  AngleSliderHiddenInput as ArkHiddenInput,
} from "@ark-ui/vue/angle-slider";
import { angleSlider, type AngleSliderVariants } from "@75neo/styles";
import { ANGLE_SLIDER_DEFAULT_MARKERS, angleSliderKey, type AngleSliderUI } from "@75neo/core";
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
    ariaLabel?: string;
    ariaLabelledby?: string;
    size?: AngleSliderVariants["size"];
    label?: string;
    markers?: number[];
    showValueText?: boolean;
    ui?: AngleSliderUI;
    class?: unknown;
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
    ariaLabel: undefined,
    ariaLabelledby: undefined,
    size: "md",
    label: undefined,
    markers: () => ANGLE_SLIDER_DEFAULT_MARKERS,
    showValueText: true,
    ui: undefined,
    class: undefined,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: number];
  valueChange: [details: { value: number; valueAsDegree: string }];
  valueChangeEnd: [details: { value: number; valueAsDegree: string }];
}>();

const slots = defineSlots<{
  /** Falls back to the `label` prop. */
  label?: () => unknown;
  /** Falls back to Ark's formatted degree string. */
  valueText?: (bag: { value: number; valueAsDegree: string }) => unknown;
}>();

const tvSlots = computed(() => angleSlider({ size: props.size, disabled: props.disabled }));

const resolved = useComponentUI(
  angleSliderKey,
  tvSlots,
  computed(() => props.ui),
);
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
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
    data-slot="root"
    :class="resolved.root({ class: props.class as string })"
    @update:model-value="emit('update:modelValue', $event)"
    @value-change="emit('valueChange', $event)"
    @value-change-end="emit('valueChangeEnd', $event)"
  >
    <ArkLabel v-if="label || slots.label" data-slot="label" :class="resolved.label()">
      <slot name="label">{{ label }}</slot>
    </ArkLabel>

    <ArkControl data-slot="control" :class="resolved.control()">
      <ArkMarkerGroup
        v-if="markers.length > 0"
        data-slot="markerGroup"
        :class="resolved.markerGroup()"
      >
        <ArkMarker
          v-for="marker in markers"
          :key="marker"
          :value="marker"
          data-slot="marker"
          :class="resolved.marker()"
        />
      </ArkMarkerGroup>
      <ArkThumb data-slot="thumb" :class="resolved.thumb()" />
    </ArkControl>

    <template v-if="showValueText">
      <!-- Ark falls back to its own formatted degree string only when no default slot
           reaches it at all, so the two forms must be separate elements. -->
      <ArkValueText v-if="slots.valueText" data-slot="valueText" :class="resolved.valueText()">
        <ArkContext v-slot="api">
          <slot name="valueText" :value="api.value" :value-as-degree="api.valueAsDegree" />
        </ArkContext>
      </ArkValueText>
      <ArkValueText v-else data-slot="valueText" :class="resolved.valueText()" />
    </template>

    <ArkHiddenInput />
  </ArkRoot>
</template>
