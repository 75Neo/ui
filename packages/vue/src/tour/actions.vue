<script setup lang="ts">
import { Tour as Ark, type TourActionTriggerProps } from "@ark-ui/vue/tour";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: (props: { actions: TourActionTriggerProps["action"][] }) => unknown;
}>();
</script>

<template>
  <!-- Ark.Actions renders no element, so the wrapper carries the part's identity. -->
  <span data-slot="tour-actions" :class="cn('contents', props.class as string | undefined)">
    <Ark.Actions v-slot="actions">
      <slot :actions="actions" />
    </Ark.Actions>
  </span>
</template>
