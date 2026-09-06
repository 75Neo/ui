<script setup lang="ts">
import { Drawer as Ark } from "@ark-ui/vue/drawer";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Title
    data-slot="drawer-title"
    :class="cn('text-base font-semibold text-highlighted', props.class as string | undefined)"
  >
    <slot />
  </Ark.Title>
</template>
