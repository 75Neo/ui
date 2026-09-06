<script setup lang="ts">
import { computed } from "vue";
import { RatingGroup as Ark } from "@ark-ui/vue/rating-group";
import { cva } from "class-variance-authority";
import { cn, ratingGroupDefaults, ratingGroupSizeData } from "@75neo/themes";
import { useRatingGroupVariants } from "./variants";

const ratingGroupItem = cva(
  "relative inline-flex shrink-0 cursor-pointer text-muted transition-colors data-disabled:cursor-not-allowed",
  {
    variants: { size: ratingGroupSizeData.item },
    defaultVariants: ratingGroupDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
  /** Which star this is, from one. */
  index: number;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useRatingGroupVariants();
const itemClass = computed(() => cn(ratingGroupItem(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Item data-slot="rating-group-item" :index="props.index" :class="itemClass">
    <slot />
  </Ark.Item>
</template>
