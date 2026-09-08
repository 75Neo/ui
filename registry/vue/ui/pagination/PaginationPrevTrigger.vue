<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Pagination as Ark } from "@ark-ui/vue/pagination";
import { cn } from "cn";
import { paginationStyles as styles } from "@/registry/shared/lib/pagination.styles";

interface PaginationPrevTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<PaginationPrevTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.PrevTrigger :class="cn(styles.prevTrigger(), props.class)">
    <slot />
  </Ark.PrevTrigger>
</template>
