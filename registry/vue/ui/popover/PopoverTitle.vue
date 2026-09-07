<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Popover as Ark } from "@ark-ui/vue/popover";
import { cn } from "cn";
import { popover } from "@/registry/shared/lib/popover.styles";

interface PopoverTitleProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<PopoverTitleProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = popover();
</script>

<template>
  <Ark.Title :class="cn(styles.title(), props.class)">
    <slot />
  </Ark.Title>
</template>
