<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Pagination as Ark } from "@ark-ui/vue/pagination";
import { cn } from "cn";
import { pagination } from "@/registry/shared/lib/pagination.styles";

interface PaginationEllipsisProps {
  index: number;
  class?: HTMLAttributes["class"];
}

const props = defineProps<PaginationEllipsisProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = pagination();
</script>

<template>
  <Ark.Ellipsis :index="props.index" :class="cn(styles.ellipsis(), props.class)">
    <slot />
  </Ark.Ellipsis>
</template>
