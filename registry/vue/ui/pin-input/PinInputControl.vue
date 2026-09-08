<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { PinInput as Ark } from "@ark-ui/vue/pin-input";
import { cn } from "cn";
import { pinInputStyles as styles } from "@/registry/shared/lib/pin-input.styles";

interface PinInputControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<PinInputControlProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Control :class="cn(styles.control(), props.class)">
    <slot />
  </Ark.Control>
</template>
