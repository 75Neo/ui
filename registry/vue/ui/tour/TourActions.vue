<script setup lang="ts">
import { Tour as Ark, type TourActionTriggerProps } from "@ark-ui/vue/tour";

defineSlots<{
  default?: (props: { actions: TourActionTriggerProps["action"][] }) => unknown;
}>();
</script>

<template>
  <Ark.Actions v-slot="actions">
    <slot :actions="actions" />
  </Ark.Actions>
</template>
