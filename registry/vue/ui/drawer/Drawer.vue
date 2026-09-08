<script setup lang="ts">
import { Drawer as Ark } from "@ark-ui/vue/drawer";

interface DrawerProps {
  defaultOpen?: boolean;
  modal?: boolean;
  role?: "dialog" | "alertdialog";
  closeOnEscape?: boolean;
  closeOnInteractOutside?: boolean;
  preventScroll?: boolean;
  trapFocus?: boolean;
  restoreFocus?: boolean;
  swipeDirection?: "up" | "down" | "start" | "end";
  snapPoints?: (number | string)[];
  closeThreshold?: number;
}

const props = withDefaults(defineProps<DrawerProps>(), {
  defaultOpen: undefined,
  modal: undefined,
  closeOnEscape: undefined,
  closeOnInteractOutside: undefined,
  preventScroll: undefined,
  trapFocus: undefined,
  restoreFocus: undefined,
});

const open = defineModel<boolean>("open");

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    v-model:open="open"
    :default-open="props.defaultOpen"
    :modal="props.modal"
    :role="props.role"
    :close-on-escape="props.closeOnEscape"
    :close-on-interact-outside="props.closeOnInteractOutside"
    :prevent-scroll="props.preventScroll"
    :trap-focus="props.trapFocus"
    :restore-focus="props.restoreFocus"
    :swipe-direction="props.swipeDirection"
    :snap-points="props.snapPoints"
    :close-threshold="props.closeThreshold"
  >
    <slot />
  </Ark.Root>
</template>
