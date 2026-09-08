<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ScrollArea as Ark } from "@ark-ui/vue/scroll-area";
import { cn } from "cn";
import { scrollArea } from "@/registry/shared/lib/scroll-area.styles";

interface ScrollAreaContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ScrollAreaContentProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = scrollArea();
</script>

<template>
  <Ark.Content :class="cn(styles.content(), props.class)">
    <slot />
  </Ark.Content>
</template>
