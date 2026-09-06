<script setup lang="ts">
import { computed } from "vue";
import { Pagination as Ark } from "@ark-ui/vue/pagination";
import { cva } from "class-variance-authority";
import {
  cn,
  paginationDefaults,
  paginationSizeData,
  type PaginationEllipsisProps,
} from "@75neo/themes";
import { usePaginationVariants } from "./variants";

const paginationEllipsis = cva(
  "inline-flex shrink-0 items-center justify-center text-dimmed select-none",
  {
    variants: { size: paginationSizeData.ellipsis },
    defaultVariants: paginationDefaults,
  },
);

const props = defineProps<
  PaginationEllipsisProps & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = usePaginationVariants();
const ellipsisClass = computed(() =>
  cn(paginationEllipsis(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Ellipsis :index="props.index" data-slot="pagination-ellipsis" :class="ellipsisClass">
    <slot>…</slot>
  </Ark.Ellipsis>
</template>
