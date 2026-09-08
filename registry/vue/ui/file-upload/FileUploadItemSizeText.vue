<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cn } from "cn";
import { fileUpload } from "@/registry/shared/lib/file-upload.styles";

interface FileUploadItemSizeTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FileUploadItemSizeTextProps>();

const styles = fileUpload();
</script>

<template>
  <Ark.ItemSizeText :class="cn(styles.itemSizeText(), props.class)" />
</template>
