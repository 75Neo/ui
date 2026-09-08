<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Select as Ark } from "@ark-ui/vue/select";
import { cn } from "cn";
import { selectStyles as styles } from "@/registry/shared/lib/select.styles";

interface SelectItemProps {
  item: unknown;
  persistFocus?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<SelectItemProps>(), {
  persistFocus: undefined,
});

defineSlots<{
  default?: () => unknown;
}>();
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
