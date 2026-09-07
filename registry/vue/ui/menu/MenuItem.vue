<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Menu as Ark } from "@ark-ui/vue/menu";
import { cn } from "cn";
import { menu } from "@/registry/shared/lib/menu.styles";

interface MenuItemProps {
  value: string;
  disabled?: boolean;
  closeOnSelect?: boolean;
  valueText?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<MenuItemProps>(), {
  disabled: undefined,
  closeOnSelect: undefined,
});

defineSlots<{
  default?: () => unknown;
}>();

const styles = menu();
</script>

<template>
  <Ark.Item
    :value="props.value"
    :disabled="props.disabled"
    :close-on-select="props.closeOnSelect"
    :value-text="props.valueText"
    :class="cn(styles.item(), props.class)"
  >
    <slot />
  </Ark.Item>
</template>
