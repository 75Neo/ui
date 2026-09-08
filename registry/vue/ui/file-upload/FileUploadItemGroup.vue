<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cn } from "cn";
import { fileUpload } from "@/registry/shared/lib/file-upload.styles";

interface FileUploadItemGroupProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FileUploadItemGroupProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = fileUpload();
</script>

<template>
  <Ark.ItemGroup :class="cn(styles.itemGroup(), props.class)">
    <slot />
  </Ark.ItemGroup>
</template>
