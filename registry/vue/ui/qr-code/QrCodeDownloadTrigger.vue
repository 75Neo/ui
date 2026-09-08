<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { QrCode as Ark } from "@ark-ui/vue/qr-code";
import type { QrCodeDownloadTriggerProps as ArkDownloadTriggerProps } from "@ark-ui/vue/qr-code";
import { cn } from "cn";
import { qrCode } from "@/registry/shared/lib/qr-code.styles";

interface QrCodeDownloadTriggerProps {
  fileName: string;
  mimeType: ArkDownloadTriggerProps["mimeType"];
  quality?: number;
  class?: HTMLAttributes["class"];
}

const props = defineProps<QrCodeDownloadTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = qrCode();
</script>

<template>
  <Ark.DownloadTrigger
    :file-name="props.fileName"
    :mime-type="props.mimeType"
    :quality="props.quality"
    :class="cn(styles.downloadTrigger(), props.class)"
  >
    <slot />
  </Ark.DownloadTrigger>
</template>
