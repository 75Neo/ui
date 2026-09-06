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
  <Ark.Trigger data-slot="drawer-trigger" :class="cn(props.class as string | undefined)">
    <slot />
  </Ark.Trigger>
</template>
