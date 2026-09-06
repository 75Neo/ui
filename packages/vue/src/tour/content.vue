<script setup lang="ts">
import { computed } from "vue";
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cva } from "class-variance-authority";
import { cn, tourDefaults, tourSizeData } from "@75neo/themes";
import { useTourVariants } from "./variants";

const tourContent = cva(
  "relative flex origin-(--transform-origin) flex-col rounded-xl bg-default shadow-lg ring ring-accented outline-none",
  {
    variants: { size: tourSizeData.base },
    defaultVariants: tourDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useTourVariants();
const contentClass = computed(() => cn(tourContent(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Content data-slot="tour-content" :class="contentClass">
    <slot />
  </Ark.Content>
</template>
