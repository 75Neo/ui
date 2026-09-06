<script setup lang="ts">
import { computed } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cva } from "class-variance-authority";
import { cn, fileUploadDefaults, fileUploadSizeData } from "@75neo/themes";
import { useFileUploadVariants } from "./variants";

const fileUploadItemPreview = cva("shrink-0 overflow-hidden rounded-sm bg-accented", {
  variants: { size: fileUploadSizeData.itemPreview },
  defaultVariants: fileUploadDefaults,
});

const props = withDefaults(
  defineProps<{
    /** Which files get a thumbnail. @defaultValue `"image/*"` */
    type?: string;
    class?: unknown;
  }>(),
  { type: "image/*" },
);

defineSlots<{
  default?: () => unknown;
}>();

const variants = useFileUploadVariants();
const previewClass = computed(() =>
  cn(fileUploadItemPreview({ size: variants.size }), props.class as string | undefined),
);
</script>

<template>
  <Ark.ItemPreview :type="props.type" data-slot="file-upload-item-preview" :class="previewClass">
    <slot>
      <Ark.ItemPreviewImage
        data-slot="file-upload-item-preview-image"
        class="size-full object-cover"
      />
    </slot>
  </Ark.ItemPreview>
</template>
