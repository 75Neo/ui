<script setup lang="ts">
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();
</script>

<template>
  <Ark.Backdrop
    data-slot="tour-backdrop"
    :class="
      cn('fixed inset-0 z-50 bg-inverted/40 backdrop-blur-[2px]', props.class as string | undefined)
    "
  />
</template>
