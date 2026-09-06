<script setup lang="ts">
import { HoverCard as Ark } from "@ark-ui/vue/hover-card";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Trigger data-slot="hover-card-trigger" :class="cn(props.class as string | undefined)">
    <slot />
  </Ark.Trigger>
</template>
