<script setup lang="ts">
import { Download } from "@lucide/vue";
import { QrCode, QrCodeDownloadTrigger, QrCodeFrame, QrCodePattern } from "@/components/vue";
</script>

<template>
  <div class="flex justify-center">
    <QrCode default-value="https://75neo-ui.pages.dev">
      <QrCodeFrame>
        <QrCodePattern />
      </QrCodeFrame>
      <QrCodeDownloadTrigger file-name="75neo-ui.png" mime-type="image/png">
        <Download />
        Download
      </QrCodeDownloadTrigger>
    </QrCode>
  </div>
</template>
