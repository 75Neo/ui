<script setup lang="ts">
import { type Component, computed } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cva } from "class-variance-authority";
import { UploadCloud } from "@lucide/vue";
import {
  cn,
  fileUploadDefaults,
  fileUploadDropzoneCompoundData,
  fileUploadSizeData,
  type FileUploadDropzoneProps,
} from "@75neo/themes";
import { useFileUploadVariants } from "./variants";

const fileUploadDropzone = cva(
  "flex w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-accented bg-default text-center transition-colors outline-none hover:bg-elevated/50 data-disabled:cursor-not-allowed data-disabled:opacity-75 hover:data-disabled:bg-default data-invalid:border-error",
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
      size: fileUploadSizeData.dropzone,
    },
    compoundVariants: fileUploadDropzoneCompoundData,
    defaultVariants: fileUploadDefaults,
  },
);

const props = defineProps<
  FileUploadDropzoneProps<Component> & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useFileUploadVariants();
const dropzoneClass = computed(() =>
  cn(fileUploadDropzone(variants), props.class as string | undefined),
);
const iconClass = computed(() =>
  cn("shrink-0 text-dimmed [&>svg]:size-full", fileUploadSizeData.leadingIcon[variants.size]),
);
const titleClass = computed(() =>
  cn("font-medium text-highlighted", fileUploadSizeData.title[variants.size]),
);
const descriptionClass = computed(() =>
  cn("text-muted", fileUploadSizeData.description[variants.size]),
);
</script>

<template>
  <!--
    The dropzone is the control, and the button inside it is a second way in rather
    than the only one, which is why `disableClick` is never set: clicking anywhere on
    the area opens the picker.
  -->
  <Ark.Dropzone data-slot="file-upload-dropzone" :class="dropzoneClass">
    <span data-slot="file-upload-leading-icon" :class="iconClass">
      <component :is="props.icon ?? UploadCloud" />
    </span>
    <p data-slot="file-upload-title" :class="titleClass">
      {{ props.title ?? "Drop a file here" }}
    </p>
    <p
      v-if="props.description != null"
      data-slot="file-upload-description"
      :class="descriptionClass"
    >
      {{ props.description }}
    </p>
    <slot />
  </Ark.Dropzone>
</template>
