<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Field as Ark } from "@ark-ui/vue/field";
import { cn } from "cn";
import { fieldStyles as styles } from "@/registry/shared/lib/field.styles";

interface FieldHelperTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FieldHelperTextProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.HelperText :class="cn(styles.helperText(), props.class)">
    <slot />
  </Ark.HelperText>
</template>
