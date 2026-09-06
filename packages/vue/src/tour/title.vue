<script setup lang="ts">
import { computed } from "vue";
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cva } from "class-variance-authority";
import { cn, tourDefaults, tourSizeData } from "@75neo/themes";
import { useTourVariants } from "./variants";

const tourTitle = cva("font-semibold text-highlighted", {
  variants: { size: tourSizeData.title },
  defaultVariants: tourDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useTourVariants();
const titleClass = computed(() => cn(tourTitle(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Title data-slot="tour-title" :class="titleClass">
    <!-- Ark renders its own text when no slot arrives; an empty one crashes that fallback. -->
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </Ark.Title>
</template>
