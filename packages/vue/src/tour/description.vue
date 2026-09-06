<script setup lang="ts">
import { computed } from "vue";
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cva } from "class-variance-authority";
import { cn, tourDefaults, tourSizeData } from "@75neo/themes";
import { useTourVariants } from "./variants";

const tourDescription = cva("text-muted", {
  variants: { size: tourSizeData.description },
  defaultVariants: tourDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useTourVariants();
const descriptionClass = computed(() =>
  cn(tourDescription(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Description data-slot="tour-description" :class="descriptionClass">
    <!-- Ark renders its own text when no slot arrives; an empty one crashes that fallback. -->
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </Ark.Description>
</template>
