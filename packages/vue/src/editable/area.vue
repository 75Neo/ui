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
  <Ark.Area
    data-slot="editable-area"
    :class="
      cn(
        'grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2',
        props.class as string | undefined,
      )
    "
  >
    <slot />
  </Ark.Area>
</template>
