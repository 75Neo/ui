<script setup lang="ts">
import { computed } from "vue";
import { QrCode as Ark } from "@ark-ui/vue/qr-code";
import { cva } from "class-variance-authority";
import { cn, qrCodeDefaults, qrCodeSizeData } from "@75neo/themes";
import { useQrCodeVariants } from "./variants";

const qrCodeFrame = cva("block fill-inverted", {
  variants: { size: qrCodeSizeData.frame },
  defaultVariants: qrCodeDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useQrCodeVariants();
const frameClass = computed(() => cn(qrCodeFrame(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Frame data-slot="qr-code-frame" :class="frameClass">
    <Ark.Pattern />
    <slot />
  </Ark.Frame>
</template>
