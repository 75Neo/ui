<script setup lang="ts">
import { LocaleProvider } from "@75neo/vue/locale-provider";
</script>

<template>
  <div class="flex flex-col gap-3 text-sm">
    <LocaleProvider locale="en-US" class="rounded-lg bg-muted p-4 text-toned">
      <p>Reading left to right, with the gutter on the start edge.</p>
    </LocaleProvider>
    <LocaleProvider locale="ar-EG" class="rounded-lg bg-muted p-4 text-toned">
      <p>يقرأ من اليمين إلى اليسار.</p>
    </LocaleProvider>
  </div>
</template>
