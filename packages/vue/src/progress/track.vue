<script setup lang="ts">
import { computed } from "vue";
import { Progress as Ark } from "@ark-ui/vue/progress";
import { cva } from "class-variance-authority";
import { cn, progressDefaults, progressSizeData } from "@75neo/themes";
import { useProgressVariants } from "./variants";

const progressTrack = cva("w-full overflow-hidden rounded-full bg-elevated", {
  variants: { size: progressSizeData.track },
  defaultVariants: progressDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useProgressVariants();
const trackClass = computed(() =>
  cn(progressTrack({ size: variants.size }), props.class as string | undefined),
);
</script>

<template>
  <Ark.Track data-slot="progress-track" :class="trackClass">
    <slot />
  </Ark.Track>
</template>
