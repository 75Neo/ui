<script setup lang="ts">
import { computed } from "vue";
import { Editable as Ark } from "@ark-ui/vue/editable";
import { cva } from "class-variance-authority";
import { cn, editableDefaults, editableInputCompoundData, editableSizeData } from "@75neo/themes";
import { useEditableVariants } from "./variants";

const editableInput = cva(
  "col-start-1 row-start-1 min-w-0 rounded-md bg-default text-highlighted ring ring-accented outline-none ring-inset placeholder:text-dimmed disabled:cursor-not-allowed data-invalid:ring-error",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: editableSizeData.input,
    },
    compoundVariants: editableInputCompoundData,
    defaultVariants: editableDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
  /** Shown while the field is empty. */
  placeholder?: string;
}>();

const variants = useEditableVariants();
const inputClass = computed(() => cn(editableInput(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Input data-slot="editable-input" :class="inputClass" :placeholder="props.placeholder" />
</template>
