<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { NumberInput as Ark } from "@ark-ui/vue/number-input";
import { cn } from "cn";
import { numberInput } from "@/registry/shared/lib/number-input.styles";

interface NumberInputLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<NumberInputLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = numberInput();
</script>

<template>
  <Ark.Label :class="cn(styles.label(), props.class)">
    <slot />
  </Ark.Label>
</template>
