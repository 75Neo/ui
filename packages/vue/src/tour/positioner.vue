<script setup lang="ts">
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Positioner
    data-slot="tour-positioner"
    :class="
      cn(
        'z-50 data-[type=dialog]:fixed data-[type=dialog]:inset-0 data-[type=dialog]:m-auto data-[type=dialog]:flex data-[type=dialog]:items-center data-[type=dialog]:justify-center',
        props.class as string | undefined,
      )
    "
  >
    <slot />
  </Ark.Positioner>
</template>
