<script setup lang="ts">
import { computed, provide, reactive } from "vue";
import { Slider as Ark } from "@ark-ui/vue/slider";
import { cn, sliderDefaults, type SliderRootProps } from "@75neo/themes";
import { sliderVariantsKey } from "./variants";
import SliderControl from "./control.vue";
import SliderLabel from "./label.vue";
import SliderMarker from "./marker.vue";
import SliderMarkerGroup from "./marker-group.vue";
import SliderRange from "./range.vue";
import SliderThumb from "./thumb.vue";
import SliderTrack from "./track.vue";
import SliderValueText from "./value-text.vue";

const props = defineProps<
  SliderRootProps & {
    class?: unknown;
  }
>();

const value = defineModel<number[] | undefined>({ default: undefined });

defineSlots<{
  default?: () => unknown;
}>();

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get color() {
    return props.color ?? sliderDefaults.color;
  },
  get size() {
    return props.size ?? sliderDefaults.size;
  },
});
provide(sliderVariantsKey, resolved);

const rootClass = computed(() =>
  cn(
    "group/slider flex min-w-0 gap-2 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-col data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-row-reverse",
    props.class as string | undefined,
  ),
);
const marks = computed(() => props.marks ?? []);
</script>

<template>
  <Ark.Root
    v-model="value"
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
    data-slot="slider"
    :data-color="resolved.color"
    :data-size="resolved.size"
    :class="rootClass"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      <span
        v-if="props.label != null || props.showValue"
        data-slot="slider-header"
        class="flex min-w-0 items-center justify-between gap-2"
      >
        <SliderLabel v-if="props.label != null">{{ props.label }}</SliderLabel>
        <SliderValueText v-if="props.showValue" />
      </span>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <!-- One thumb per value, which is the whole of what makes a range. -->
        <Ark.Context v-slot="api">
          <SliderThumb v-for="(_, index) in api.value" :key="index" :index="index" />
        </Ark.Context>
      </SliderControl>
      <SliderMarkerGroup v-if="marks.length > 0">
        <SliderMarker v-for="mark in marks" :key="mark.value" :value="mark.value">
          {{ mark.label }}
        </SliderMarker>
      </SliderMarkerGroup>
    </template>
  </Ark.Root>
</template>
