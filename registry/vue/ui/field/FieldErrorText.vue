<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Field as Ark } from "@ark-ui/vue/field";
import { cn } from "cn";
import { fieldStyles as styles } from "@/registry/shared/lib/field.styles";

interface FieldErrorTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FieldErrorTextProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.ErrorText :class="cn(styles.errorText(), props.class)">
    <slot />
  </Ark.ErrorText>
</template>
