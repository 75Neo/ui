<script setup lang="ts">
import { computed } from "vue";
import { Steps as Ark } from "@ark-ui/vue/steps";
import { cva } from "class-variance-authority";
import { cn, stepsColorData, stepsDefaults } from "@75neo/themes";
import { useStepsVariants } from "./variants";

const stepsSeparator = cva(
  "h-0.5 min-w-4 flex-1 rounded-full bg-muted data-[orientation=vertical]:hidden",
  {
    variants: { color: stepsColorData.separator },
    defaultVariants: stepsDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

const variants = useStepsVariants();
const separatorClass = computed(() =>
  cn(stepsSeparator({ color: variants.color }), props.class as string | undefined),
);
</script>

<template>
  <Ark.Separator data-slot="steps-separator" :class="separatorClass" />
</template>
