<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Menu as Ark } from "@ark-ui/vue/menu";
import { cn } from "cn";
import { menuStyles as styles } from "@/registry/shared/lib/menu.styles";

interface MenuItemGroupProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<MenuItemGroupProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.ItemGroup :class="cn(styles.itemGroup(), props.class)">
    <slot />
  </Ark.ItemGroup>
</template>
