<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Pagination as Ark } from "@ark-ui/vue/pagination";
import { cn } from "cn";
import { pagination } from "@/registry/shared/lib/pagination.styles";

interface PaginationLastTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<PaginationLastTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = pagination();
</script>

<template>
  <Ark.LastTrigger :class="cn(styles.lastTrigger(), props.class)">
    <slot />
  </Ark.LastTrigger>
</template>
