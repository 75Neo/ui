<script setup lang="ts">
import { computed } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cva } from "class-variance-authority";
import { cn, comboboxDefaults, comboboxSizeData } from "@75neo/themes";
import { useComboboxVariants } from "./variants";

const comboboxEmpty = cva("text-center text-muted", {
  variants: { size: comboboxSizeData.empty },
  defaultVariants: comboboxDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useComboboxVariants();
const emptyClass = computed(() => cn(comboboxEmpty(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Empty data-slot="combobox-empty" :class="emptyClass">
    <slot />
  </Ark.Empty>
</template>
