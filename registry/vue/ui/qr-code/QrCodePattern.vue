<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { QrCode as Ark } from "@ark-ui/vue/qr-code";
import { cn } from "cn";
import { qrCode } from "@/registry/shared/lib/qr-code.styles";

interface QrCodePatternProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<QrCodePatternProps>();

const styles = qrCode();
</script>

<template>
  <Ark.Pattern :class="cn(styles.pattern(), props.class)" />
</template>
