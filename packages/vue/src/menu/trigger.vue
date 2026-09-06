<script setup lang="ts">
import { Menu as Ark } from "@ark-ui/vue/menu";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Trigger data-slot="menu-trigger" :class="cn(props.class as string | undefined)">
    <slot />
  </Ark.Trigger>
</template>
