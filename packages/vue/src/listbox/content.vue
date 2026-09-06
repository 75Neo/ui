<script setup lang="ts">
import { computed } from "vue";
import { Listbox as Ark } from "@ark-ui/vue/listbox";
import { cva } from "class-variance-authority";
import { cn, listboxDefaults, listboxSizeData } from "@75neo/themes";
import { useListboxVariants } from "./variants";

const listboxContent = cva(
  "flex max-h-60 w-full min-w-0 flex-col overflow-y-auto overscroll-contain rounded-md bg-default shadow-lg ring ring-accented outline-none data-disabled:opacity-75",
  {
    variants: { size: listboxSizeData.content },
    defaultVariants: listboxDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useListboxVariants();
const contentClass = computed(() =>
  cn(listboxContent(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Content data-slot="listbox-content" :class="contentClass">
    <slot />
  </Ark.Content>
</template>
