<script setup lang="ts">
import { Dialog as Ark } from "@ark-ui/vue/dialog";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Trigger data-slot="dialog-trigger" :class="cn(props.class as string | undefined)">
    <slot />
  </Ark.Trigger>
</template>
