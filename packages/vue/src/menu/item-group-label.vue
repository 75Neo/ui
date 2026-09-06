<script setup lang="ts">
import { computed } from "vue";
import { Menu as Ark } from "@ark-ui/vue/menu";
import { cva } from "class-variance-authority";
import { cn, menuDefaults, menuSizeData } from "@75neo/themes";
import { useMenuVariants } from "./variants";

const menuItemGroupLabel = cva("font-medium text-dimmed select-none", {
  variants: { size: menuSizeData.groupLabel },
  defaultVariants: menuDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useMenuVariants();
const groupLabelClass = computed(() =>
  cn(menuItemGroupLabel(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.ItemGroupLabel data-slot="menu-item-group-label" :class="groupLabelClass">
    <slot />
  </Ark.ItemGroupLabel>
</template>
