<script setup lang="ts">
import { Tour as Ark } from "@ark-ui/vue/tour";
import type { StepDetails } from "@ark-ui/vue/tour";

interface TourProps {
  steps: StepDetails[];
  keyboardNavigation?: boolean;
  preventInteraction?: boolean;
  closeOnEscape?: boolean;
  closeOnInteractOutside?: boolean;
  spotlightRadius?: number;
}

const props = withDefaults(defineProps<TourProps>(), {
  keyboardNavigation: undefined,
  preventInteraction: undefined,
  closeOnEscape: undefined,
  closeOnInteractOutside: undefined,
});

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    :steps="props.steps"
    :keyboard-navigation="props.keyboardNavigation"
    :prevent-interaction="props.preventInteraction"
    :close-on-escape="props.closeOnEscape"
    :close-on-interact-outside="props.closeOnInteractOutside"
    :spotlight-radius="props.spotlightRadius"
  >
    <slot />
  </Ark.Root>
</template>
