<script setup lang="ts">
import { computed } from "vue";
import { Toc as Ark } from "@ark-ui/vue/toc";
import { cva } from "class-variance-authority";
import { cn, tableOfContentsDefaults, tableOfContentsIndicatorData } from "@75neo/themes";
import { useTableOfContentsVariants } from "./variants";

const tableOfContentsIndicator = cva(
  "absolute inset-s-0 top-(--top) h-(--height) w-px transition-all duration-200",
  {
    variants: { color: tableOfContentsIndicatorData },
    defaultVariants: tableOfContentsDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

const variants = useTableOfContentsVariants();
const indicatorClass = computed(() =>
  cn(tableOfContentsIndicator(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Indicator data-slot="table-of-contents-indicator" :class="indicatorClass" />
</template>
