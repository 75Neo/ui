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
  <Ark.Description
    data-slot="drawer-description"
    :class="cn('text-sm/6 text-muted', props.class as string | undefined)"
  >
    <slot />
  </Ark.Description>
</template>
