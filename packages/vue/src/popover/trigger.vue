<script setup lang="ts">
import { Popover as Ark } from "@ark-ui/vue/popover";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Trigger data-slot="popover-trigger" :class="cn(props.class as string | undefined)">
    <slot />
  </Ark.Trigger>
</template>
