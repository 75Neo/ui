<script setup lang="ts">
import { FileUpload } from "@75neo/vue";
</script>

<template>
  <FileUpload
    label="Attachments"
    accept="image/*"
    :max-files="4"
    description="PNG, JPG or WebP, up to 5 MB"
    :max-file-size="5_000_000"
  />
</template>
