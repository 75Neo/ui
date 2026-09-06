<script setup lang="ts">
import { computed, provide, reactive } from "vue";
import { AngleSlider as Ark } from "@ark-ui/vue/angle-slider";
import { angleSliderDefaults, cn, type AngleSliderRootProps } from "@75neo/themes";
import { angleSliderVariantsKey } from "./variants";
import AngleSliderControl from "./control.vue";
import AngleSliderLabel from "./label.vue";
import AngleSliderMarker from "./marker.vue";
import AngleSliderMarkerGroup from "./marker-group.vue";
import AngleSliderThumb from "./thumb.vue";
import AngleSliderValueText from "./value-text.vue";

const props = defineProps<
  AngleSliderRootProps & {
    class?: unknown;
  }
>();

const value = defineModel<number | undefined>({ default: undefined });

defineSlots<{
  default?: () => unknown;
}>();

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get size() {
    return props.size ?? angleSliderDefaults.size;
  },
  get color() {
    return props.color ?? angleSliderDefaults.color;
  },
});
provide(angleSliderVariantsKey, resolved);

const rootClass = computed(() =>
  cn(
    "inline-flex data-disabled:pointer-events-none data-disabled:opacity-75",
    props.class as string | undefined,
  ),
);
const markers = computed(() => props.markers ?? []);
</script>

<template>
  <Ark.Root
    v-model="value"
    :step="props.step"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :invalid="props.invalid"
    :name="props.name"
    data-slot="angle-slider"
    :data-size="resolved.size"
    :data-color="resolved.color"
    :class="rootClass"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      <AngleSliderControl>
        <AngleSliderMarkerGroup v-if="markers.length > 0">
          <AngleSliderMarker v-for="marker in markers" :key="marker" :value="marker" />
        </AngleSliderMarkerGroup>
        <span
          data-slot="angle-slider-content"
          class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
        >
          <AngleSliderValueText v-if="props.showValue" />
          <AngleSliderLabel v-if="props.label != null">{{ props.label }}</AngleSliderLabel>
        </span>
        <AngleSliderThumb />
      </AngleSliderControl>
    </template>
    <!-- The one part with no class of its own: it is what puts the angle in a form. -->
    <Ark.HiddenInput />
  </Ark.Root>
</template>
