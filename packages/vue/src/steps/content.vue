<script setup lang="ts">
import { computed } from "vue";
import { Steps as Ark } from "@ark-ui/vue/steps";
import { cva } from "class-variance-authority";
import { cn, stepsDefaults, stepsSizeData } from "@75neo/themes";
import { useStepsVariants } from "./variants";

const stepsContent = cva("rounded-lg bg-muted text-toned", {
  variants: { size: stepsSizeData.content },
  defaultVariants: stepsDefaults,
});

const props = defineProps<{
  index: number;
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useStepsVariants();
const contentClass = computed(() =>
  cn(stepsContent({ size: variants.size }), props.class as string | undefined),
);
</script>

<template>
  <Ark.Content data-slot="steps-content" :index="props.index" :class="contentClass">
    <slot />
  </Ark.Content>
</template>
