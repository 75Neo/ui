<script setup lang="ts">
import { DownloadTrigger } from "@75neo/vue/download-trigger";

const file = () => new Blob(["75NeoUI"], { type: "text/plain" });
</script>

<template>
  <div class="max-w-xs">
    <DownloadTrigger :data="file()" file-name="75neo.txt" mime-type="text/plain">
      Save
    </DownloadTrigger>
  </div>
</template>
