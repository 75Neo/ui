<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Toc as Ark, type TocItemData } from "@ark-ui/vue/toc";
import { cn } from "cn";
import { toc } from "@/registry/shared/lib/toc.styles";

interface TocItemProps {
  item: TocItemData;
  class?: HTMLAttributes["class"];
}

const props = defineProps<TocItemProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = toc();
</script>

<template>
  <Ark.Item :item="props.item" :class="cn(styles.item(), props.class)">
    <slot />
  </Ark.Item>
</template>
