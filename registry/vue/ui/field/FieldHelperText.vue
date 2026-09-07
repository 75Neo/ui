<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Field as Ark } from "@ark-ui/vue/field";
import { cn } from "cn";
import { field } from "@/registry/shared/lib/field.styles";

interface FieldHelperTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FieldHelperTextProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = field();
</script>

<template>
  <Ark.HelperText :class="cn(styles.helperText(), props.class)">
    <slot />
  </Ark.HelperText>
</template>
