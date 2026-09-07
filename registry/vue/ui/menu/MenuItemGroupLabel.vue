<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Menu as Ark } from "@ark-ui/vue/menu";
import { cn } from "cn";
import { menu } from "@/registry/shared/lib/menu.styles";

interface MenuItemGroupLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<MenuItemGroupLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = menu();
</script>

<template>
  <Ark.ItemGroupLabel :class="cn(styles.itemGroupLabel(), props.class)">
    <slot />
  </Ark.ItemGroupLabel>
</template>
