<script setup lang="ts">
import { Download } from "@lucide/vue";
import QrCode from "@/registry/vue/ui/qr-code/QrCode.vue";
import QrCodeDownloadTrigger from "@/registry/vue/ui/qr-code/QrCodeDownloadTrigger.vue";
import QrCodeFrame from "@/registry/vue/ui/qr-code/QrCodeFrame.vue";
import QrCodePattern from "@/registry/vue/ui/qr-code/QrCodePattern.vue";
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
