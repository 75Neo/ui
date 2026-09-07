<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { NumberInput as Ark } from "@ark-ui/vue/number-input";
import { cn } from "cn";
import { numberInput } from "@/registry/shared/lib/number-input.styles";

interface NumberInputDecrementTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<NumberInputDecrementTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = numberInput();
</script>

<template>
  <Ark.DecrementTrigger :class="cn(styles.decrementTrigger(), props.class)">
    <slot />
  </Ark.DecrementTrigger>
</template>
