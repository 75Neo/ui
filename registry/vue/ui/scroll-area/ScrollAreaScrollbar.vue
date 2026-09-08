<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ScrollArea as Ark } from "@ark-ui/vue/scroll-area";
import { cn } from "cn";
import { scrollArea } from "@/registry/shared/lib/scroll-area.styles";

interface ScrollAreaScrollbarProps {
  orientation?: "horizontal" | "vertical";
  class?: HTMLAttributes["class"];
}

const props = defineProps<ScrollAreaScrollbarProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = scrollArea();
</script>

<template>
  <Ark.Scrollbar :orientation="props.orientation" :class="cn(styles.scrollbar(), props.class)">
    <slot />
  </Ark.Scrollbar>
</template>
