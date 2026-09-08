<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cn } from "cn";
import { fileUploadStyles as styles } from "@/registry/shared/lib/file-upload.styles";

interface FileUploadItemSizeTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FileUploadItemSizeTextProps>();
</script>

<template>
  <Ark.ItemSizeText :class="cn(styles.itemSizeText(), props.class)" />
</template>
