<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { QrCode as Ark } from "@ark-ui/vue/qr-code";
import { cn } from "cn";
import { qrCodeStyles as styles } from "@/registry/shared/lib/qr-code.styles";

interface QrCodeProps {
  defaultValue?: string;
  pixelSize?: number;
  class?: HTMLAttributes["class"];
}

const props = defineProps<QrCodeProps>();

const value = defineModel<string>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    v-model="value"
    :default-value="props.defaultValue"
    :pixel-size="props.pixelSize"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
