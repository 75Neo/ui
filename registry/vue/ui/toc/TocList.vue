<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Toc as Ark } from "@ark-ui/vue/toc";
import { cn } from "cn";
import { toc } from "@/registry/shared/lib/toc.styles";

interface TocListProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TocListProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = toc();
</script>

<template>
  <Ark.List :class="cn(styles.list(), props.class)">
    <slot />
  </Ark.List>
</template>
