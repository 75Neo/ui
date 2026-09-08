<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { NumberInput as Ark } from "@ark-ui/vue/number-input";
import { cn } from "cn";
import { numberInputStyles as styles } from "@/registry/shared/lib/number-input.styles";

interface NumberInputIncrementTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<NumberInputIncrementTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.IncrementTrigger :class="cn(styles.incrementTrigger(), props.class)">
    <slot />
  </Ark.IncrementTrigger>
</template>
