<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { QrCode as Ark } from "@ark-ui/vue/qr-code";
import { cn } from "cn";
import { qrCodeStyles as styles } from "@/registry/shared/lib/qr-code.styles";

interface QrCodeFrameProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<QrCodeFrameProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Frame :class="cn(styles.frame(), props.class)">
    <slot />
  </Ark.Frame>
</template>
