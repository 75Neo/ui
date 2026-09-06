<script setup lang="ts">
import { type Component, computed } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cva } from "class-variance-authority";
import {
  cn,
  fileUploadDefaults,
  fileUploadSizeData,
  isPreviewableFile,
  type FileUploadItemProps,
} from "@75neo/themes";
import { useFileUploadVariants } from "./variants";
import FileUploadItemDeleteTrigger from "./item-delete-trigger.vue";
import FileUploadItemName from "./item-name.vue";
import FileUploadItemPreview from "./item-preview.vue";
import FileUploadItemSizeText from "./item-size-text.vue";

const fileUploadItem = cva(
  "flex min-w-0 items-center rounded-md bg-elevated/50 ring ring-muted ring-inset",
  {
    variants: { size: fileUploadSizeData.item },
    defaultVariants: fileUploadDefaults,
  },
);

/*
 * `preview` defaults to on, so it is declared: without the declaration Vue casts an
 * absent boolean to `false` and every thumbnail disappears.
 */
const props = withDefaults(
  defineProps<
    FileUploadItemProps<Component> & {
      file: File;
      class?: unknown;
    }
  >(),
  { preview: true },
);

defineSlots<{
  default?: () => unknown;
}>();

const variants = useFileUploadVariants();
const itemClass = computed(() =>
  cn(fileUploadItem({ size: variants.size }), props.class as string | undefined),
);
const showPreview = computed(() => props.preview && isPreviewableFile(props.file));
</script>

<template>
  <Ark.Item :file="props.file" data-slot="file-upload-item" :class="itemClass">
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      <!--
        Drawn for an image and skipped for anything else, so a row's height comes from
        its text and does not jump between kinds.
      -->
      <FileUploadItemPreview v-if="showPreview" />
      <span data-slot="file-upload-item-body" class="flex min-w-0 flex-1 flex-col">
        <FileUploadItemName>{{ props.file.name }}</FileUploadItemName>
        <FileUploadItemSizeText />
      </span>
      <FileUploadItemDeleteTrigger>
        <component :is="props.deleteIcon" v-if="props.deleteIcon" />
      </FileUploadItemDeleteTrigger>
    </template>
  </Ark.Item>
</template>
