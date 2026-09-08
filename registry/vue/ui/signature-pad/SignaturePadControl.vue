<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { SignaturePad as Ark } from "@ark-ui/vue/signature-pad";
import { cn } from "cn";
import { signaturePad } from "@/registry/shared/lib/signature-pad.styles";

interface SignaturePadControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SignaturePadControlProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = signaturePad();
</script>

<template>
  <Ark.Control :class="cn(styles.control(), props.class)">
    <slot />
  </Ark.Control>
</template>
