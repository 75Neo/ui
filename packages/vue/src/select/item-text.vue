<script setup lang="ts">
import { Select as Ark } from "@ark-ui/vue/select";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.ItemText
    data-slot="select-item-text"
    :class="cn('min-w-0 flex-1 truncate', props.class as string | undefined)"
  >
    <slot />
  </Ark.ItemText>
</template>
