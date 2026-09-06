<script setup lang="ts">
import { type Component, computed } from "vue";
import { Menu as Ark } from "@ark-ui/vue/menu";
import { cva } from "class-variance-authority";
import { Check as CheckIcon } from "@lucide/vue";
import {
  cn,
  menuDefaults,
  menuItemCompoundData,
  menuRowValue,
  menuSizeData,
  type MenuCheckboxItemProps,
} from "@75neo/themes";
import { useMenuVariants } from "./variants";
import MenuFace from "./face.vue";
import MenuItemIndicator from "./item-indicator.vue";

const menuCheckboxItem = cva(
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
  MenuCheckboxItemProps<Component> & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useMenuVariants();
const checkboxItemClass = computed(() =>
  cn(menuCheckboxItem(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.CheckboxItem
    :value="menuRowValue(props.row, 0)"
    :checked="props.row.checked ?? false"
    :disabled="props.row.disabled"
    :close-on-select="props.row.closeOnSelect"
    data-slot="menu-item"
    :class="checkboxItemClass"
    @checked-change="props.row.onCheckedChange?.($event.checked)"
  >
    <slot>
      <MenuFace :row="props.row" />
    </slot>
    <MenuItemIndicator>
      <component :is="props.checkedIcon ?? CheckIcon" />
    </MenuItemIndicator>
  </Ark.CheckboxItem>
</template>
