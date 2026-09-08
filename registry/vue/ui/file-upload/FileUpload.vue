<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cn } from "cn";
import { fileUpload } from "@/registry/shared/lib/file-upload.styles";

interface FileUploadProps {
  accept?: Record<string, string[]> | string | string[];
  maxFiles?: number;
  maxFileSize?: number;
  minFileSize?: number;
  allowDrop?: boolean;
  directory?: boolean;
  preventDocumentDrop?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  locale?: string;
  name?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<FileUploadProps>(), {
  allowDrop: undefined,
  directory: undefined,
  preventDocumentDrop: undefined,
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
});

defineSlots<{
  default?: () => unknown;
}>();

const styles = fileUpload();
</script>

<template>
  <Ark.Root
    :accept="props.accept"
    :max-files="props.maxFiles"
    :max-file-size="props.maxFileSize"
    :min-file-size="props.minFileSize"
    :allow-drop="props.allowDrop"
    :directory="props.directory"
    :prevent-document-drop="props.preventDocumentDrop"
    :disabled="props.disabled"
    :invalid="props.invalid"
    :read-only="props.readOnly"
    :required="props.required"
    :locale="props.locale"
    :name="props.name"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
