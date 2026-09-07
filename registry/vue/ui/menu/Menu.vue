<script setup lang="ts">
import { Menu as Ark } from "@ark-ui/vue/menu";

interface MenuProps {
  defaultOpen?: boolean;
  closeOnSelect?: boolean;
  loopFocus?: boolean;
  typeahead?: boolean;
  defaultHighlightedValue?: string;
}

const props = withDefaults(defineProps<MenuProps>(), {
  defaultOpen: undefined,
  closeOnSelect: undefined,
  loopFocus: undefined,
  typeahead: undefined,
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
    :close-on-select="props.closeOnSelect"
    :loop-focus="props.loopFocus"
    :typeahead="props.typeahead"
    :default-highlighted-value="props.defaultHighlightedValue"
  >
    <slot />
  </Ark.Root>
</template>
