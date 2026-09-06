<script setup lang="ts">
import { FileUpload } from "@75neo/vue/file-upload";
</script>

<template>
  <FileUpload
    class="max-w-sm"
    label="Attachment"
    description="PNG or JPG, up to 2 MB"
    :max-file-size="2000000"
    accept="image/*"
  />
</template>
