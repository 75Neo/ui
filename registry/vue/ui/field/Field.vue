<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Field as Ark } from "@ark-ui/vue/field";
import { cn } from "cn";
import { field } from "@/registry/shared/lib/field.styles";

interface FieldProps {
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<FieldProps>(), {
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
});

defineSlots<{
  default?: () => unknown;
}>();

const styles = field();
</script>

<template>
  <Ark.Root
    :disabled="props.disabled"
    :invalid="props.invalid"
    :read-only="props.readOnly"
    :required="props.required"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
