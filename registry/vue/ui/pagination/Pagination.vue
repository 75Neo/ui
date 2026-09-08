<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Pagination as Ark } from "@ark-ui/vue/pagination";
import { cn } from "cn";
import { paginationStyles as styles } from "@/registry/shared/lib/pagination.styles";

interface PaginationProps {
  count: number;
  defaultPage?: number;
  pageSize?: number;
  defaultPageSize?: number;
  siblingCount?: number;
  type?: "button" | "link";
  class?: HTMLAttributes["class"];
}

const props = defineProps<PaginationProps>();

const value = defineModel<number>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    v-model="value"
    :count="props.count"
    :default-page="props.defaultPage"
    :page-size="props.pageSize"
    :default-page-size="props.defaultPageSize"
    :sibling-count="props.siblingCount"
    :type="props.type"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
