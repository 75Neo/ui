<script setup lang="ts">
import { provide, reactive } from "vue";
import { Progress as Ark } from "@ark-ui/vue/progress";
import { cn, progressDefaults, type ProgressRootProps } from "@75neo/themes";
import { progressVariantsKey } from "./variants";
import ProgressCircle from "./circle.vue";
import ProgressCircleRange from "./circle-range.vue";
import ProgressCircleTrack from "./circle-track.vue";
import ProgressLabel from "./label.vue";
import ProgressRange from "./range.vue";
import ProgressTrack from "./track.vue";
import ProgressValueText from "./value-text.vue";

const props = defineProps<
  ProgressRootProps & {
    class?: unknown;
    /** Controlled value. Falls through to Ark; absent leaves `defaultValue` to work. */
    value?: number | null;
    /** Initial value. Falls through to Ark. */
    defaultValue?: number | null;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get size() {
    return props.size ?? progressDefaults.size;
  },
  get color() {
    return props.color ?? progressDefaults.color;
  },
});
provide(progressVariantsKey, resolved);

const showValue = () => props.showValue ?? true;
</script>

<template>
  <Ark.Root
    data-slot="progress"
    :data-size="resolved.size"
    :data-color="resolved.color"
    :data-circle="props.circle"
    :class="
      cn(
        'flex w-full flex-col gap-2 data-[circle=true]:items-center',
        props.class as string | undefined,
      )
    "
    :value="props.value"
    :default-value="props.defaultValue"
    :min="props.min"
    :max="props.max"
    :orientation="props.orientation"
  >
    <span
      v-if="props.label != null || showValue()"
      data-slot="progress-header"
      class="flex w-full items-center justify-between gap-2"
    >
      <ProgressLabel v-if="props.label != null">{{ props.label }}</ProgressLabel>
      <span v-else />
      <ProgressValueText v-if="showValue()" />
    </span>
    <ProgressCircle v-if="props.circle">
      <ProgressCircleTrack />
      <ProgressCircleRange />
    </ProgressCircle>
    <ProgressTrack v-else>
      <ProgressRange />
    </ProgressTrack>
    <slot />
  </Ark.Root>
</template>
