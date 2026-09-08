<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Pagination as Ark } from "@ark-ui/vue/pagination";
import { cn } from "cn";
import { pagination } from "@/registry/shared/lib/pagination.styles";

interface PaginationNextTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<PaginationNextTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = pagination();
</script>

<template>
  <Ark.NextTrigger :class="cn(styles.nextTrigger(), props.class)">
    <slot />
  </Ark.NextTrigger>
</template>
