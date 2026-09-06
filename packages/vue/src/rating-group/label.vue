<script setup lang="ts">
import { RatingGroup as Ark } from "@ark-ui/vue/rating-group";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Label
    data-slot="rating-group-label"
    :class="cn('font-medium text-highlighted select-none', props.class as string | undefined)"
  >
    <slot />
  </Ark.Label>
</template>
