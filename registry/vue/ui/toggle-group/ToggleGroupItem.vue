<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ToggleGroup as Ark } from "@ark-ui/vue/toggle-group";
import { cn } from "cn";
import { toggleGroup } from "@/registry/shared/lib/toggle-group.styles";

interface ToggleGroupItemProps {
  value: string;
  disabled?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ToggleGroupItemProps>(), {
  disabled: undefined,
});

defineSlots<{
  default?: () => unknown;
}>();

const styles = toggleGroup();
</script>

<template>
  <Ark.Item :value="props.value" :disabled="props.disabled" :class="cn(styles.item(), props.class)">
    <slot />
  </Ark.Item>
</template>
