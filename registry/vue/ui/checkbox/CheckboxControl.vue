<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Checkbox as Ark } from "@ark-ui/vue/checkbox";
import { cn } from "cn";
import { checkboxStyles as styles } from "@/registry/shared/lib/checkbox.styles";

interface CheckboxControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<CheckboxControlProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Control :class="cn(styles.control(), props.class)">
    <slot />
  </Ark.Control>
</template>
