<script setup lang="ts">
import { computed } from "vue";
import { QrCode as Ark } from "@ark-ui/vue/qr-code";
import { cva } from "class-variance-authority";
import { cn, qrCodeDefaults, qrCodeSizeData } from "@75neo/themes";
import { useQrCodeVariants } from "./variants";

const qrCodeOverlay = cva("rounded-sm bg-default p-0.5 [&>*]:size-full", {
  variants: { size: qrCodeSizeData.overlay },
  defaultVariants: qrCodeDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useQrCodeVariants();
const overlayClass = computed(() => cn(qrCodeOverlay(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Overlay data-slot="qr-code-overlay" :class="overlayClass">
    <slot />
  </Ark.Overlay>
</template>
