<script setup lang="ts">
import { computed } from "vue";
import { Menu as Ark } from "@ark-ui/vue/menu";
import { cva } from "class-variance-authority";
import { cn, menuDefaults, menuItemCompoundData, menuSizeData } from "@75neo/themes";
import { useMenuVariants } from "./variants";

const menuRadioItem = cva(
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

const props = defineProps<{
  class?: unknown;
  value: string;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useMenuVariants();
const radioItemClass = computed(() =>
  cn(menuRadioItem(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.RadioItem data-slot="menu-radio-item" :value="props.value" :class="radioItemClass">
    <slot />
  </Ark.RadioItem>
</template>
