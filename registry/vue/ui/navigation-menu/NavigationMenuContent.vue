<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { NavigationMenu as Ark } from "@ark-ui/vue/navigation-menu";
import { cn } from "cn";
import { navigationMenu } from "@/registry/shared/lib/navigation-menu.styles";

interface NavigationMenuContentProps {
  value?: string;
  class?: HTMLAttributes["class"];
}

const props = defineProps<NavigationMenuContentProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = navigationMenu();
</script>

<template>
  <Ark.Content :value="props.value" :class="cn(styles.content(), props.class)">
    <slot />
  </Ark.Content>
</template>
