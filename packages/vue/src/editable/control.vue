<script setup lang="ts">
import { Editable as Ark } from "@ark-ui/vue/editable";
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
    data-slot="editable-control"
    :class="
      cn('col-start-2 row-start-1 flex items-center gap-1', props.class as string | undefined)
    "
  >
    <slot />
  </Ark.Control>
</template>
