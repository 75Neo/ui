<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { RadioGroup as Ark } from "@ark-ui/vue/radio-group";
import { cn } from "cn";
import { radioGroup } from "@/registry/shared/lib/radio-group.styles";

interface RadioGroupLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<RadioGroupLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = radioGroup();
</script>

<template>
  <Ark.Label :class="cn(styles.label(), props.class)">
    <slot />
  </Ark.Label>
</template>
