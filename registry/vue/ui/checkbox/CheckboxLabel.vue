<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Checkbox as Ark } from "@ark-ui/vue/checkbox";
import { cn } from "cn";
import { checkboxStyles as styles } from "@/registry/shared/lib/checkbox.styles";

interface CheckboxLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<CheckboxLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Label :class="cn(styles.label(), props.class)">
    <slot />
  </Ark.Label>
</template>
