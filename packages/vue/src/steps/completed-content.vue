<script setup lang="ts">
import { computed } from "vue";
import { Steps as Ark } from "@ark-ui/vue/steps";
import { cva } from "class-variance-authority";
import { cn, stepsDefaults, stepsSizeData } from "@75neo/themes";
import { useStepsVariants } from "./variants";

const stepsCompletedContent = cva("rounded-lg bg-muted text-center font-medium text-highlighted", {
  variants: { size: stepsSizeData.content },
  defaultVariants: stepsDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useStepsVariants();
const completedContentClass = computed(() =>
  cn(stepsCompletedContent({ size: variants.size }), props.class as string | undefined),
);
</script>

<template>
  <Ark.CompletedContent data-slot="steps-completed-content" :class="completedContentClass">
    <slot />
  </Ark.CompletedContent>
</template>
