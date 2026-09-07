<script setup lang="ts">
import { Dialog as Ark } from "@ark-ui/vue/dialog";

interface DialogProps {
  defaultOpen?: boolean;
  modal?: boolean;
  role?: "dialog" | "alertdialog";
  closeOnEscape?: boolean;
  closeOnInteractOutside?: boolean;
  preventScroll?: boolean;
  trapFocus?: boolean;
  restoreFocus?: boolean;
}

const props = withDefaults(defineProps<DialogProps>(), {
  defaultOpen: undefined,
  modal: undefined,
  closeOnEscape: undefined,
  closeOnInteractOutside: undefined,
  preventScroll: undefined,
  trapFocus: undefined,
  restoreFocus: undefined,
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
    :role="props.role"
    :close-on-escape="props.closeOnEscape"
    :close-on-interact-outside="props.closeOnInteractOutside"
    :prevent-scroll="props.preventScroll"
    :trap-focus="props.trapFocus"
    :restore-focus="props.restoreFocus"
  >
    <slot />
  </Ark.Root>
</template>
