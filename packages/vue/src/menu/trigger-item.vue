<script setup lang="ts">
import { type Component, computed } from "vue";
import { Menu as Ark } from "@ark-ui/vue/menu";
import { cva } from "class-variance-authority";
import { ChevronRight as ChevronRightIcon } from "@lucide/vue";
import {
  cn,
  menuDefaults,
  menuItemCompoundData,
  menuSizeData,
  type MenuTriggerItemProps,
} from "@75neo/themes";
import { useMenuVariants } from "./variants";
import MenuFace from "./face.vue";

const menuTriggerItem = cva(
  "flex cursor-pointer items-center rounded-md text-toned no-underline outline-none select-none data-disabled:cursor-not-allowed data-disabled:opacity-75",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: menuSizeData.item,
    },
    compoundVariants: menuItemCompoundData,
    defaultVariants: menuDefaults,
  },
);

const props = defineProps<
  MenuTriggerItemProps<Component> & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useMenuVariants();
const triggerItemClass = computed(() =>
  cn(menuTriggerItem(variants), props.class as string | undefined),
);
const trailingClass = computed(() =>
  cn("ms-auto shrink-0 text-dimmed [&>svg]:size-full", menuSizeData.trailingIcon[variants.size]),
);
</script>

<template>
  <Ark.TriggerItem data-slot="menu-trigger-item" :class="triggerItemClass">
    <slot>
      <MenuFace :row="props.row" />
    </slot>
    <span data-slot="menu-trailing-icon" :class="trailingClass">
      <component :is="props.trailingIcon ?? ChevronRightIcon" />
    </span>
  </Ark.TriggerItem>
</template>
