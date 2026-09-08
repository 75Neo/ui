<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ScrollArea as Ark } from "@ark-ui/vue/scroll-area";
import { cn } from "cn";
import { scrollArea } from "@/registry/shared/lib/scroll-area.styles";

interface ScrollAreaProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ScrollAreaProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = scrollArea();
</script>

<template>
  <Ark.Root :class="cn(styles.root(), props.class)">
    <slot />
  </Ark.Root>
</template>
