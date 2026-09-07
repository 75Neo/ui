<script setup lang="ts">
import { HoverCard as Ark } from "@ark-ui/vue/hover-card";

interface HoverCardProps {
  defaultOpen?: boolean;
  openDelay?: number;
  closeDelay?: number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<HoverCardProps>(), {
  defaultOpen: undefined,
  disabled: undefined,
});

const open = defineModel<boolean>("open", { default: undefined });

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    v-model:open="open"
    :default-open="props.defaultOpen"
    :open-delay="props.openDelay"
    :close-delay="props.closeDelay"
    :disabled="props.disabled"
  >
    <slot />
  </Ark.Root>
</template>
