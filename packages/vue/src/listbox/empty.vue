<script setup lang="ts">
import { computed } from "vue";
import { Listbox as Ark } from "@ark-ui/vue/listbox";
import { cva } from "class-variance-authority";
import { cn, listboxDefaults, listboxSizeData } from "@75neo/themes";
import { useListboxVariants } from "./variants";

const listboxEmpty = cva("text-center text-muted", {
  variants: { size: listboxSizeData.empty },
  defaultVariants: listboxDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useListboxVariants();
const emptyClass = computed(() => cn(listboxEmpty(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Empty data-slot="listbox-empty" :class="emptyClass">
    <slot />
  </Ark.Empty>
</template>
