<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { NavigationMenu as Ark } from "@ark-ui/vue/navigation-menu";
import { cn } from "cn";
import { navigationMenuStyles as styles } from "@/registry/shared/lib/navigation-menu.styles";

interface NavigationMenuItemProps {
  value: string;
  disabled?: boolean;
  class?: HTMLAttributes["class"];
}

const props = defineProps<NavigationMenuItemProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Item :value="props.value" :disabled="props.disabled" :class="cn(styles.item(), props.class)">
    <slot />
  </Ark.Item>
</template>
