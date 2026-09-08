<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { PinInput as Ark } from "@ark-ui/vue/pin-input";
import { cn } from "cn";
import { pinInputStyles as styles } from "@/registry/shared/lib/pin-input.styles";

interface PinInputLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<PinInputLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Label :class="cn(styles.label(), props.class)">
    <slot />
  </Ark.Label>
</template>
