<script setup lang="ts">
import { Popover as Ark } from "@ark-ui/vue/popover";

interface PopoverProps {
  defaultOpen?: boolean;
  modal?: boolean;
  portalled?: boolean;
  autoFocus?: boolean;
  closeOnEscape?: boolean;
  closeOnInteractOutside?: boolean;
}

const props = withDefaults(defineProps<PopoverProps>(), {
  defaultOpen: undefined,
  modal: undefined,
  portalled: undefined,
  autoFocus: undefined,
  closeOnEscape: undefined,
  closeOnInteractOutside: undefined,
});

const open = defineModel<boolean>("open", { default: undefined });

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    v-model:open="open"
    :default-open="props.defaultOpen"
    :modal="props.modal"
    :portalled="props.portalled"
    :auto-focus="props.autoFocus"
    :close-on-escape="props.closeOnEscape"
    :close-on-interact-outside="props.closeOnInteractOutside"
  >
    <slot />
  </Ark.Root>
</template>
