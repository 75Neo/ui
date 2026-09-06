<script setup lang="ts">
import { computed } from "vue";
import { RatingGroup as Ark } from "@ark-ui/vue/rating-group";
import { cva } from "class-variance-authority";
import { cn, ratingGroupDefaults, ratingGroupSizeData } from "@75neo/themes";
import { useRatingGroupVariants } from "./variants";

const ratingGroupControl = cva(
  "flex items-center data-disabled:cursor-not-allowed data-disabled:opacity-75",
  {
    variants: { size: ratingGroupSizeData.control },
    defaultVariants: ratingGroupDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useRatingGroupVariants();
const controlClass = computed(() =>
  cn(ratingGroupControl(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Control data-slot="rating-group-control" :class="controlClass">
    <slot />
  </Ark.Control>
</template>
