<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Menu as Ark } from "@ark-ui/vue/menu";
import { cn } from "cn";
import { menu } from "@/registry/shared/lib/menu.styles";

interface MenuTriggerItemProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<MenuTriggerItemProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = menu();
</script>

<template>
  <Ark.TriggerItem :class="cn(styles.item(), props.class)">
    <slot />
  </Ark.TriggerItem>
</template>
