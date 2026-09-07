<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { NumberInput as Ark } from "@ark-ui/vue/number-input";
import { cn } from "cn";
import { numberInput } from "@/registry/shared/lib/number-input.styles";

interface NumberInputControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<NumberInputControlProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = numberInput();
</script>

<template>
  <Ark.Control :class="cn(styles.control(), props.class)">
    <slot />
  </Ark.Control>
</template>
