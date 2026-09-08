<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Pagination as Ark } from "@ark-ui/vue/pagination";
import { cn } from "cn";
import { paginationStyles as styles } from "@/registry/shared/lib/pagination.styles";

interface PaginationFirstTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<PaginationFirstTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.FirstTrigger :class="cn(styles.firstTrigger(), props.class)">
    <slot />
  </Ark.FirstTrigger>
</template>
