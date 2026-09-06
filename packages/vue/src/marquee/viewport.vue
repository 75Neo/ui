<script setup lang="ts">
import { Marquee as Ark } from "@ark-ui/vue/marquee";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Viewport
    data-slot="marquee-viewport"
    :class="cn('size-full', props.class as string | undefined)"
  >
    <slot />
  </Ark.Viewport>
</template>
