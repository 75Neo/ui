<script setup lang="ts">
import { computed } from "vue";
import { Toc as Ark } from "@ark-ui/vue/toc";
import { cva } from "class-variance-authority";
import { cn, tableOfContentsDefaults, tableOfContentsSizeData } from "@75neo/themes";
import { useTableOfContentsVariants } from "./variants";

const tableOfContentsTitle = cva("font-medium text-dimmed", {
  variants: { size: tableOfContentsSizeData.title },
  defaultVariants: tableOfContentsDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useTableOfContentsVariants();
const titleClass = computed(() =>
  cn(tableOfContentsTitle(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Title data-slot="table-of-contents-title" :class="titleClass">
    <slot>On this page</slot>
  </Ark.Title>
</template>
