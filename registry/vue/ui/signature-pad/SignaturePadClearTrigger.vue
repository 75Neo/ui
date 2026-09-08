<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { SignaturePad as Ark } from "@ark-ui/vue/signature-pad";
import { cn } from "cn";
import { signaturePadStyles as styles } from "@/registry/shared/lib/signature-pad.styles";

interface SignaturePadClearTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SignaturePadClearTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.ClearTrigger :class="cn(styles.clearTrigger(), props.class)">
    <slot />
  </Ark.ClearTrigger>
</template>
