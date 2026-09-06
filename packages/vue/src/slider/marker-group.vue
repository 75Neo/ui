<script setup lang="ts">
import { Slider as Ark } from "@ark-ui/vue/slider";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.MarkerGroup
    data-slot="slider-marker-group"
    :class="
      cn(
        'group-data-[orientation=horizontal]/slider:mt-1 group-data-[orientation=horizontal]/slider:w-full group-data-[orientation=vertical]/slider:ms-2 group-data-[orientation=vertical]/slider:h-full',
        props.class as string | undefined,
      )
    "
  >
    <slot />
  </Ark.MarkerGroup>
</template>
