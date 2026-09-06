<script setup lang="ts">
import { computed } from "vue";
import { Steps as Ark } from "@ark-ui/vue/steps";
import { byColor, cn } from "@75neo/themes";
import { useStepsVariants } from "./variants";

const stepsProgressFill = {
  ...byColor((color) => `bg-${color}`),
  neutral: "bg-inverted",
} as const;

const props = defineProps<{
  class?: unknown;
}>();

const variants = useStepsVariants();
const fillClass = computed(() =>
  cn("block h-full rounded-full", stepsProgressFill[variants.color]),
);
</script>

<template>
  <Ark.Progress
    data-slot="steps-progress"
    :class="
      cn('h-1 w-full overflow-hidden rounded-full bg-elevated', props.class as string | undefined)
    "
  >
    <span
      data-slot="steps-progress-fill"
      :data-color="variants.color"
      :class="fillClass"
      style="width: calc(var(--percent) * 1%)"
    />
  </Ark.Progress>
</template>
