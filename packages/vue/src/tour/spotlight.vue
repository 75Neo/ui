<script setup lang="ts">
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();
</script>

<template>
  <Ark.Spotlight
    data-slot="tour-spotlight"
    :class="cn('z-50 rounded-md ring-2 ring-inverted', props.class as string | undefined)"
  />
</template>
