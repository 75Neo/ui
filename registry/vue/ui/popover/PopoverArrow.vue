<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Popover as Ark } from "@ark-ui/vue/popover";
import { cn } from "cn";
import { popoverStyles as styles } from "@/registry/shared/lib/popover.styles";

interface PopoverArrowProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<PopoverArrowProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Arrow :class="cn(styles.arrow(), props.class)">
    <slot />
  </Ark.Arrow>
</template>
