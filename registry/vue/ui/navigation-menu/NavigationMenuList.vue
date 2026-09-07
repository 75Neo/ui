<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { NavigationMenu as Ark } from "@ark-ui/vue/navigation-menu";
import { cn } from "cn";
import { navigationMenu } from "@/registry/shared/lib/navigation-menu.styles";

interface NavigationMenuListProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<NavigationMenuListProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = navigationMenu();
</script>

<template>
  <Ark.List :class="cn(styles.list(), props.class)">
    <slot />
  </Ark.List>
</template>
