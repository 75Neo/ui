<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cn } from "cn";
import { fileUploadStyles as styles } from "@/registry/shared/lib/file-upload.styles";

interface FileUploadItemNameProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FileUploadItemNameProps>();
</script>

<template>
  <Ark.ItemName :class="cn(styles.itemName(), props.class)" />
</template>
