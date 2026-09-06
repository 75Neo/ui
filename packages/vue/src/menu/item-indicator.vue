<script setup lang="ts">
import { computed } from "vue";
import { Menu as Ark } from "@ark-ui/vue/menu";
import { cva } from "class-variance-authority";
import { Check as CheckIcon } from "@lucide/vue";
import { cn, menuDefaults, menuSizeData } from "@75neo/themes";
import { useMenuVariants } from "./variants";

const menuItemIndicator = cva("ms-auto shrink-0 [&>svg]:size-full", {
  variants: { size: menuSizeData.itemIndicator },
  defaultVariants: menuDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useMenuVariants();
const itemIndicatorClass = computed(() =>
  cn(menuItemIndicator(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.ItemIndicator data-slot="menu-item-indicator" :class="itemIndicatorClass">
    <slot>
      <component :is="CheckIcon" />
    </slot>
  </Ark.ItemIndicator>
</template>
