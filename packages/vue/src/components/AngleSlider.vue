<script setup lang="ts">
import { AngleSlider as Ark } from "@ark-ui/vue/angle-slider";
import {
  ANGLE_SLIDER_PATH_LENGTH,
  ANGLE_SLIDER_RADIUS,
  type AngleSliderProps,
  angleSlider,
} from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The angle lives outside the shared contract, because React and Vue spell a controlled
 * value too differently to share one type. Here it is `v-model`, with `defaultValue` as
 * the uncontrolled counterpart Ark's root already takes.
 */
const props = defineProps<
  AngleSliderProps & {
    defaultValue?: number;
    class?: unknown;
  }
>();

const value = defineModel<number>();

const theme = useResolvedTheme(
  angleSlider,
  "angleSlider",
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
    :step="props.step"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :name="props.name"
  >
    <Ark.Control data-slot="control" :class="theme.class.control">
      <!-- Decoration only. The thumb below carries the slider role and the value. -->
      <svg data-slot="dial" :class="theme.class.dial" viewBox="0 0 100 100" aria-hidden="true">
        <circle
          data-slot="track"
          :class="theme.class.track"
          cx="50"
          cy="50"
          :r="ANGLE_SLIDER_RADIUS"
        />
        <circle
          data-slot="range"
          :class="theme.class.range"
          cx="50"
          cy="50"
          :r="ANGLE_SLIDER_RADIUS"
          :pathLength="ANGLE_SLIDER_PATH_LENGTH"
        />
      </svg>

      <Ark.MarkerGroup
        v-if="props.markers && props.markers.length > 0"
        data-slot="markers"
        :class="theme.class.markers"
      >
        <Ark.Marker
          v-for="marker in props.markers"
          :key="marker"
          :value="marker"
          data-slot="marker"
          :class="theme.class.marker"
        />
      </Ark.MarkerGroup>

      <div data-slot="content" :class="theme.class.content">
        <!-- Ark's own text reads "45deg"; this readout spells the degree sign. -->
        <Ark.Context v-if="props.showValue" v-slot="api">
          <Ark.ValueText data-slot="value" :class="theme.class.value">
            {{ api.value }}°
          </Ark.ValueText>
        </Ark.Context>
        <Ark.Label v-if="props.label != null" data-slot="label" :class="theme.class.label">
          {{ props.label }}
        </Ark.Label>
      </div>

      <Ark.Thumb data-slot="thumb" :class="theme.class.thumb" />
    </Ark.Control>

    <Ark.HiddenInput />
  </Ark.Root>
</template>
