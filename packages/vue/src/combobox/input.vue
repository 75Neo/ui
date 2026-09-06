<script setup lang="ts">
import { computed } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cva } from "class-variance-authority";
import { cn, comboboxDefaults, comboboxSizeData } from "@75neo/themes";
import { useComboboxVariants } from "./variants";

const comboboxInput = cva(
  "min-w-0 flex-1 bg-transparent text-highlighted outline-none placeholder:text-dimmed disabled:cursor-not-allowed",
  {
    variants: { size: comboboxSizeData.input },
    defaultVariants: comboboxDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
  /** Placeholder for the empty field. */
  placeholder?: string;
}>();

const variants = useComboboxVariants();
const inputClass = computed(() => cn(comboboxInput(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Input data-slot="combobox-input" :class="inputClass" :placeholder="props.placeholder" />
</template>
