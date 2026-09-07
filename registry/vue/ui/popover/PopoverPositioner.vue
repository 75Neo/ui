<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Popover as Ark } from "@ark-ui/vue/popover";
import { cn } from "cn";
import { popover } from "@/registry/shared/lib/popover.styles";

interface PopoverPositionerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<PopoverPositionerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = popover();
</script>

<template>
  <Ark.Positioner :class="cn(styles.positioner(), props.class)">
    <slot />
  </Ark.Positioner>
</template>
