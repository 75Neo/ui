<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { QrCode as Ark } from "@ark-ui/vue/qr-code";
import { cn } from "cn";
import { qrCode } from "@/registry/shared/lib/qr-code.styles";

interface QrCodeOverlayProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<QrCodeOverlayProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = qrCode();
</script>

<template>
  <Ark.Overlay :class="cn(styles.overlay(), props.class)">
    <slot />
  </Ark.Overlay>
</template>
