<script setup lang="ts">
import { computed } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cva } from "class-variance-authority";
import {
  cn,
  fileUploadDefaults,
  fileUploadSizeData,
  fileUploadTriggerCompoundData,
} from "@75neo/themes";
import { useFileUploadVariants } from "./variants";

const fileUploadTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md font-medium text-highlighted ring ring-accented transition-colors outline-none ring-inset hover:bg-elevated disabled:cursor-not-allowed disabled:opacity-75",
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
      size: fileUploadSizeData.trigger,
    },
    compoundVariants: fileUploadTriggerCompoundData,
    defaultVariants: fileUploadDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useFileUploadVariants();
const triggerClass = computed(() =>
  cn(fileUploadTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Trigger data-slot="file-upload-trigger" :class="triggerClass">
    <slot>Choose a file</slot>
  </Ark.Trigger>
</template>
