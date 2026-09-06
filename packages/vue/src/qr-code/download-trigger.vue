<script setup lang="ts">
import { QrCode as Ark } from "@ark-ui/vue/qr-code";
import { cn, type QrCodeDownloadTriggerProps } from "@75neo/themes";

const props = withDefaults(
  defineProps<
    QrCodeDownloadTriggerProps & {
      class?: unknown;
    }
  >(),
  { mimeType: "image/png" },
);

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.DownloadTrigger
    :file-name="props.fileName"
    :mime-type="props.mimeType"
    :quality="props.quality"
    data-slot="qr-code-download-trigger"
    :class="
      cn(
        'inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md bg-default px-2.5 py-1.5 text-xs font-medium text-default ring ring-accented outline-inverted/25 transition-colors ring-inset hover:bg-elevated focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75',
        props.class as string | undefined,
      )
    "
  >
    <slot />
  </Ark.DownloadTrigger>
</template>
