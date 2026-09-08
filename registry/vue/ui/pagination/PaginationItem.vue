<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Pagination as Ark } from "@ark-ui/vue/pagination";
import { cn } from "cn";
import { pagination } from "@/registry/shared/lib/pagination.styles";

interface PaginationItemProps {
  value: number;
  type: "page";
  class?: HTMLAttributes["class"];
}

const props = defineProps<PaginationItemProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = pagination();
</script>

<template>
  <Ark.Item :value="props.value" :type="props.type" :class="cn(styles.item(), props.class)">
    <slot />
  </Ark.Item>
</template>
