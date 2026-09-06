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
  <Ark.Control
    data-slot="select-control"
    :class="cn('relative flex w-full min-w-0 items-center', props.class as string | undefined)"
  >
    <slot />
  </Ark.Control>
</template>
