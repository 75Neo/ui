<script setup lang="ts">
import { Tour as Ark, type UseTourReturn } from "@ark-ui/vue/tour";

interface TourProps {
  tour: UseTourReturn;
  lazyMount?: boolean;
  unmountOnExit?: boolean;
}

const props = withDefaults(defineProps<TourProps>(), {
  lazyMount: undefined,
  unmountOnExit: undefined,
});

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root :tour="props.tour" :lazy-mount="props.lazyMount" :unmount-on-exit="props.unmountOnExit">
    <slot />
  </Ark.Root>
</template>
