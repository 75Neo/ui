<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cn } from "cn";
import { combobox } from "@/registry/shared/lib/combobox.styles";

interface ComboboxItemProps {
  item: unknown;
  persistFocus?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ComboboxItemProps>(), {
  persistFocus: undefined,
});

defineSlots<{
  default?: () => unknown;
}>();

const styles = combobox();
</script>

<template>
  <Ark.Item
    :item="props.item"
    :persist-focus="props.persistFocus"
    :class="cn(styles.item(), props.class)"
  >
    <slot />
  </Ark.Item>
</template>
