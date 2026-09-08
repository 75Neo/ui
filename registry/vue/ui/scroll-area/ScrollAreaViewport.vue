<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ScrollArea as Ark } from "@ark-ui/vue/scroll-area";
import { cn } from "cn";
import { scrollArea } from "@/registry/shared/lib/scroll-area.styles";

interface ScrollAreaViewportProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ScrollAreaViewportProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = scrollArea();
</script>

<template>
  <Ark.Viewport :class="cn(styles.viewport(), props.class)">
    <slot />
  </Ark.Viewport>
</template>
