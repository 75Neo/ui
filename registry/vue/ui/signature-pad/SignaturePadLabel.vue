<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { SignaturePad as Ark } from "@ark-ui/vue/signature-pad";
import { cn } from "cn";
import { signaturePadStyles as styles } from "@/registry/shared/lib/signature-pad.styles";

interface SignaturePadLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SignaturePadLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Label :class="cn(styles.label(), props.class)">
    <slot />
  </Ark.Label>
</template>
