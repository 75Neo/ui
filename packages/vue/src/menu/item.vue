<script setup lang="ts">
import { type Component, computed } from "vue";
import { Menu as Ark } from "@ark-ui/vue/menu";
import { cva } from "class-variance-authority";
import {
  cn,
  menuDefaults,
  menuItemCompoundData,
  menuRowValue,
  menuSizeData,
  type MenuItemProps,
} from "@75neo/themes";
import { useMenuVariants } from "./variants";
import MenuFace from "./face.vue";

const menuItem = cva(
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
  MenuItemProps<Component> & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useMenuVariants();
const itemClass = computed(() => cn(menuItem(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Item
    v-if="props.row.href == null"
    :value="menuRowValue(props.row, 0)"
    :disabled="props.row.disabled"
    :close-on-select="props.row.closeOnSelect"
    data-slot="menu-item"
    :class="itemClass"
    @select="props.row.onSelect?.()"
  >
    <slot>
      <MenuFace :row="props.row" />
    </slot>
  </Ark.Item>
  <Ark.Item
    v-else
    :value="menuRowValue(props.row, 0)"
    :disabled="props.row.disabled"
    :close-on-select="props.row.closeOnSelect"
    data-slot="menu-item"
    :class="itemClass"
    as-child
    @select="props.row.onSelect?.()"
  >
    <a :href="props.row.href" :target="props.row.target">
      <slot>
        <MenuFace :row="props.row" />
      </slot>
    </a>
  </Ark.Item>
</template>
