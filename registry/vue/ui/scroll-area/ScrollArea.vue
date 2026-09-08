<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ScrollArea as Ark } from "@ark-ui/vue/scroll-area";
import { cn } from "cn";
import { scrollAreaStyles as styles } from "@/registry/shared/lib/scroll-area.styles";

interface ScrollAreaProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ScrollAreaProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root :class="cn(styles.root(), props.class)">
    <slot />
  </Ark.Root>
</template>
