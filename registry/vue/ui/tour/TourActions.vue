<script setup lang="ts">
import { Tour as Ark } from "@ark-ui/vue/tour";

interface TourActionsProps {}

const props = defineProps<TourActionsProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Actions>
    <slot />
  </Ark.Actions>
</template>
