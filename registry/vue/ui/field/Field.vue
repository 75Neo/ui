<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Field as Ark } from "@ark-ui/vue/field";
import { cn } from "cn";
import { fieldStyles as styles, type FieldSize } from "@/registry/shared/lib/field.styles";

interface FieldProps {
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  size?: FieldSize;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<FieldProps>(), {
  size: "md",
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
});

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    :disabled="props.disabled"
    :invalid="props.invalid"
    :read-only="props.readOnly"
    :required="props.required"
    :data-size="props.size"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
