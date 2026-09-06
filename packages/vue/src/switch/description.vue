<script setup lang="ts">
import { computed } from "vue";
import { cva } from "class-variance-authority";
import { cn, switchDefaults, switchSizeData } from "@75neo/themes";
import { useSwitchVariants } from "./variants";

const switchDescription = cva("mt-1 text-pretty text-muted", {
  variants: { size: switchSizeData.description },
  defaultVariants: switchDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useSwitchVariants();
const descriptionClass = computed(() =>
  cn(switchDescription(variants), props.class as string | undefined),
);
</script>

<template>
  <p data-slot="switch-description" :class="descriptionClass">
    <slot />
  </p>
</template>
